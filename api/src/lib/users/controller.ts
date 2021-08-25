import { createUser, findByPassphrase, getAllUsers } from '@lib/users/service'
import { Request, Response } from 'express'

/**
 * Only use passphrase for register/login for this example repo
 */
export const login = async (req: Request, res: Response) => {
  try {
    let user = await findByPassphrase(req.body.passphrase)
    let status: number = 200

    if (!user) {
      user = await createUser(req.body.passphrase)
      status = 201
    }

    req.session.viewer = user
    res.status(status).json({ data: user, success: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ errors: [error] })
  }
}

export const logout = async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ errors: [err.message] })
    } else {
      res
        .clearCookie('connect.sid') // Hint to the browser to remove the cookie. Name comes from express-session
        .status(200)
        .send('Signed out')
    }
  })
}

export const allUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers()
    res.status(200).json({ success: true, data: users })
  } catch (error) {
    console.error(error)
    res.status(400).json({ errors: [error] })
  }
}

export const getUser = (req: Request, res: Response) => {
  res.status(200).json({ success: true, data: req.session.viewer })
}
