
import User from '../schema/User'
import { Request, Response, NextFunction } from 'express'

interface resUser extends Response{
  user: {
    _id: Number,
    saldo: Number
  }
}

class UserMiddleware {
  public async validateId (req:Request, res:resUser, next:NextFunction):Promise<resUser> {
    const { id } = req.params
    try {
      const user:resUser[] = await User.find({ _id: id }, null)

      res.user = user
      if (!user) {
        return res.status(404).json({ error: 'Usuário não possue conta' })
      }
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
    next()
  }
}

export default new UserMiddleware()
