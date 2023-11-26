import express from 'express'
import { PORT } from './config/const'
import { HandleNotFound, handleError } from './http/error'
import cors from 'cors'
import { connect } from './config/db'
import router from '~/routes'

const app = express()

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(
  cors({
    origin: '*'
  })
)

connect().catch(console.log)

app.use(router)

app.use(HandleNotFound)
app.use(handleError)

app.listen(PORT, () => {
  console.log('server running in http://localhost:8080')
})
