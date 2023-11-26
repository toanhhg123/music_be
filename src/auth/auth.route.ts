import { Router } from 'express'
import { login, register } from './auth.controller'
import expressAsyncHandler from 'express-async-handler'

const router = Router()

router.post('/login', expressAsyncHandler(login))
router.post('/register', expressAsyncHandler(register))

export default router
