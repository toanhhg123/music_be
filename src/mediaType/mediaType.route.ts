import { BaseRouter } from '~/base/base.router'
import mediaTypeController from './mediaType.controller'

export class MediaTypeRoute extends BaseRouter {
  constructor() {
    super(mediaTypeController)
  }

  routerDefine(): void {}
}

export default new MediaTypeRoute().router
