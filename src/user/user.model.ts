import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, NonAttribute } from 'sequelize'
import sequelize from '~/config/db'
import { ERole, Role } from '~/role/role.model'
import * as bcrypt from 'bcrypt'

export class User extends Model<InferAttributes<User, { omit: 'role' }>, InferCreationAttributes<User>> {
  declare id: CreationOptional<string>
  declare firstName: string
  declare lastName: string
  declare email: string
  declare phone: string
  declare password: string
  declare isPremium: boolean
  declare roleCode: ERole

  declare role?: NonAttribute<Role>

  public static async validPassword(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password)
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    phone: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    },
    isPremium: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    roleCode: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    tableName: 'Users',
    timestamps: true,

    hooks: {
      beforeCreate(user) {
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(user.password, salt)
      },
      beforeUpdate(user) {
        if (user.changed('password')) {
          console.log({ password: user.password })
          const salt = bcrypt.genSaltSync()
          user.password = bcrypt.hashSync(user.password, salt)
        }
      }
    }
  }
)