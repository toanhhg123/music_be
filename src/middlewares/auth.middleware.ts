import expressAsyncHandler from 'express-async-handler'
import { HTTP401Error, HTTP403Error } from '~/http/error'
import { ERole } from '~/role/role.model'
import { verifyToken } from '~/utils/jwt.utils'

export const authorize = (roles?: ERole[]) =>
  expressAsyncHandler((req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) throw new HTTP401Error()

    const user = verifyToken(token)

    if (roles?.length && !roles.some((x) => x === user.roleCode)) {
      throw new HTTP403Error()
    }

    req.user = user

    return next()
  })
