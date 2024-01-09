import { BaseController } from '~/base/base.controller'
import downloadService from './download.service'
import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'
import { Media, User } from '~/model'

class DownloadController extends BaseController<typeof downloadService> {
  constructor() {
    super(downloadService)
  }

  async create(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    const { id } = req.user

    const data = await this.service.create({
      userId: id,
      ...req.body
    })

    this.onSuccess(res, data)
  }

  async getMe(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ) {
    const { id } = req.user

    const data = await this.service.findWithPagination({
      where: { userId: id },
      include: [{ model: Media, as: 'media', include: [{ model: User, as: 'author' }] }]
    })

    this.onSuccess(res, data)
  }
}

export default new DownloadController()
