import { IUser } from '@/models'

declare global {
  declare  namespace Express {
    interface Request {
      user?: IUser;
    }
    interface Response {
      user?: IUser;
    }
  }
}
