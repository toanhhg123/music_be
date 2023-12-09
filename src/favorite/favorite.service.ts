import { BaseService } from '~/base/base.service'
import { Favorite } from './favorite.model'
import { FindOptions } from 'sequelize'

export class FavoriteService extends BaseService<Favorite> {
  constructor() {
    super(Favorite.tableName)
  }

  getFavoriteByUserId(userId: string, options?: FindOptions<Favorite>) {
    return this.findWithPagination({ ...options, where: { userId } })
  }
}
