import cors from 'cors'
import express from 'express'

const app = express()

app.use(cors())

app.get('/', (_, res) => {
  res.status(200).json({ message: 'Hello from API' })
})

app.listen(4000, () => {
  console.log('API server running on port 4000.')
})
