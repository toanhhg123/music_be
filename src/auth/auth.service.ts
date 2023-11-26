import { HTTP400Error } from '~/http/error'
import { User } from '~/model'

class AuthService {
  async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } })

    if (!user) throw new HTTP400Error('email is not exists')
    if (!(await User.validPassword(user, password))) throw new HTTP400Error('Password is correct')

    return user
  }
}

export default new AuthService()
