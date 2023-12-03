import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { User } from '~/model'
import { PageQuery } from '~/utils/page-queries'
import mediaService from './media.service'
import { Media } from './media.model'

export const getAll = async (req: Request<unknown, unknown, User, PageQuery>, res: Response) => {
  const data = await mediaService.getAll(req.query)

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

export const updateMusic = async (req: Request<{ id: string }, unknown, Partial<Media>, PageQuery>, res: Response) => {
  const data = await mediaService.update(req.params.id, req.body)

  res.json({
    status: StatusCodes.OK,
    message: 'get media success',
    element: data
  })
}