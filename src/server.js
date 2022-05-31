import express from 'express'
import { connectDB } from '~/config/mongodb'
import { env } from './config/environment'
import { apiV1 } from '~/routes/v1'
connectDB()
  .then(() => console.log('Connected to MongoDB successfully'))
  .then(() => bootServer())
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

const bootServer = () => {
  const app = express()
  // Parsing req.data as json
  app.use(express.json())

  // use APIs
  app.use('/v1', apiV1)
  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Listening at: ${env.APP_HOST}:${env.APP_PORT}`)
  })
}
