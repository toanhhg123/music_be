import { BaseAuthenticationRouter } from '~/base/base.router'
import downloadController from './download.controller'
import { authorize } from '~/middlewares/auth.middleware'
import expressAsyncHandler from 'express-async-handler'

class DownloadRoute extends BaseAuthenticationRouter {
  constructor() {
    super(downloadController)
  }

  routerDefine(): void {
    this.router.get('/me', authorize([]), expressAsyncHandler(downloadController.getMe))
  }
}

export default new DownloadRoute().router
