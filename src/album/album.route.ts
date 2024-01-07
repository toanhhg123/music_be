import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { authorize } from '~/middlewares/auth.middleware'
import { getMyAlbum, getAlbumsSinger, create, update, remove } from './album.controller'

const router = Router()

router.get('/singer', expressAsyncHandler(getAlbumsSinger))

router.use(authorize())

router.get('/my-album', expressAsyncHandler(getMyAlbum))
router.post('/', expressAsyncHandler(create))
router.patch('/:id', expressAsyncHandler(update))
router.delete('/:id', expressAsyncHandler(remove))

export default router
