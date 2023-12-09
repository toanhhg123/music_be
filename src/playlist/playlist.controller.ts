import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'
import { BaseController } from '~/base/base.controller'
import { PlayList, PlayListAndMusic } from '~/model'
import { PlaylistService } from './playlist.service'

export class PlaylistController extends BaseController<PlaylistService> {
  constructor(service: PlaylistService) {
    super(service)

    this.getMyPlayList = this.getMyPlayList.bind(this)
    this.addMusicToPlaylist = this.addMusicToPlaylist.bind(this)
    this.removePlaylistMusic = this.removePlaylistMusic.bind(this)
  }

  create(
    req: Request<ParamsDictionary, any, PlayList, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ) {
    const { user } = req

    req.body = {
      ...req.body,
      authorId: user.id
    } as PlayList

    return super.create(req, res)
  }

  async getMyPlayList(
    req: Request<ParamsDictionary, any, PlayList, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ) {
    const { user } = req
    const data = await this.service.getPlayListByUserId(user.id)

    this.onSuccess(res, data)
  }

  async addMusicToPlaylist(
    req: Request<ParamsDictionary, any, PlayListAndMusic, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ) {
    const data = await this.service.addMusicToPlaylist(req.body)
    this.onSuccess(res, data)
  }

  async removePlaylistMusic(
    req: Request<{ id: string }, any, PlayListAndMusic, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ) {
    const data = await this.service.removePlaylistMusic(req.params.id)
    this.onSuccess(res, data)
  }
}
