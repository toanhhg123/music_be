import { BaseController } from '~/base/base.controller'
import { FavoriteService } from './favorite.service'
import { Request, Response } from 'express'

export class FavoriteController extends BaseController<FavoriteService> {
  constructor(favoriteService: FavoriteService) {
    super(favoriteService)
    this.getMyFavorite = this.getMyFavorite.bind(this)
  }

  async getMyFavorite(req: Request, res: Response) {
    const data = await this.service.getFavoriteByUserId(req.user.id)
    this.onSuccess(res, data)
  }
}
