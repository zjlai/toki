// Common files to all routes files
const { Client } = require('pg')

const postgresdb = process.env.RDS_DB_NAME
const postgresuser = process.env.RDS_USERNAME
const postgrespw = process.env.RDS_PASSWORD
const postgreshost = process.env.RDS_HOST
const postgresport = process.env.RDS_PORT

const connectionString = `postgresql://${postgresuser}:${postgrespw}@${postgreshost}:${postgresport}/${postgresdb}`

const connectDB = async () => {
  const conn = new Client({
    connectionString: connectionString
  })
  await conn.connect()
  return conn
}

const queryDB = async (conn, query) => {
  try {
    const data = await conn.query(query)
    return data.rows
  } catch(err) {
    console.log(err.stack)
    return err
  } finally {
    conn.end()
  }
}

module.exports = {
  connectDB,
  queryDB
}
