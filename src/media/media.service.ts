import { Op, Transaction } from 'sequelize'
import { Favorite } from '~/favorite/favorite.model'
import { Album, Comment, History, PlayListAndMusic, User } from '~/model'
import { PageQuery } from '~/utils/page-queries'
import { Media } from './media.model'
import { HTTP400Error } from '~/http/error'

class MediaService {
  getAll(query: PageQuery) {
    const search = query.search || ''

    return Media.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: '%' + search + '%'
            }
          },
          {
            '$author.firstName$': {
              [Op.like]: '%' + search + '%'
            }
          },
          {
            '$author.email$': {
              [Op.like]: '%' + search + '%'
            }
          },
          {
            '$author.lastName$': {
              [Op.like]: '%' + search + '%'
            }
          }
        ]
      },
      include: [
        { model: Album, as: 'album' },
        {
          model: User,
          as: 'author'
        }
      ]
    })
  }

  getByAlbumId(albumId: string) {
    return Media.findAll({
      where: {
        albumId
      },
      include: [
        { model: Album, as: 'album' },
        { model: User, as: 'author' }
      ]
    })
  }

  getById(id: string) {
    return Media.findOne({
      where: { id },
      include: [
        { model: Album, as: 'album' },
        { model: User, as: 'author' }
      ]
    })
  }

  create(media: Media) {
    return Media.create(media)
  }

  update(id: string, media: Partial<Media>) {
    return Media.update(media, { where: { id } })
  }

  async increaseListenNumber(id: string) {
    const media = await Media.findByPk(id)
    if (!media) throw new HTTP400Error('not found media')
    media.listenNumber = media.listenNumber + 1
    return media.save()
  }

  async remove(transaction: Transaction, id: string) {
    await PlayListAndMusic.destroy({ where: { mediaId: id }, transaction })
    await Comment.destroy({ where: { mediaId: id }, transaction })
    await Favorite.destroy({ where: { mediaId: id }, transaction })
    await History.destroy({ where: { mediaId: id }, transaction })
    const number = await Media.destroy({ where: { id }, transaction })
    return number
  }
}

export default new MediaService()
