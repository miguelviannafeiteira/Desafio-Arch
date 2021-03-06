import { Request, Response } from 'express'
import User from '../schema/User'
import api from '../services/api'

interface Data {
  data : {
    UsuarioTransacoes: [
      {
        _id: string,
        usuarioId: number,
        valor: number,
        debito: boolean,
        credito: boolean,
        createdAt: string,
      }
    ]
  }
}

interface UsuarioTransacao {
      _id: string,
      usuarioId: number,
      valor: number,
      debito: boolean,
      credito: boolean,
      createdAt: string,

}

class SaldoController {
  async indexUser (req:Request, res) {
    try {
      const usuario = await res.user
      return res.status(200).json({ usuario })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  async store (req:Request, res:Response) {
    const { id } = req.params

    const { data }:Data = await api.get(`/transacoes/${id}`)

    const transacoes:UsuarioTransacao[] = data.UsuarioTransacoes

    const itensCredito = transacoes.filter((item) => {
      return item.credito
    })
    const itensDebito = transacoes.filter((item) => {
      return item.debito
    })

    const creditoSoma = itensCredito.map(item => item.valor).reduce((prev, curr) => prev + curr, 0)
    const debitoSoma = itensDebito.map(item => item.valor).reduce((prev, curr) => prev + curr, 0)
    const saldoFinal = creditoSoma - debitoSoma

    // console.log(saldoFinal)

    const user = new User({
      _id: id,
      saldo: saldoFinal
    })
    if (user) { user.deleteOne({ _id: id }) }
    try {
      await user.save()
      res.json(user)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
}

export default new SaldoController()
