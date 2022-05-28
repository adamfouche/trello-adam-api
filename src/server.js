import express from 'express'
import { mapOrder } from './utils/sort.js'
const app = express()

const hostName = 'localhost'
const port = 8057

app.get('/', (req, res) => {
  res.end('<h1>Hello World</h1><hr/>')
})

app.listen(port, hostName, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port: ${port}`)
})
