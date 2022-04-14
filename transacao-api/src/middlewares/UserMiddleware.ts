
import Transacao from '../schema/Transacao'
import { Request, Response, NextFunction } from 'express'

interface resTransacao extends Response{
  transacao: {
    _id: string,
    usuarioId: number;
    valor: number,
    credito?: boolean,
    debito?: boolean,
  }
}

class UserMiddleware {
  public async validateId (req:Request, res:resTransacao, next:NextFunction):Promise<resTransacao> {
    const { id } = req.params
    try {
      const transacoesUsuario:resTransacao[] = await Transacao.find({ usuarioId: id }, null)

      res.transacao = transacoesUsuario
      if (!transacoesUsuario) {
        return res.status(404).json({ error: 'Usuário não realizou nenhuma transação recentemente' })
      }
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
    next()
  }
}

export default new UserMiddleware()
