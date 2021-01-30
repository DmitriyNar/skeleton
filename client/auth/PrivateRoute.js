import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import  {hasAuthorization} from './auth-helpers' 

const PrivateRoute = ({component: Component, ...rest})=>{
    return <Route {...rest} render={(props)=>{
        hasAuthorization ? (<Component {...props} />) : 
        (<Redirect to={{
            pathname: '/signin',
            state: {from: props.location}
        }} />) 
    }
    } />
}

export default PrivateRoute