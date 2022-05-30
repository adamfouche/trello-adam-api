import { MongoClient } from 'mongodb'
import { env } from './environment'

let dbInstance = null

export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  // connect the client to the server
  await client.connect()
  // Assign clientDB to our dbInstance
  dbInstance = client.db(env.DATABASE_NAME)
}
//   const databaseLists = await client.db().admin().listDatabases()

// Get Database Instance
export const getDB = () => {
  if (!dbInstance) throw new Error('Unable to connect to MongoDB!')
  return dbInstance
}
