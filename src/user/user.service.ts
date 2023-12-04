import { HTTP409Error } from '~/http/error'
import { User } from './user.model'
import { ERole } from '~/role/role.model'

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
}

export default new UserService()
