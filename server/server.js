import config from "./../config/config.js"
import app from "./express.js"
import mongoose from 'mongoose'



// Mongoose connection
mongoose.Promise = global.Promise
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
mongoose.connection.on('error', ()=>{
    throw new Error('Unable to connect to MongoURI');
})






app.listen(config.port, (err)=>{
    if (err) console.log(err)
    else console.log(`Server listen on port ${config.port}`) 
})