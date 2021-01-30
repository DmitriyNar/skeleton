import React, {useState, useEffect} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import auth from './../auth/auth-helpers'
import {read, update} from './api-user.js'
import {Redirect} from 'react-router-dom'

const useStyles = makeStyles((theme)=>({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2)
      },
      title: {
        margin: theme.spacing(2),
        color: theme.palette.protectedTitle
      },
      error: {
        verticalAlign: 'middle'
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300
      },
      submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
      }
}))



export default function EditProfile({ match }){
    const [state, setState] = useState({
        name: '',
        email: '',
        password:'',
        error:'',
        redirect: false
    });
    const [redirect, setRedirect] = useState(false);
    const jwt = auth.hasAuthentication();
    const classes = useStyles()

    useEffect(()=>{
        const abortController = new AbortController();
        const signal = abortController.signal

        read({params: match.params.userId},{t: jwt.token},signal)
        .then(data=>{
            if(data && data.error){
                setState({...state, error: data.error.mesage})
            }else{
                setState({...state, name: data.name, email: data.email})
            }
        })

        return function cleanup(){
            abortController.abort();
        }
    }, [match.params.userId])

    const handleChange = (name) => (event)=>{
        setState({...state, [name]: event.target.value})
    }

    const handleClick = ()=>{
        const user = {
            name: state.name || undefined,
            email: state.email || undefined,
            password: state.password || undefined
        }
        update({params: match.params.userId},{t: jwt.token},user)
        .then((data)=>{
            if(data && data.error){
                setState({...state, error: data.error.mesage})
            }else{
                setState({...state, userId: data._id})
                setRedirect(true)
            }
        })
    }

    if(redirect){
        return (<Redirect to={"/user/" + state.userId} />)
    }

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h6" className={classes.title}>
                    Edit Profile
                </Typography>
                <TextField id='name'  className={classes.textField} label='Name' value={state.name} onChange={handleChange('name')} /><br/>
                <TextField id='email'  className={classes.textField} label='Email' value={state.email} onChange={handleChange('email')} /><br/>
                <TextField id='password'  className={classes.textField} label='Password' value={state.password} onChange={handleChange('password')} /><br/>
                {
                    state.error && ( <Typography variant='h6' color="error">
                           <Icon color="error">error</Icon>
                           {state.error.message} 
                    </Typography>
                    )
                }
            </CardContent>
            <CardActions>
                <Button className={classes.submit} color='primary' variant='contained' onClick={handleClick}> Submit</Button>
            </CardActions>
        </Card>
    )
}