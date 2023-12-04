import { Request, Response } from 'express'
import userService from './user.service'
import { StatusCodes } from 'http-status-codes'
import { User } from './user.model'

export const getMe = async (req: Request, res: Response) => {
  const data = await userService.findById(req.user.id)

  res.json({
    status: StatusCodes.OK,
    message: 'get me success',
    element: data
  })
}

export const getAllUser = async (req: Request, res: Response) => {
  const data = await userService.getAllUser()

  res.json({
    status: StatusCodes.OK,
    message: 'get users success',
    element: data
  })
}

export const getSingers = async (req: Request, res: Response) => {
  const data = await userService.getSingers()

  res.json({
    status: StatusCodes.OK,
    message: 'get users success',
    element: data
  })
}

export const createUser = async (req: Request<unknown, unknown, User>, res: Response) => {
  const data = await userService.create(req.body)

  res.json({
    status: StatusCodes.CREATED,
    message: 'create user success',
    element: data
  })
}

export const updateUser = async (req: Request<{ id: string }, unknown, Partial<User>>, res: Response) => {
  const [data] = await userService.updateUser(req.params.id, req.body)

  res.json({
    status: StatusCodes.CREATED,
    message: 'create user success',
    element: data
  })
}
