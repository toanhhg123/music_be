import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, NonAttribute } from 'sequelize'
import { Album } from '~/album/album.model'
import sequelize from '~/config/db'
import { MediaType } from '~/mediaType/mediaType.model'
import { User } from '~/model'

export class Media extends Model<InferAttributes<Media, { omit: 'author' | 'album' }>, InferCreationAttributes<Media>> {
  declare id: CreationOptional<string>
  declare name: string
  declare desc: string
  declare image: string
  declare src: string
  declare authorId: string
  declare isPremium: boolean
  declare duration: number
  declare listenNumber: number
  declare mediaTypeId?: string

  declare albumId: CreationOptional<string> | null
  declare author?: NonAttribute<User>
  declare album?: NonAttribute<Album>
  declare mediaType?: NonAttribute<MediaType>
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
    mediaTypeId: {
      type: DataTypes.UUID,
      allowNull: true
    },
    albumId: {
      type: DataTypes.UUID,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    listenNumber: {
      type: DataTypes.INTEGER,
      defaultValue: 0
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
