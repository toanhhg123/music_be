import { BaseRouter } from '~/base/base.router'
import mediaTypeController from './mediaType.controller'
import expressAsyncHandler from 'express-async-handler'

export class MediaTypeRoute extends BaseRouter {
  constructor() {
    super(mediaTypeController)
  }

  routerDefine(): void {
    this.router.get('/:id', expressAsyncHandler(mediaTypeController.getOne))
  }
}

export default new MediaTypeRoute().router
