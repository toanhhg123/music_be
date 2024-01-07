import { BaseController } from '~/base/base.controller'
import mediaTypeService from './mediaType.service'

export class MediaTypeController extends BaseController<typeof mediaTypeService> {
  constructor() {
    super(mediaTypeService)
  }
}

export default new MediaTypeController()
