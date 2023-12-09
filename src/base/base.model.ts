import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize'

type InferAttributesOptions<Excluded> = { omit?: Excluded }

class M extends Model {
  public declare id: CreationOptional<string>
}

export class BaseModel<
  T extends BaseModel = M,
  Options extends InferAttributesOptions<keyof T | never | ''> = { omit: never }
> extends Model<InferAttributes<T, Options>, InferCreationAttributes<T>> {
  public declare id: CreationOptional<string>
}
