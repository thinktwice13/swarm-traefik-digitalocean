import { User } from '@lib/users/model'
import { createConnection } from 'typeorm'

/**
 * Return existing connection for provided connection name or create new
 * If no connectionName provided
 */
export default async () =>
  createConnection({
    type: 'postgres',
    synchronize: true,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.NODE_ENV,
    host: 'db',
    entities: [User],
  })
    .then(() => {
      console.log('Connected to database')
    })
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
