import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { User } from '~/model'
import { PageQuery } from '~/utils/page-queries'
import mediaService from './media.service'
import { Media } from './media.model'
import { HTTP400Error } from '~/http/error'

export const getAll = async (req: Request<unknown, unknown, User, PageQuery>, res: Response) => {
  const data = await mediaService.getAll(req.query)

  res.json({
    status: StatusCodes.OK,
    message: 'get media success',
    element: data
  })
}

export const getMyMusic = async (req: Request<{ id: string }, unknown, Partial<Media>, PageQuery>, res: Response) => {
  const data = await Media.findAll({ where: { authorId: req.user.id } })

  res.json({
    status: StatusCodes.OK,
    message: 'get media success',
    element: data
  })
}

export const getMusicByUserId = async (
  req: Request<{ id: string }, unknown, Partial<Media>, PageQuery>,
  res: Response
) => {
  const data = await Media.findAll({ where: { authorId: req.params.id } })

  res.json({
    status: StatusCodes.OK,
    message: 'get media success',
    element: data
  })
}

export const getByAlbumId = async (req: Request<{ id: string }, unknown, User, PageQuery>, res: Response) => {
  const data = await mediaService.getByAlbumId(req.params.id)

  res.json({
    status: StatusCodes.OK,
    message: 'get media success',
    element: data
  })
}

export const AddMusic = async (req: Request<unknown, unknown, Media, PageQuery>, res: Response) => {
  const data = await mediaService.create({
    ...req.body,
    authorId: req.user.id.toString()
  } as Media)

  res.json({
    status: StatusCodes.OK,
    message: 'get media success',
    element: data
  })
}

export const getOne = async (req: Request<{ id: string }, unknown, Media, PageQuery>, res: Response) => {
  const data = await mediaService.getById(req.params.id)

  if (!data) throw new HTTP400Error('data not found')

  res.json({
    status: StatusCodes.OK,
    message: 'get media success',
    element: data
  })
}

export const updateMusic = async (req: Request<{ id: string }, unknown, Partial<Media>, PageQuery>, res: Response) => {
  const data = await mediaService.update(req.params.id, req.body)

  res.json({
    status: StatusCodes.OK,
    message: 'get media success',
    element: data
  })
}
