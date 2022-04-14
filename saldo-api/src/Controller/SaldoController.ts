import { Request, Response } from 'express'
import User from '../schema/User'
import api from '../services/api'

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

    const { data } = await api.get(`/transacoes/${id}`)
    const transacoes = data.UsuarioTransacoes

    const itemsCredito = transacoes.filter((item) => {
      return item.credito
    })
    const itemsDebito = transacoes.filter((item) => {
      return item.debito
    })

    const creditoSoma = itemsCredito.map(item => item.valor).reduce((prev, curr) => prev + curr, 0)
    const debitoSoma = itemsDebito.map(item => item.valor).reduce((prev, curr) => prev + curr, 0)
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
