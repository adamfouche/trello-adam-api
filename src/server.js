import express from 'express'
import { connectDB } from '~/config/mongodb'
import { env } from './config/environment'
const app = express()

connectDB().catch(console.log)
app.get('/', (req, res) => {
  res.end('<h1>Tam giac everybody !!!</h1><hr/>')
})

app.listen(env.PORT, env.HOST, () => {
  console.log(`Listening at: ${env.HOST}:${env.PORT}`)
})
