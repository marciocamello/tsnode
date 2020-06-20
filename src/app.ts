import express from 'express'
import cors from 'cors'
import compression from 'compression'
import mongoose from 'mongoose'

import routes from './routes'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()

    this.middlewares()
    // this.database()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(compression())
    this.express.use(cors())
  }

  private database (): void{
    mongoose.connect('mongodb://tsnode-db:27017/tsnode', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  private routes (): void {
    this.express.use(routes)
  }
}

export default new App().express
