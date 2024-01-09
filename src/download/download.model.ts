import { DataTypes, NonAttribute } from 'sequelize'
import { BaseModel } from '~/base/base.model'
import sequelize from '~/config/db'
import { Media } from '~/model'

class Download extends BaseModel<Download, { omit: 'media' }> {
  declare mediaId: string
  declare userId: string

  declare media?: NonAttribute<Media>
}

Download.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    mediaId: {
      type: DataTypes.UUID
    },
    userId: {
      type: DataTypes.UUID
    }
  },
  { sequelize, modelName: 'Downloads', timestamps: true }
)

export default Download
