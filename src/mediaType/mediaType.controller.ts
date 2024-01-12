import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'
import { BaseController } from '~/base/base.controller'
import { transactions } from '~/config/db'
import { Album, Media, User } from '~/model'
import mediaTypeService from './mediaType.service'

export class MediaTypeController extends BaseController<typeof mediaTypeService> {
  constructor() {
    super(mediaTypeService)
  }

  async getAll(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    const data = await this.service.findWithPagination({ ...req.query, include: [{ model: Media, as: 'medias' }] })
    this.onSuccess(res, data)
  }

  async getOne(req: Request, res: Response) {
    const data = await this.service.model.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Media,
          as: 'medias',
          include: [
            { model: User, as: 'author' },
            { model: Album, as: 'album' }
          ]
        }
      ]
    })

    this.onSuccess(res, data)
  }

  async remove(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    const id = req.params.id

    const data = await transactions(async (t) => {
      await Media.update({ mediaTypeId: null }, { where: { mediaTypeId: id }, transaction: t })
      return this.service.model.destroy({ where: { id } })
    })

    this.onSuccess(res, data)
  }
}

export default new MediaTypeController()
