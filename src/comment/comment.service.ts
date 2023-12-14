import { BaseService } from '~/base/base.service'
import { Comment } from '~/model'

export class CommentService extends BaseService<Comment> {
  constructor() {
    super('Comment')
  }
}

export default new CommentService()
