import { Request, Response } from 'express'
import Transacao from '../schema/Transacao'

class TransacaoController {
  async index (req:Request, res) {
    try {
      const transacoes = await Transacao.find()

      return res.status(200).json({ transacoes })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  async indexUsuario(req:Request, res){
    try {
      const UsuarioTransacoes = await res.transacao
      return res.status(200).json({ UsuarioTransacoes })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  async store (req:Request, res:Response) {
    const { usuarioId, valor, credito, debito } = req.body

    if (!usuarioId) {
      return res.status(400).json({ error: 'Preencha o seu id.' })
    }
    if (!valor) {
      return res.status(400).json({ error: 'Preencha o  valor.' })
    }
    if ((!credito && !debito) || (credito && debito)) {
      return res.status(400).json({ error: 'Informe se é débito ou crédito.' })
    }

    const transacao = new Transacao({
      usuarioId,
      valor,
      debito,
      credito
    })

    try {
      await transacao.save()
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
}

export default new TransacaoController()
