import database from '@lib/database'
import getenv from 'getenv'
import http from 'http'
import 'reflect-metadata'
import { getConnection } from 'typeorm'
import { app } from './app'

const start = async () => {
  // Attempt db connection as early as possible
  database()

  const port = getenv.int('PORT')

  const shutdown = async () => {
    server.close(function onServerClosed(err) {
      if (err) {
        console.error(err)
        process.exitCode = 1
      }
      process.exit()
    })
  }

  // Quit on ctrl-c when running docker in terminal
  process.on('SIGINT', async function onSigint() {
    console.info(
      'Got SIGINT (aka ctrl-c in docker). Graceful shutdown ',
      new Date().toISOString(),
    )
    await getConnection().close()
    shutdown()
    process.exit()
  })

  process.on('SIGTERM', async () => {
    console.log('SIGTERM received. Stopping server...')
    await getConnection().close()
    shutdown()
  })

  process.on('unhandledRejection', (reason) => {
    console.log(`Unhandled rejection:  ${reason}`)
    process.exit(1)
  })

  const server: http.Server = app
    .listen(port, () => {
      console.log(`Server started on port ${port}.`)
    })
    .on('error', (err) => {
      console.error(err)
      process.exit(1)
    })
}

start()
