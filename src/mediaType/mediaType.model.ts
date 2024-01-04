import { DataTypes, NonAttribute } from 'sequelize'
import { BaseModel } from '~/base/base.model'
import { Media } from '~/model'
import sequelize from '~/config/db'

export class MediaType extends BaseModel<MediaType, { omit: 'medias' }> {
  declare name: string
  declare image: string
  declare note: string
  declare medias?: NonAttribute<Media[]>
}

MediaType.init(
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
    image: {
      type: DataTypes.STRING
    },
    note: {
      type: DataTypes.TEXT
    }
  },
  { sequelize, modelName: 'MediaTypes', timestamps: true }
)
