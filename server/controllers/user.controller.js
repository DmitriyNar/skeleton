import User from './../model/user.model'
import errorHandler from '../helpers/dbErrorHandler'
import _ from "lodash"

const create=(req, res)=>{
    let user = new User(req.body);
    user.save((err, result)=>{
        if(err){
           return res.status(400).json({error: err, body: req.body});
        }
        return res.status(200).json({message: "User created succesfully"});
    })
}

const list=(req, res, next)=>{
    User.find((err, users)=>{
        if(err){
            return res.status(400).json({error: errorHandler.getErrorMessage(err)});
        }
        return res.json(users);
    }).select("name email created updated")
}

const read=(req, res)=>{
    req.profile.hashedPassword = undefined
    req.profile.salt = undefined
    return res.status(200).json(req.profile)
}
const update=(req, res, next)=>{
    let user = req.profile;
    user = _.extend(user, req.body)
    user.updated = Date.now()
    user.save((err, result)=>{
        if(err){ return res.status(400).json({error: errorHandler.getErrorMessage(err)}) }
        user.hashedPassword = undefined
        user.salt = undefined
        res.status(200).json(user)
    })
}
const remove=(req, res, next)=>{
    const user = req.profile
    user.remove((err, delUser)=>{
        if(err){return res.status(400).json({error: errorHandler.getErrorMessage(err)}) }
        delUser.hashedPassword = undefined
        delUser.salt = undefined
        res.status(200).json(delUser)
    })
}

const userById=(req, res, next, id)=>{
    User.findById(id).exec((err, user)=>{
        if(err || !user){ res.status(400).json({error: "can not find user"}) }
        req.profile = user
    })
    next()
}


export default{ create, list, read, update, remove, userById}