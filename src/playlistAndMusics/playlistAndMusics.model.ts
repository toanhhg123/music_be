import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize'
import sequelize from '~/config/db'
import { Media } from '~/media/media.model'
import { PlayList } from '~/model'

export class PlayListAndMusic extends Model<
  InferAttributes<PlayListAndMusic, { omit: 'playlist' | 'media' }>,
  InferCreationAttributes<PlayListAndMusic>
> {
  declare id: CreationOptional<string>
  declare playListId: string
  declare mediaId: string

  declare playlist?: NonAttribute<PlayList>
  declare media?: NonAttribute<Media[]>
}

PlayListAndMusic.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    playListId: {
      type: DataTypes.UUID
    },
    mediaId: {
      type: DataTypes.UUID
    }
  },
  { sequelize, modelName: 'PlayListAndMusics', timestamps: true }
)
