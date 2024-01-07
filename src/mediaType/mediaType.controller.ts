import { BaseController } from '~/base/base.controller'
import mediaTypeService from './mediaType.service'
import { Request, Response } from 'express'
import { Media } from '~/model'

export class MediaTypeController extends BaseController<typeof mediaTypeService> {
  constructor() {
    super(mediaTypeService)
  }

  async getOne(req: Request, res: Response) {
    const data = await this.service.model.findOne({
      where: { id: req.params.id },
      include: [{ model: Media, as: 'medias' }]
    })

    this.onSuccess(res, data)
  }
}

export default new MediaTypeController()
