import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import devBundle from './devBundle'
import path from 'path'

const CURRENT_WORKING_DIR = process.cwd();

const app = express();
devBundle.compile(app);
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR,'dist')))
app.use(cors());
app.use(helmet());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(compression())
app.use(cookieParser())

app.use('/', userRoutes)
app.use('/', authRoutes)

app.use((err, req, res, next)=>{
    if(err.name === "UnauthorizedError"){
        res.status(401).json({error: err.name + ":" + err.message})
    }
})
export default app
