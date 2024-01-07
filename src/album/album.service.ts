import { HTTP403Error } from '~/http/error'
import { Album } from './album.model'
import { Media, User } from '~/model'
import { ERole } from '~/role/role.model'
import { Op, Transaction } from 'sequelize'

class AlbumService {
  async isAuthor(userId: string, albumId: string) {
    const album = await Album.findOne({ where: { authorId: userId, id: albumId } })
    if (!album) throw new HTTP403Error()
  }

  getByUserId(userId: string) {
    return Album.findAll({
      where: { authorId: userId },
      include: [
        {
          model: User,
          as: 'author'
        },
        { model: Media, as: 'medias' }
      ]
    })
  }

  getAlbumSinger() {
    return Album.findAll({
      include: [
        {
          model: User,
          as: 'author',
          where: {
            [Op.or]: [{ roleCode: ERole.SINGER }, { roleCode: ERole.ADMIN }]
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

  async remove(transaction: Transaction, id: string) {
    await Media.update({ albumId: null }, { where: { albumId: id }, transaction })
    return await Album.destroy({ where: { id }, transaction })
  }
}

export default new AlbumService()
