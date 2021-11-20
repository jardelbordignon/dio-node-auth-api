import { Pool } from 'pg'

const connectionString = `${process.env.ELEPHANTSQL_URL}`

export const db = new Pool({ connectionString })
