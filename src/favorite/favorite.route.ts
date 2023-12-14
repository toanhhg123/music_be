import expressAsyncHandler from 'express-async-handler'
import { BaseAuthenticationRouter } from '~/base/base.router'
import { FavoriteController } from './favorite.controller'
import { FavoriteService } from './favorite.service'
import { authorize } from '~/middlewares/auth.middleware'

const controller = new FavoriteController(new FavoriteService())

export class FavoriteRouter extends BaseAuthenticationRouter {
  constructor() {
    super(controller)
  }

  routerDefine(): void {
    this.router.get('/my-favorite', expressAsyncHandler(authorize()), expressAsyncHandler(controller.getMyFavorite))
    this.router.get('/trending', expressAsyncHandler(controller.getMusicTrending))
  }
}

export default new FavoriteRouter()
