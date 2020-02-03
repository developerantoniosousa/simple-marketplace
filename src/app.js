require('dotenv/config')

const databaseConfig = require('./config/database')

const express = require('express')
const mongoose = require('mongoose')
const Sentry = require('@sentry/node')
const Youch = require('youch')
const Validation = require('express-validation')

class App {
  constructor() {
    this.server = express()

    this.sentry()
    this.database()
    this.middlewares()
    this.routes()
    this.exceptions()
  }

  sentry() {
    Sentry.init({ dsn: process.env.SENTRY_DSN })
    this.server.use(Sentry.Handlers.requestHandler())
  }

  database() {
    mongoose.connect(databaseConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true,
    })
  }

  middlewares() {
    this.server.use(express.json())
  }

  routes() {
    this.server.use(require('./routes'))
  }

  exceptions() {
    if (process.env.NODE_ENV === 'production') {
      this.server.use(Sentry.Handlers.errorHandler())
    }

    this.server.use(async (error, req, res, next) => {
      if (error instanceof Validation.ValidationError) {
        return res.status(error.status).json(error)
      }

      if (process.env.NODE_ENV === 'development') {
        const youch = new Youch(error, req)

        return res.status(error.status || 500).json(await youch.toJSON())
      }

      return res
        .status(error.status || 500)
        .json({ error: 'Internal Server Error' })
    })
  }
}

module.exports = new App().server
