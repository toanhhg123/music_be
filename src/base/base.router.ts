import { Router } from 'express'
import { BaseController } from './base.controller'
import { BaseService } from './base.service'
import expressAsyncHandler from 'express-async-handler'
import { authorize } from '~/middlewares/auth.middleware'

export class BaseRouter {
  router = Router()

  constructor({ getAll, create, update, remove }: BaseController<BaseService>) {
    this.routerDefine()
    this.router.get('/', expressAsyncHandler(getAll))
    this.router.post('/', expressAsyncHandler(create))
    this.router.patch('/:id', expressAsyncHandler(update))
    this.router.delete('/:id', expressAsyncHandler(remove))
  }

  routerDefine() {}
}

export class BaseAuthenticationRouter {
  router = Router()

  constructor({ getAll, create, update, remove }: BaseController<BaseService>) {
    this.routerDefine()
    this.router.use(authorize([]))
    this.router.get('/', expressAsyncHandler(getAll))
    this.router.post('/', expressAsyncHandler(create))
    this.router.patch('/:id', expressAsyncHandler(update))
    this.router.delete('/:id', expressAsyncHandler(remove))
  }

  routerDefine() {}
}
