import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { get } from './report.controller'
import { authorize } from '~/middlewares/auth.middleware'

const router = Router()

router.get('/', authorize(), expressAsyncHandler(get))

export default router
