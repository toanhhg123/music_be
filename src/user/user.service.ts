import * as bcrypt from 'bcrypt'
import { HTTP409Error } from '~/http/error'
import { ERole } from '~/role/role.model'
import { User } from './user.model'
import { Media } from '~/model'
import sequelize from '~/config/db'

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
    return User.findAll()
  }

  getSingers() {
    return User.findAll({
      where: { roleCode: ERole.SINGER },
      include: { model: Media, as: 'medias', attributes: ['id', 'listenNumber'] },
      raw: true,
      group: [
        'medias.id',
        'id',
        'medias.listenNumber',
        'firstName',
        'lastName',
        'email',
        'phone',
        'password',
        'isPremium',
        'roleCode',
        'avatar'
      ],
      attributes: [
        'id',
        [sequelize.fn('sum', sequelize.col('medias.listenNumber')), 'listenNumber'],
        'firstName',
        'lastName',
        'email',
        'phone',
        'password',
        'isPremium',
        'roleCode',
        'avatar'
      ]
    })
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
