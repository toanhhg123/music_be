import { BaseService } from '~/base/base.service'
import Download from './download.model'

class DownloadService extends BaseService<Download> {
  constructor() {
    super(Download.tableName)
  }
}

export default new DownloadService()
