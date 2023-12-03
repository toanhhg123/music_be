import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { getAll, AddMusic, updateMusic } from './media.controller'
import { authorize } from '~/middlewares/auth.middleware'

const router = Router()

router.get('/', expressAsyncHandler(getAll))

router.use(authorize())
router.post('/', expressAsyncHandler(AddMusic))
router.patch('/:id', expressAsyncHandler(updateMusic))

export default router
