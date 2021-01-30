import {makeStyles} from '@material-ui/core/styles'
import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {create} from './api-user'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'



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


export default function Signup(props){
    let [state, setState] = useState({
        name: '',
        email: '',
        password:'',
        open: false,
        error:''
    })

    const handleChange = name => event =>{
        setState({...state, [name]: event.target.value});
    } 

    const handleClick = ()=> {
        const user={
            name: state.name || undefined,
            email: state.email || undefined,
            password: state.password || undefined
        }
        create(user).then(data=>{
            if(data.error){   setState({...state, error: data.error})}
            else{ setState({...state, open: true}) }
        })
    }

    const classes = useStyles()

    return (
        <div>
        <Card className={classes.card}>
           <CardContent>
               <Typography variant='h6' className={classes.title}>
                   Sign Up
               </Typography>
               <TextField  className={classes.textField} label="Name" id='name' value={state.name} onChange={handleChange('name')} margin="normal" /><br/>
               <TextField  className={classes.textField} label="Email" type='email' id='email' value={state.email} onChange={handleChange('email')} margin="normal" /><br/> 
               <TextField  className={classes.textField} label="Password" type='password' id='password' value={state.password} onChange={handleChange('password')} margin="normal" />
                <br/> { state.error && (
                <Typography component="p" color="error">
                  <Icon color="error" className={classes.error}>error</Icon>
                  {state.error.message}
              </Typography>)
                }
           </CardContent> 
           <CardActions>
           <Button color="primary" variant="contained" onClick={handleClick} className={classes.submit}>Submit</Button>
           </CardActions>
        </Card>
        <Dialog open={state.open} disableBackdropClick={true}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signin">
            <Button color="primary" autoFocus="autoFocus" variant="contained">
              Sign In
            </Button>
          </Link>
        </DialogActions>
        </Dialog>
        </div>
    )

}