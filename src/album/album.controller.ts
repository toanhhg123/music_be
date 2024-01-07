import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { transactions } from '~/config/db'
import { Album, User } from '~/model'
import { PageQuery } from '~/utils/page-queries'
import albumService from './album.service'

export const getMyAlbum = async (req: Request<unknown, unknown, User, PageQuery>, res: Response) => {
  const { id } = req.user

  const data = await albumService.getByUserId(id)

  res.json({
    status: StatusCodes.OK,
    message: 'get album success',
    element: data
  })
}

export const getAlbumsSinger = async (req: Request<unknown, unknown, unknown, PageQuery>, res: Response) => {
  const data = await albumService.getAlbumSinger()

  res.json({
    status: StatusCodes.OK,
    message: 'get album success',
    element: data
  })
}

export const create = async (req: Request<unknown, unknown, Album, PageQuery>, res: Response) => {
  const data = await albumService.create({
    ...req.body,
    authorId: req.user.id
  } as Album)

  res.json({
    status: StatusCodes.OK,
    message: 'get album success',
    element: data
  })
}

export const update = async (req: Request<{ id: string }, unknown, Partial<Album>, PageQuery>, res: Response) => {
  const { id } = req.user

  await albumService.isAuthor(id, req.params.id)

  const data = await albumService.update(req.params.id, req.body)

  res.json({
    status: StatusCodes.OK,
    message: 'get album success',
    element: data
  })
}

export const remove = async (req: Request<{ id: string }, unknown, Partial<Album>, PageQuery>, res: Response) => {
  const { id } = req.user

  await albumService.isAuthor(id, req.params.id)

  const data = await transactions((t) => albumService.remove(t, req.params.id))

  res.json({
    status: StatusCodes.OK,
    message: 'get album success',
    element: data
  })
}
