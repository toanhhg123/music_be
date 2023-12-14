import { BaseAuthenticationRouter } from '~/base/base.router'
import commentController from './comment.controller'
import expressAsyncHandler from 'express-async-handler'

export class CommentRouter extends BaseAuthenticationRouter {
  constructor() {
    super(commentController)
  }

  routerDefine(): void {
    this.router.get('/music/:id', expressAsyncHandler(commentController.getCommentByMediaId))
  }
}

export default new CommentRouter().router
