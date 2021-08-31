import { authSession } from '@lib/auth/middleware'
import { usersRouter } from '@lib/users/router'
import { redisClient } from '@utils/redis-client'
import cors from 'cors'
import express, { Response } from 'express'
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

app.use(usersRouter)

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
