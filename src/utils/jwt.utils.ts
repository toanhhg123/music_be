import jwt from 'jsonwebtoken'
import { JWT } from '~/config/const'
import { User } from '~/model'

export type TokenPayload = Pick<User, 'id' | 'roleCode' | 'email' | 'firstName' | 'lastName'>

export const generateAccessToken = ({ id, roleCode, email, firstName, lastName }: TokenPayload) => {
  return jwt.sign({ id, roleCode, email, firstName, lastName }, JWT.AUTH_SECRET_KEY_ACCESS_TOKEN, {
    expiresIn: JWT.AUTH_SECRET_KEY_EXPIRES
  })
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT.AUTH_SECRET_KEY_ACCESS_TOKEN) as TokenPayload
}
