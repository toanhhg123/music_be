import { FindOptions, InferCreationAttributes, Optional } from 'sequelize'
import { BaseService } from '~/base/base.service'
import { History, Media } from '~/model'

export class HistoryService extends BaseService<History> {
  constructor() {
    super(History.tableName)
  }

  findWithPagination(
    findOptions: FindOptions<History>
  ): Promise<{ rows: History[]; total: number; skip: number; limit: number; page: number }> {
    return super.findWithPagination({
      ...findOptions,
      include: [{ as: 'media', model: Media }],
      order: [['createdAt', 'DESC']]
    })
  }

  async create(dataInsert: Optional<InferCreationAttributes<History, { omit: never }>, 'id'>): Promise<History> {
    await this.model.destroy({ where: { mediaId: dataInsert.mediaId } })

    return super.create(dataInsert)
  }
}

export default new HistoryService()
