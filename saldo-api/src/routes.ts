import express, { Request, Response } from 'express'
import SaldoController from './Controller/SaldoController'
import api from './lib/api'
import UserMiddleware from './middleware/UserMiddleware'
import User from './schema/User'

const routes = express.Router()

routes.post('/saldo/:id', async (req:Request, res:Response) => {
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

  console.log(saldoFinal)
  const user = new User({
    _id: id,
    saldo: saldoFinal
  })
  if (user) { user.deleteOne({ _id: id }) }
  try {
    await user.save()
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

routes.get('/saldo/:id', UserMiddleware.validateId, SaldoController.indexUser)

export default routes
