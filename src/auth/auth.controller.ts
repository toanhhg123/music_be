import { Request, Response } from 'express'

import { StatusCodes } from 'http-status-codes'
import { User } from '~/model'
import userService from '~/user/user.service'
import { generateAccessToken } from '~/utils/jwt.utils'
import authService from './auth.service'
import { ERole } from '~/role/role.model'

export const register = async (req: Request<unknown, unknown, User>, res: Response) => {
  const data = await userService.create({ ...req.body, roleCode: ERole.USER, isPremium: false } as User)

  const token = generateAccessToken(data)

  res.json({
    status: StatusCodes.OK,
    message: 'get users success',
    element: {
      accessToken: token
    }
  })
}

export const login = async (req: Request<unknown, unknown, { email: string; password: string }>, res: Response) => {
  const data = await authService.login(req.body.email, req.body.password)

  const token = generateAccessToken(data)

  res.json({
    status: StatusCodes.OK,
    message: 'get users success',
    element: {
      accessToken: token
    }
  })
}

export const changePassword = async (
  req: Request<unknown, unknown, { email: string; password: string }>,
  res: Response
) => {
  const data = await userService.updatePasswordById(req.user.id, req.body.password)

  res.json({
    status: StatusCodes.OK,
    message: 'get users success',
    element: data
  })
}
