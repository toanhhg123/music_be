import { Router } from 'express'
import { changePassword, login, register } from './auth.controller'
import expressAsyncHandler from 'express-async-handler'
import { authorize } from '~/middlewares/auth.middleware'

const router = Router()

router.post('/login', expressAsyncHandler(login))
router.post('/change-password', expressAsyncHandler(authorize()), expressAsyncHandler(changePassword))

router.post('/register', expressAsyncHandler(register))

export default router
