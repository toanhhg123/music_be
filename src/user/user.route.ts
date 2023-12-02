import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { createUser, getAllUser, getMe, updateUser } from './user.controller'
import { authorize } from '~/middlewares/auth.middleware'

const router = Router()

router.get('/me', authorize(), expressAsyncHandler(getMe))

router.get('/', expressAsyncHandler(getAllUser))
router.post('/', expressAsyncHandler(createUser))
router.patch('/:id', expressAsyncHandler(updateUser))

export default router
