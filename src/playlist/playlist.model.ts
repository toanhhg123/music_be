import {
  Association,
  DataTypes,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyRemoveAssociationsMixin,
  NonAttribute
} from 'sequelize'
import { BaseModel } from '~/base/base.model'
import sequelize from '~/config/db'
import { Media } from '~/media/media.model'
import { PlayListAndMusic, User } from '~/model'

class PlayList extends BaseModel<PlayList, { omit: 'author' | 'medias' | 'playlistAndMusics' }> {
  declare name: string
  declare authorId: string

  declare author?: NonAttribute<User>
  declare medias?: NonAttribute<Media[]>
  declare playlistAndMusics?: NonAttribute<PlayListAndMusic[]>

  declare getPlaylistAndMusics: HasManyGetAssociationsMixin<PlayListAndMusic> // Note the null assertions!
  declare createPlaylistAndMusic: HasManyCreateAssociationMixin<PlayListAndMusic, 'playListId'> // Note the null assertions!
  declare removePlaylistAndMusic: HasManyRemoveAssociationsMixin<PlayListAndMusic, string> // Note the null assertions!

  declare static associations: {
    playlistAndMusics: Association<PlayList, PlayListAndMusic>
  }
}

export const TPlayList = PlayList.init(
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

export default PlayList
