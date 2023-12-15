import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { getAll, AddMusic, updateMusic, getOne, getByAlbumId, getMyMusic, getMusicByUserId } from './media.controller'
import { authorize } from '~/middlewares/auth.middleware'

const router = Router()

router.get('/', expressAsyncHandler(getAll))
router.get('/:id', expressAsyncHandler(getOne))
router.get('/user/:id', expressAsyncHandler(getMusicByUserId))
router.get('/album/:id', expressAsyncHandler(getByAlbumId))

router.use(authorize())
router.get('/my-music', expressAsyncHandler(getMyMusic))
router.post('/', expressAsyncHandler(AddMusic))
router.patch('/:id', expressAsyncHandler(updateMusic))

export default router
