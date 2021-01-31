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
import template from "./../template.js"

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {ServerStyleSheets, ThemeProvider} from '@material-ui/core/styles'
import {StaticRouter} from 'react-router-dom'
import theme from  './../client/theme.js'
import MainRouter from "./../client/MainRouter"

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

app.get('*', (req,res)=>{
    
    const sheets = new ServerStyleSheets()
    const context = {}
    const markup = ReactDOMServer.renderToString(
        sheets.collect(
       <StaticRouter location={req.url} context={context} >
           <ThemeProvider theme={theme}>
              
            </ThemeProvider>
       </StaticRouter>
        )
)
    
    if (context.url) {
        return res.redirect(303, context.url)
      }
    const css = sheets.toString()
    
    res.status(200).send(template({markup,css}))
})

app.use((err, req, res, next)=>{
    if(err.name === "UnauthorizedError"){
        res.status(401).json({error: err.name + ":" + err.message})
    }
})
export default app
