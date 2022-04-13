import { Request, Response } from 'express'
// import { setRedis } from '../redisConfig'
import Transacao from '../schema/Transacao'

class TransacaoController {
  async index (req:Request, res) {
    // try {
    //   const user = await res.user
    //   return res.status(200).json({ user })
    // } catch (err) {
    //   res.status(500).json({ error: err.message })
    // }

    try {
      const transacao = await Transacao.find()
      return res.status(200).json({ transacao })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  async store (req:Request, res:Response) {
    const { usuarioId, valor, credito, debito } = req.body
    console.log(req)

    if (!usuarioId) {
      return res.status(400).json({ error: 'Preencha o seu id.' })
    }
    if (!valor) {
      return res.status(400).json({ error: 'Preencha o  valor.' })
    }
    if (!credito && !debito) {
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

    // await setRedis('cliente-1', JSON.stringify(transacao))
  }
}

export default new TransacaoController()
