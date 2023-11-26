import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, NonAttribute } from 'sequelize'
import sequelize from '~/config/db'
import { Media } from '~/media/media.model'
import { User } from '~/model'

export class Favorite extends Model<
  InferAttributes<Favorite, { omit: 'media' | 'user' }>,
  InferCreationAttributes<Favorite>
> {
  declare id: CreationOptional<string>
  declare userId: string
  declare mediaId: string

  declare user?: NonAttribute<User>
  declare media?: NonAttribute<Media[]>
}

Favorite.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      type: DataTypes.UUID
    },
    mediaId: {
      type: DataTypes.UUID
    }
  },
  { sequelize, modelName: 'Favorites', timestamps: true }
)
