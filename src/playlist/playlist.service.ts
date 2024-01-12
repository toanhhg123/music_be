import { FindOptions } from 'sequelize'
import { BaseService } from '~/base/base.service'
import { Album, Media, PlayList, PlayListAndMusic, User } from '~/model'

export class PlaylistService extends BaseService<PlayList> {
  constructor() {
    super(PlayList.tableName)
  }

  findWithPagination(
    findOptions: FindOptions<PlayList>
  ): Promise<{ rows: PlayList[]; total: number; skip: number; limit: number; page: number }> {
    return super.findWithPagination({
      ...findOptions,
      include: [
        {
          model: PlayListAndMusic,
          as: 'playlistAndMusics',
          include: [
            {
              model: Media,
              as: 'media',
              include: [
                { model: Album, as: 'album' },
                { model: User, as: 'author' }
              ]
            }
          ]
        }
      ]
    })
  }

  async addMusicToPlaylist(playlistAndMusic: PlayListAndMusic) {
    const isExist = await PlayListAndMusic.findOne({
      where: { playListId: playlistAndMusic.playListId, mediaId: playlistAndMusic.mediaId }
    })

    if (isExist) return isExist

    const playList = await this.model.findByPk(playlistAndMusic.playListId, {
      include: [{ association: PlayList.associations.playlistAndMusics, as: 'playlistAndMusics' }]
    })

    if (!playList?.playlistAndMusics) throw new Error('playlist not found')

    await playList.createPlaylistAndMusic(playlistAndMusic)

    return playList.save()
  }

  removePlaylistMusic(id: string) {
    return PlayListAndMusic.destroy({ where: { id } })
  }

  public getPlayListByUserId(authorId: string) {
    return this.findWithPagination({ where: { authorId } })
  }
}
