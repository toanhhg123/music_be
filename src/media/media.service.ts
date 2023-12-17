import { Op } from 'sequelize'
import { Album, User } from '~/model'
import { PageQuery } from '~/utils/page-queries'
import { Media } from './media.model'

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
}

export default new MediaService()
