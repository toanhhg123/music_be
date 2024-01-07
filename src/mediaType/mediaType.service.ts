import { BaseService } from '~/base/base.service'
import { MediaType } from './mediaType.model'

export class MediaTypeService extends BaseService<MediaType> {
  constructor() {
    super(MediaType.tableName)
  }
}

export default new MediaTypeService()
