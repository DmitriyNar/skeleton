import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {signin} from './../auth/api-auth'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import {Redirect} from 'react-router-dom'
import auth from './../auth/auth-helpers'

const useStyles = makeStyles(theme=>({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2)
      },
      error: {
        verticalAlign: 'middle'
      },
      title: {
        marginTop: theme.spacing(2),
        color: theme.palette.openTitle
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


export default function Signin(props){

    const [state, setState] = useState({
        email: '',
        password:'',
        error: '',
        redirectToReferer: false
    }); 
    const classes = useStyles();

    const handleClick = () =>{
        const user = {
            email: state.email || undefined,
            password: state.password || undefined
        }
        signin(user).then((data)=>{
            if (data.error){
                setState({...state, error: data.error});
            }else{
                auth.authenticate(data,()=>{setState({...state, error:'',redirectToReferer: true})})
            }
        })
    }

    const handleChange = (name)=>(event)=>{
        setState({...state, [name]: event.target.value})
    }

    const { from } = props.location.state || {
         from:
            { pathname: "/"}
        }

    if(state.redirectToReferer){
        return ( <Redirect to={from} />)
    }

    return (
        <div>
        <Card className={classes.card}>
           <CardContent>
               <Typography variant='h6' className={classes.title}>
                   Sign In
               </Typography>
               <TextField  className={classes.textField} label="Email" type='email' id='email' value={state.email} onChange={handleChange('email')} margin="normal" /><br/> 
               <TextField  className={classes.textField} label="Password" type='password' id='password' value={state.password} onChange={handleChange('password')} margin="normal" />
               <br/> { state.error && (
                    <Typography component="p" color="error">
                      <Icon color="error" className={classes.error}>error  </Icon>
                      {state.error}
                    </Typography>
                  )
                }
           </CardContent> 
           <CardActions>
           <Button color="primary" variant="contained" onClick={handleClick} className={classes.submit}>Submit</Button>
           </CardActions>
        </Card>
        
        </div>
    )

} 