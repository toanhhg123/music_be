import { ERole } from '~/role/role.model'

export const dataSeeds = [
  {
    email: 'user@gmail.com',
    password: 'user',
    roleCode: ERole.USER,
    isPremium: false
  },
  {
    email: 'admin@gmail.com',
    password: 'admin',
    roleCode: ERole.ADMIN,
    isPremium: true
  },
  {
    email: 'singer@gmail.com',
    password: 'singer',
    roleCode: ERole.SINGER,
    isPremium: true
  }
]
