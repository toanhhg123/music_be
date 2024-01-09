import { Router } from 'express'
import albumRouter from '~/album/album.route'
import authRouter from '~/auth/auth.route'
import commentRouter from '~/comment/comment.router'
import favoriteRoute from '~/favorite/favorite.route'
import historyRouter from '~/history/history.router'
import mediaRouter from '~/media/media.route'
import playlistRouter from '~/playlist'
import uploadRouter from '~/upload/upload.route'
import userRouter from '~/user/user.route'
import paymentRoute from '~/payment/payment.route'
import reportRouter from '~/report/report.route'
import mediaTypeRouter from '~/mediaType/mediaType.route'
import downloadRouter from '~/download/download.route'

const router = Router()

router.get('/', (req, res) => res.send('hello word 2'))
router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/media', mediaRouter)
router.use('/mediaType', mediaTypeRouter)
router.use('/album', albumRouter)
router.use('/playlist', playlistRouter)
router.use('/favorite', favoriteRoute.router)
router.use('/upload', uploadRouter)
router.use('/history', historyRouter)
router.use('/comment', commentRouter)
router.use('/payment', paymentRoute)
router.use('/report', reportRouter)
router.use('/download', downloadRouter)

export default router
