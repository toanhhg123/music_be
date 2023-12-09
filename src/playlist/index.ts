import expressAsyncHandler from 'express-async-handler'
import { PlaylistController } from './playlist.controller'
import { PlaylistService } from './playlist.service'
import { Router } from 'express'
import { authorize } from '~/middlewares/auth.middleware'

const playListService = new PlaylistService()

const playlistController = new PlaylistController(playListService)

const router = Router()

const { getAll, create, update, remove, addMusicToPlaylist, getMyPlayList, removePlaylistMusic } = playlistController

router.use(authorize([]))

router.get('/', expressAsyncHandler(getAll))
router.get('/my-playlist', expressAsyncHandler(getMyPlayList))
router.post('/', expressAsyncHandler(create))

router.post('/addMusicToPlaylist', expressAsyncHandler(addMusicToPlaylist))

router.patch('/:id', expressAsyncHandler(update))

router.delete('/:id', expressAsyncHandler(remove))
router.delete('/removePlaylistMusic/:id', expressAsyncHandler(removePlaylistMusic))

export default router
