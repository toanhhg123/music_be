import { Router } from 'express'
import authRouter from '~/auth/auth.route'
import userRouter from '~/user/user.route'
import mediaRouter from '~/media/media.route'
import albumRouter from '~/album/album.route'

const router = Router()

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/media', mediaRouter)
router.use('/album', albumRouter)

export default router
