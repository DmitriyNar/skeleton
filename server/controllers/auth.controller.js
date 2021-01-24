import User from './../model/user.model'
import errorHandler from "./../helpers/dbErrorHandler"
import jwt from 'jsonwebtoken'
import expressJwt from "express-jwt"
import config from "../../config/config"

const signin = (req, res)=>{
    User.findOne({email: req.body.email}, (err, user)=>{
        console.log(user)
        if(err || !user){
            return res.status(401).json({error: "UserNotFound"})
        } 
        if(!user.authenticate(req.body.password)){
            return res.status(401).send("Email and password do not match")
        }
        const token = jwt.sign({_id: user._id}, config.jwtSecret)
        res.cookie("t", token, {expired: new Date() + 9999})

        res.status(200).json({token,user: {_id:user._id, email:user.email, name: user.name }})
        
    })
}

const signout = (req, res)=>{
    res.clearCookie('t')
    res.status(200).json({message: "signed out "})
}

const hasAuthorization = (req, res, next)=>{
   const authorized = req.profile && req.auth && req.profile._id == req.auth._id 
   if(!authorized){
       res.status(400).json({error: "User not authorized"})
   } 
   next()
}

const requireSignIn= expressJwt({
    secret: config.jwtSecret,
    userProperty: "auth",
    algorithms: ['RS256']
})

export default { signin, signout, hasAuthorization, requireSignIn}

