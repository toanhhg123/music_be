import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, NonAttribute } from 'sequelize'
import sequelize from '~/config/db'
import { Media } from '~/media/media.model'
import { User } from '~/model'

export class PlayList extends Model<
  InferAttributes<PlayList, { omit: 'medias' | 'author' }>,
  InferCreationAttributes<PlayList>
> {
  declare id: CreationOptional<string>
  declare name: string
  declare authorId: string

  declare author?: NonAttribute<User>
  declare medias?: NonAttribute<Media[]>
}

PlayList.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    authorId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  },
  { sequelize, modelName: 'Playlists', timestamps: true }
)
