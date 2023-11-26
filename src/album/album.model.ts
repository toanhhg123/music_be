import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, NonAttribute } from 'sequelize'
import sequelize from '~/config/db'
import { Media } from '~/media/media.model'
import { User } from '~/model'

export class Album extends Model<
  InferAttributes<Album, { omit: 'medias' | 'author' }>,
  InferCreationAttributes<Album>
> {
  declare id: CreationOptional<string>
  declare name: string
  declare authorId: string
  declare desc: string
  declare image: string

  declare author?: NonAttribute<User>
  declare medias?: NonAttribute<Media[]>
}

Album.init(
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
    },
    desc: {
      type: DataTypes.TEXT
    },
    image: {
      type: DataTypes.STRING
    }
  },
  { sequelize, modelName: 'Albums', timestamps: true }
)
