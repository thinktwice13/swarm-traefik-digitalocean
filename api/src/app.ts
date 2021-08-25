import cors from 'cors'
import express, { Response } from 'express'
import { getConnection } from 'typeorm'

const app = express()

app.use(cors())

app.get('/', (_, res) => {
  res.status(200).json({ message: 'Hello from API' })
})

app.get('/health', (_, res: Response) => {
  res.status(200).json({
    database: getConnection().isConnected,
  })
})

export { app }
