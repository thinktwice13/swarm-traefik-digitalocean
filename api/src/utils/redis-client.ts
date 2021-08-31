import Redis, { Redis as IORedis } from 'ioredis'

const client: IORedis = new Redis({
  port: 6379,
  host: 'redis',
  password: 'myRedisPwd',
  family: 4, // 4 (IPv4) or 6 (IPv6)
  showFriendlyErrorStack: true,
})

client.on('connect', function () {
  console.info('Redis ready')
})

// client.on('ready', function () {
//   console.info('Redis ready')
// })

client.on('error', function () {
  console.error('Redis unavailable')
  process.exit(1)
})

export { client as redisClient }
