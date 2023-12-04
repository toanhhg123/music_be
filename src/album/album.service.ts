import { HTTP403Error } from '~/http/error'
import { Album } from './album.model'
import { Media, User } from '~/model'
import { ERole } from '~/role/role.model'

class AlbumService {
  async isAuthor(userId: string, albumId: string) {
    const album = await Album.findOne({ where: { authorId: userId, id: albumId } })
    if (!album) throw new HTTP403Error()
  }

  getByUserId(userId: string) {
    return Album.findAll({ where: { authorId: userId } })
  }

  getAlbumSinger() {
    return Album.findAll({
      include: [
        {
          model: User,
          as: 'author',
          where: {
            roleCode: ERole.SINGER
          }
        },
        { model: Media, as: 'medias' }
      ]
    })
  }

  update(id: string, album: Partial<Album>) {
    return Album.update(album, { where: { id } })
  }

  create(album: Album) {
    return Album.create(album)
  }
}

export default new AlbumService()
