import { Router } from 'express'
import authRouter from '~/auth/auth.route'
import userRouter from '~/user/user.route'
import mediaRouter from '~/media/media.route'
import albumRouter from '~/album/album.route'
import playlistRouter from '~/playlist'

const router = Router()

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/media', mediaRouter)
router.use('/album', albumRouter)
router.use('/playlist', playlistRouter)

export default router
