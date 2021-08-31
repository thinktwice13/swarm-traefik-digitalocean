import { authSession } from '@lib/auth/middleware'
import { usersRouter } from '@lib/users/router'
import cors from 'cors'
import express, { Response } from 'express'
import getenv from 'getenv'
import { getConnection } from 'typeorm'

const app = express()

// Setup CORS first
app.use(
  cors({
    origin: getenv('DOMAIN', 'http://localhost'),
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
  })
})

export { app }
