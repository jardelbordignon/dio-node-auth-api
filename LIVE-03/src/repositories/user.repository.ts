import { db } from '@/db'
import { IUser } from '@/models'
import { RepositoryError } from '@/models/errors'

class UserRepository {

  findAll = async (): Promise<IUser[]> => {
    const query = 'SELECT uuid, username FROM app_users'

    const res = await db.query<IUser>(query)

    return res.rows
  }
  
  findById = async (uuid: string): Promise<IUser> => {
    try {
      const query = 'SELECT uuid, username FROM app_users WHERE uuid = $1'
  
      const values = [uuid]
  
      const res = await db.query<IUser>(query, values)
  
      const [user] = res.rows // mesmo que -> const user = res.rows[0]
  
      return user
    } catch (error) {
      throw new RepositoryError('User not found', 403)
    }
  }

  create = async (data: IUser): Promise<IUser> => {
    const script = `
      INSERT INTO app_users (username, password)
      VALUES ($1, crypt($2, $3))
      RETURNING *
      `

    const values = [data.username, data.password, process.env.ELEPHANTSQL_HASH_PWD]
    
    const res = await db.query<IUser>(script, values)

    const [user] = res.rows
    const { uuid, username } = user

    return {uuid, username}
  }

  update = async (data: IUser): Promise<IUser> => {
    const script = `
      UPDATE app_users 
      SET 
        username = $1,
        password = crypt($2, $3)
      WHERE uuid = $4
      `

    const { uuid, username, password } = data
    const values = [username, password, process.env.ELEPHANTSQL_HASH_PWD, uuid]
    
    await db.query<IUser>(script, values)

    return {uuid, username}
  }

  destroy = async (uuid: string): Promise<void> => {
    const script = 'DELETE FROM app_users WHERE uuid = $1'

    const values = [uuid]

    await db.query(script, values)
  }
}

export const userRepository = new UserRepository()
