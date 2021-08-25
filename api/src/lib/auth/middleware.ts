import User from '@lib/users/model'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import expressSession from 'express-session'

// Augment express-session req.session
declare module 'express-session' {
  interface SessionData {
    viewer: User
  }
}

export const authSession = expressSession({
  secret: process.env.COOKIE_SECRET,
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
