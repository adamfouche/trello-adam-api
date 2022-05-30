import express from 'express'
import { connectDB } from '~/config/mongodb'
import { env } from './config/environment'
connectDB()
  .then(() => console.log('Connected to MongoDB successfully'))
  .then(() => bootServer())
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

const bootServer = () => {
  const app = express()

  app.get('/test', async (req, res) => {
    res.end('<h1>Tam giac everybody !!!</h1><hr/>')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Listening at: ${env.APP_HOST}:${env.APP_PORT}`)
  })
}
