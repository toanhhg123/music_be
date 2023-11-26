import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, NonAttribute } from 'sequelize'
import sequelize from '~/config/db'
import { Media } from '~/media/media.model'
import { User } from '~/model'

export class Comment extends Model<
  InferAttributes<Comment, { omit: 'author' | 'media' }>,
  InferCreationAttributes<Comment>
> {
  declare id: CreationOptional<string>
  declare authorId: string
  declare message: string
  declare mediaId: string

  declare author?: NonAttribute<User>
  declare media?: NonAttribute<Media[]>
}

Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    authorId: {
      type: DataTypes.UUID
    },
    mediaId: {
      type: DataTypes.UUID
    },
    message: {
      type: DataTypes.STRING
    }
  },
  { sequelize, timestamps: true, tableName: 'Comments' }
)
