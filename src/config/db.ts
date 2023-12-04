import { Sequelize } from 'sequelize'
import { DB } from './const'

const sequelize = new Sequelize(DB.DB_NAME, DB.USER, DB.PASS, {
  host: DB.HOST,
  dialect: 'mysql',
  port: DB.PORT,
  logging: false
})

export const connect = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

export default sequelize
