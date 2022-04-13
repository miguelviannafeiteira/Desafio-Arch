import express from 'express'
import TransacaoController from './Controller/TransacaoController'

const routes = express.Router()

routes.get('/transacoes', TransacaoController.index)
routes.post('/transacoes', TransacaoController.store)

export default routes
