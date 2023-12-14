import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { BaseService } from './base.service'

export class BaseController<S extends BaseService> {
  constructor(service: S) {
    this.getAll = this.getAll.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.remove = this.remove.bind(this)

    this.service = service
    console.log(`${this.service.tableName} will be inject to controller`)
  }

  service: S

  onSuccess(res: Response, data: any) {
    res.json({
      status: StatusCodes.OK,
      message: 'success',
      element: data
    })
  }

  async getAll(req: Request, res: Response) {
    const data = await this.service.findWithPagination({ ...req.query })
    this.onSuccess(res, data)
  }

  async create(req: Request, res: Response) {
    const data = await this.service.create(req.body)

    this.onSuccess(res, data)
  }

  async update(req: Request, res: Response) {
    const data = await this.service.update(req.params.id, req.body)

    this.onSuccess(res, data)
  }

  async remove(req: Request, res: Response) {
    const data = await this.service.delete(req.params.id)

    this.onSuccess(res, data)
  }
}
