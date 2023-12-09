import { Router } from 'express'

export class BaseRouter {
  router: Router

  constructor() {
    this.router = Router()
  }
}
