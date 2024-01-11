import { BaseRouter } from '~/base/base.router'
import mediaTypeController from './mediaType.controller'

export class MediaTypeRoute extends BaseRouter {
  constructor() {
    super(mediaTypeController)
  }
}

export default new MediaTypeRoute().router
