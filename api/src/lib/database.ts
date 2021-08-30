import User from '@lib/users/model'
import getenv from 'getenv'
import { createConnection } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

// Database config

const config = () => {
  const commonConfig: PostgresConnectionOptions = {
    entities: [User],
    type: 'postgres',
    synchronize: true,
    username: getenv('POSTGRES_USER', 'postgres'),
    password: getenv('POSTGRES_PASSWORD', 'postgres'),
    /**
     * Attempt connecting to a local port if env var not provided.
     * Can be used to run commands through docker container exposed ports
     */
    host: getenv('POSTGRES_HOST', 'localhost'),
  }

  if (['production', 'development'].includes(process.env.NODE_ENV)) {
    // If matches environment explicitly set in Docker image
    return {
      ...commonConfig,
      /** Fail if not provided */
      database: getenv('POSTGRES_DB'),
    }
  }

  // Otherwise, (NODE_ENV undefined) it is run from local machine connecting to test database
  return {
    ...commonConfig,
    name: 'test', // To use with getConnection()
    database: 'test',
  }
}

/**
 * Return existing connection for provided connection name or create new
 * If no connectionName provided
 */
export default async () =>
  createConnection(config())
    .then(() => {
      console.log('Connected to database')
    })
    .catch((error) => {
      console.log(error)
      console.error(error)
      process.exit(1)
    })