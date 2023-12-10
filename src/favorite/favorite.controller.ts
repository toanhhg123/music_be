import { Request, Response } from 'express'
import { ParsedQs } from 'qs'
import { BaseController } from '~/base/base.controller'
import { FavoriteService } from './favorite.service'
import { ParamsDictionary } from 'express-serve-static-core'
import { Favorite } from './favorite.model'

export class FavoriteController extends BaseController<FavoriteService> {
  constructor(favoriteService: FavoriteService) {
    super(favoriteService)
    this.getMyFavorite = this.getMyFavorite.bind(this)
    this.getMusicTrending = this.getMusicTrending.bind(this)
  }

  async getMyFavorite(req: Request, res: Response) {
    const data = await this.service.getFavoriteByUserId(req.user.id)
    this.onSuccess(res, data)
  }

  async getMusicTrending(req: Request, res: Response) {
    const data = await this.service.getMediaTrending()
    this.onSuccess(res, data)
  }

  create(
    req: Request<ParamsDictionary, any, Favorite, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ) {
    const { id } = req.user
    req.body.userId = id

    return super.create(req, res)
  }

  async remove(
    req: Request<{ id: string }, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    await this.service.validateAuthor(req.user.id, req.params.id)
    return super.remove(req, res)
  }
}
