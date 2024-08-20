require('express-async-errors')
require('dotenv').config()
import express from 'express'
import mongoSanitize from 'express-mongo-sanitize'
import { loadRoutes } from './routes/index'
import cookieParser from 'cookie-parser'
import {
  ErrorHandlerMiddleware,
  NotFoundHandler,
  hlm,
  limiter
} from './middlewares'

const app = express()

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
// app.use(limiter);
app.use(hlm)
app.use(mongoSanitize())

loadRoutes()

app.use(ErrorHandlerMiddleware)
app.use(NotFoundHandler)

export { app }
