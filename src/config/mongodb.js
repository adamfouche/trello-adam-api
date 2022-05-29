import { MongoClient } from 'mongodb'
import { env } from './environment'

export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  try {
    // connect the client to the server
    await client.connect()
    console.log('Connect successfully to the server')

    // List databases
    await listDatabases(client)
  } finally {
    // Ensure the client will close when finish/error
    await client.close()
    console.log('Closed!')
  }
}
const listDatabases = async (client) => {
  const databaseLists = await client.db().admin().listDatabases()
  const databaseNames = databaseLists.databases
  console.log('List of DB: ', databaseLists)
  console.log('Name of the databases: ')
  databaseNames.forEach((db) => console.log('- ', db.name))
}
