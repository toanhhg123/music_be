import { Op } from 'sequelize'
import { Album, User } from '~/model'
import { PageQuery } from '~/utils/page-queries'
import { Media } from './media.model'

class MediaService {
  getAll(query: PageQuery) {
    const search = query.search || ''

    const filter = {
      name: {
        [Op.like]: '%' + search + '%'
      }
    }

    return Media.findAll({ where: filter, include: [{ model: Album }, { model: User, as: 'author' }] })
  }

  getById(id: string) {
    return Media.findOne({ where: { id }, include: [{ model: Album }, { model: User, as: 'author' }] })
  }

  create(media: Media) {
    return Media.create(media)
  }

  update(id: string, media: Partial<Media>) {
    return Media.update(media, { where: { id } })
  }
}

export default new MediaService()
