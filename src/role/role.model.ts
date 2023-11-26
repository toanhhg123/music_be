import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize'
import sequelize from '~/config/db'

export enum ERole {
  ADMIN = '000',
  SINGER = '001',
  USER = '002'
}

export class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
  declare id: CreationOptional<string>
  declare code: ERole
}

Role.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    code: {
      type: DataTypes.STRING,
      unique: true
    }
  },
  { sequelize, tableName: 'Roles', timestamps: true }
)
