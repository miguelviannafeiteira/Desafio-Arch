
import Transacao from '../schema/Transacao'
import { Request, Response, NextFunction } from 'express'

interface resUserTransacoes extends Response{
    usuarioId: number,
    valor: number,
    debito?:boolean,
    credito?:boolean

}

class UserMiddleware {
  public async validateId (req:Request, res:resUserTransacoes, next:NextFunction):Promise<resUserTransacoes> {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ error: 'ID inválido' })
    }
    try {
      const transacoesDoUsuario = await Transacao.findById(id)

      res.user = transacoesDoUsuario
      if (!transacoesDoUsuario) {
        return res.status(404).json({ error: 'Usuario sem transações' })
      }
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
    next()
  }
}

export default new UserMiddleware()
