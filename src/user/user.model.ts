import * as bcrypt from 'bcrypt'
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize'
import sequelize from '~/config/db'
import { ERole, Role } from '~/role/role.model'

export class User extends Model<InferAttributes<User, { omit: 'role' }>, InferCreationAttributes<User>> {
  declare id: CreationOptional<string>
  declare firstName: CreationOptional<string>
  declare lastName: CreationOptional<string>
  declare email: string
  declare phone: CreationOptional<string>
  declare password: string
  declare isPremium: boolean
  declare roleCode: ERole
  declare avatar?: string
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
      unique: true,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isPremium: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    roleCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
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
      }
    }
  }
)
