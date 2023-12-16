import * as bcrypt from 'bcrypt'
import { HTTP409Error } from '~/http/error'
import { ERole } from '~/role/role.model'
import { User } from './user.model'

class UserService {
  async create(user: User) {
    const isExist = await User.findOne({ where: { email: user.email } })

    if (isExist) {
      throw new HTTP409Error('email is exist !!')
    }

    const newUser = await User.create({ ...user })
    return newUser
  }

  getAllUser() {
    return User.findAll({ limit: 15 })
  }

  getSingers() {
    return User.findAll({ limit: 15, where: { roleCode: ERole.SINGER } })
  }

  updateUser(id: string, user: Partial<User>) {
    return User.update(user, { where: { id } })
  }

  findById(id: string) {
    return User.findByPk(id)
  }

  updatePasswordById(id: string, password: string) {
    const salt = bcrypt.genSaltSync()
    const passwordH = bcrypt.hashSync(password, salt)
    return User.update({ password: passwordH }, { where: { id } })
  }
}

export default new UserService()
