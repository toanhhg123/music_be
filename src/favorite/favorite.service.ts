import { BaseService } from '~/base/base.service'
import { Favorite } from './favorite.model'
import { FindOptions, InferCreationAttributes, Op, Optional } from 'sequelize'
import { Media } from '~/model'
import { HTTP403Error } from '~/http/error'
import sequelize from '~/config/db'

export class FavoriteService extends BaseService<Favorite> {
  constructor() {
    super(Favorite.tableName)
  }

  async validateAuthor(userId: string, favoriteId: string) {
    const isExist = await this.model.findOne({
      where: {
        userId,
        [Op.or]: [{ id: favoriteId }, { mediaId: favoriteId }]
      }
    })
    if (!isExist) throw new HTTP403Error()
  }

  async getMediaTrending() {
    const favoritesGrouped = await this.model.findAll({
      attributes: ['mediaId', [sequelize.fn('COUNT', sequelize.col('mediaId')), 'favorites']],
      group: ['mediaId'],
      include: [{ model: Media, as: 'media' }],
      order: [['favorites', 'DESC']]
    })

    return favoritesGrouped
  }

  findWithPagination(
    findOptions: FindOptions<Favorite>
  ): Promise<{ rows: Favorite[]; total: number; skip: number; limit: number; page: number }> {
    return super.findWithPagination({ ...findOptions, include: [{ model: Media, as: 'media' }] })
  }

  getFavoriteByUserId(userId: string, options?: FindOptions<Favorite>) {
    return this.findWithPagination({ ...options, where: { userId } })
  }

  async create(favorite: Optional<InferCreationAttributes<Favorite, { omit: never }>, 'id'>): Promise<Favorite> {
    const isExist = await this.model.findOne({ where: { userId: favorite.userId, mediaId: favorite.mediaId } })
    if (isExist) return isExist

    return super.create(favorite)
  }
}
