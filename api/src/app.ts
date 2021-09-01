import { authSession } from '@lib/auth/middleware'
import { usersRouter } from '@lib/users/router'
import { redisClient } from '@utils/redis-client'
import cors from 'cors'
import csurf from 'csurf'
import express, { Request, Response } from 'express'
import getenv from 'getenv'
import { getConnection } from 'typeorm'

const app = express()

app.set('trust proxy', true)
app.use(
  cors({
    origin: getenv('DOMAIN'),
    methods: ['POST', 'PUT', 'GET', 'DELETE', 'OPTIONS', 'HEAD'],
    credentials: true,
  }),
)

app.use(authSession)
app.use(express.json())
app.use(csurf())
// error handler
app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)

  // handle CSRF token errors here
  res.status(403)
  res.send('form tampered with')
})

app.use(usersRouter)

app.get('/csrf', (req: Request, res: Response) => {
  res.status(200).send(req.csrfToken())
})

app.get('/', (_, res) => {
  res.status(200).json({ message: 'Hello from API' })
})

app.get('/health', (_, res: Response) => {
  res.status(200).json({
    database: getConnection().isConnected,
    redis: redisClient.status === 'ready',
  })
})

export { app }
