import { User } from './model'

declare global {
  namespace Express {
    export interface Request {
      user: Pick<User, 'id' | 'roleCode' | 'email' | 'firstName' | 'lastName'>
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
