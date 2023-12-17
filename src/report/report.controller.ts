import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Favorite } from '~/favorite/favorite.model'
import { History } from '~/history/history.model'
import { Album, Media, User } from '~/model'
import { ERole } from '~/role/role.model'

export const get = async (req: Request, res: Response) => {
  const [userCount, singerCount, historyCount, favoriteCount, albumCount, mediaCount] = await Promise.all([
    User.count(),
    User.count({ where: { roleCode: ERole.SINGER } }),
    History.count(),
    Favorite.count(),
    Album.count(),
    Media.count()
  ])

  res.json({
    status: StatusCodes.OK,
    message: 'get me success',
    element: {
      userCount,
      singerCount,
      historyCount,
      favoriteCount,
      albumCount,
      mediaCount
    }
  })
}
