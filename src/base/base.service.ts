import { CreationAttributes, FindOptions, ModelCtor } from 'sequelize'
import sequelize from '~/config/db'
import { BaseModel } from './base.model'

export class BaseService<T extends BaseModel = any> {
  tableName: string
  model: ModelCtor<T>

  constructor(tableName: string) {
    this.tableName = tableName
    this.model = sequelize.model(this.tableName) as ModelCtor<T>
  }

  async findWithPagination(findOptions: FindOptions<T>) {
    const offset = Number(findOptions.offset) || 0
    const limit = Number(findOptions.limit) || 20

    const { rows, count } = await this.model.findAndCountAll({ ...findOptions, offset, limit })

    return {
      rows,
      total: count,
      skip: offset,
      limit,
      page: Math.ceil(offset / limit)
    }
  }

  create(dataInsert: CreationAttributes<T>) {
    return this.model.create(dataInsert)
  }

  update(id: any, dataUpdate: CreationAttributes<T>) {
    return this.model.update(dataUpdate, { where: { id: id } })
  }

  delete(id: any) {
    return this.model.destroy({ where: { id } })
  }
}
