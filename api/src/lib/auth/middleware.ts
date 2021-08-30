import User from '@lib/users/model'
import redisClient from '@utils/redis-client'
import connectRedis from 'connect-redis'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import expressSession, { Store } from 'express-session'
import getenv from 'getenv'

// Augment express-session req.session
declare module 'express-session' {
  interface SessionData {
    viewer: User
  }
}

const sessionStore = () => {
  let store: Store

  if (process.env.NODE_ENV === 'production') {
    const RedisStore = connectRedis(expressSession)
    store = new RedisStore({ client: redisClient })
  }

  return store // Returning udefined store will initialize default MemoryStore
}

export const authSession = expressSession({
  store: sessionStore(),
  secret: getenv('COOKIE_SECRET'),
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // If true only transmit cookie over https
    httpOnly: true, // If true prevent client side JS from reading the cookie
    maxAge: 1000 * 60 * 60 * 24 * 7, // A week in miliseconds
    sameSite: 'strict',
  },
})

export const requireAuth: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  if (!req.session.viewer) res.status(401).send('Not authorized')
  else next()
}
