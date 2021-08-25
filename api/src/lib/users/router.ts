import { allUsers, getUser, login, logout } from '@lib/users/controller'
import { Router } from 'express'

const router = Router()

router.post('/auth/login', login)
router.post('/auth/logout', logout)
router.get('/users', allUsers)
router.get('/user', getUser)

export { router as usersRouter }
