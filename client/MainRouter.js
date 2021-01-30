import React, {Component} from 'react'
import { Route, Switch } from 'react-router';
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './user/Signin'
import EditProfile from './user/EditProfile';
import Profile from './user/Profile';
import Menu from './core/Menu'

class MainRouter extends Component{
    render(){
        return (
            <div>
                <Menu />
                <Switch>
                    <Route path="/user/edit/:userId" component={EditProfile}/>
                    <Route path="/user/:userId" component={Profile}/>
                    <Route path="/signin" component={Signin}/>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/users" component={Users}/> 
                    <Route exact path="/" component={Home}/>
                </Switch>
            </div>
        )
    }
}

export default MainRouter