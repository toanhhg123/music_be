import expressAsyncHandler from 'express-async-handler'
import { BaseRouter } from '~/base/base.router'
import { FavoriteController } from './favorite.controller'
import { FavoriteService } from './favorite.service'

const controller = new FavoriteController(new FavoriteService())

export class FavoriteRouter extends BaseRouter {
  constructor() {
    super(controller)
    this.router.get('/my-favorite', expressAsyncHandler(controller.getMyFavorite))
  }
}

export default new FavoriteRouter()
