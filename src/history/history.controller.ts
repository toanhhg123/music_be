import { BaseController } from '~/base/base.controller'
import historyService, { HistoryService } from './history.service'
import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { History } from './history.model'
import { ParsedQs } from 'qs'

export class HistoryController extends BaseController<HistoryService> {
  constructor() {
    super(historyService)
  }

  create(req: Request<ParamsDictionary, any, History>, res: Response<any, Record<string, any>>): Promise<void> {
    req.body.userId = req.user.id
    console.log(req.body)
    return super.create(req, res)
  }

  async getAll(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    const data = await this.service.findWithPagination({ where: { userId: req.user.id } })
    res.json(data)
  }
}

export default new HistoryController()
