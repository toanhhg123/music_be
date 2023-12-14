import { BaseAuthenticationRouter } from '~/base/base.router'
import historyController from './history.controller'

export class HistoryRouter extends BaseAuthenticationRouter {
  constructor() {
    super(historyController)
  }
}

export default new HistoryRouter().router
