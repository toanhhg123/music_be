import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, NonAttribute } from 'sequelize'
import { Album } from '~/album/album.model'
import sequelize from '~/config/db'
import { User } from '~/model'

export class Media extends Model<InferAttributes<Media, { omit: 'author' | 'album' }>, InferCreationAttributes<Media>> {
  declare id: CreationOptional<string>
  declare name: string
  declare desc: string
  declare image: string
  declare src: string
  declare authorId: string
  declare isPremium: boolean
  declare albumId: CreationOptional<string>
  declare author?: NonAttribute<User>
  declare album?: NonAttribute<Album>
}

Media.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    authorId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    albumId: {
      type: DataTypes.UUID,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    src: {
      type: DataTypes.STRING,
      allowNull: false
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    isPremium: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  { sequelize, modelName: 'Medias', timestamps: true }
)
