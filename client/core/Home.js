import  React, {Component} from 'react'
import {makeStyles} from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import unicornbike from './../assets/images/unicornbike.jpg'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme)=>(
    {
        card: {
            maxWidth: 600,
            margin: 'auto',
            marginTop: theme.spacing(5)
        },
        title: {
            padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px
            ${theme.spacing(2)}px`,
            color: theme.palette.text.secondary
        },
        media: {
            minHeight: 330
        }
    }
))

export default function Home(){
    const classes = useStyles()
      return (
          <Card className={classes.card}>
            <Typography variant="h6" className={classes.title}>
              Home Page
            </Typography>
            <CardMedia className={classes.media} image={unicornbike} title="Unicorn Bicycle"/>
            <Typography variant="body2" component="p" className={classes.credit} color="textSecondary">Photo by <a href="https://unsplash.com/@boudewijn_huysmans" target="_blank" rel="noopener noreferrer">Boudewijn Huysmans</a> on Unsplash</Typography>
            <CardContent>
              <Typography variant="body1" component="p">
                Welcome to the MERN Skeleton home page.
              </Typography>
              <Link to='/users'>Users</Link><br/>
              <Link to='/signup'>Signup</Link><br/>
              <Link to="/signin">Signin</Link>
            </CardContent>
          </Card>
      )
  }
