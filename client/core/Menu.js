import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Button from '@material-ui/core/Button'
import auth from './../auth/auth-helpers'
import {Link, withRouter} from 'react-router-dom'
import jwt from 'express-jwt'

const isActive = (history, path)=>{
    if (history.location.pathname == path) 
        return {color: '#ff4081'}
    else
      return {color: '#ffffff'}
}

const  Menu = withRouter(({history})=>{
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" color="inherit">
                    MERN
                </Typography>
                <Link to="/">
                    <IconButton aria-label="Home" style={isActive(history, "/")}>
                        <HomeIcon/>
                    </IconButton>
                </Link>
                <Link to="/users">
                    <Button style={isActive(history, "/users")}>Users</Button>
                </Link>
                { (!auth.hasAuthentication()) && ( 
                    <span>
                    <Link to='/signup' >
                        <Button style={isActive(history ,'/signup')}> Signup</Button>
                    </Link>
                    <Link to='/signin'>
                        <Button style={isActive(history ,'/signin')}> Signin</Button>
                    </Link>
                    </span>
                )
                }
                { (auth.hasAuthentication()) && ( 
                    <span>
                    <Link to={'/user/' + auth.hasAuthentication().user._id} >
                        <Button style={isActive(history ,'/user' + auth.hasAuthentication().user._id)}> Profile</Button>
                    </Link>
                    
                    <Button color="inherit" onClick={()=>{ auth.clearJWT(()=>history.push('/'))}}> Signout</Button>
                    
                    </span>
                )
                }
            </Toolbar>
        </AppBar>
    )
})

export default Menu