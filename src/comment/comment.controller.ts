import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { BaseController } from '~/base/base.controller'
import commentService, { CommentService } from './comment.service'
import { Comment } from './comments.model'
import { ParsedQs } from 'qs'
import { HTTP403Error } from '~/http/error'
import { User } from '~/model'

export class CommentController extends BaseController<CommentService> {
  constructor() {
    super(commentService)
    this.getCommentByMediaId = this.getCommentByMediaId.bind(this)
  }

  create(req: Request<ParamsDictionary, any, Comment>, res: Response<any, Record<string, any>>): Promise<void> {
    req.body.authorId = req.user.id
    return super.create(req, res)
  }

  async getCommentByMediaId(req: Request<{ id: string }>, res: Response) {
    const data = await this.service.findWithPagination({
      where: { mediaId: req.params.id },
      include: [{ model: User, as: 'author' }]
    })
    this.onSuccess(res, data)
  }

  async remove(
    req: Request<{ id: string }, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    const comment = await this.service.model.findByPk(req.params.id)

    if (comment?.authorId !== req.user.id) throw new HTTP403Error()

    return super.remove(req, res)
  }
}

export default new CommentController()
