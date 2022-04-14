import express from 'express'
import TransacaoController from './Controller/TransacaoController'
import UserMiddleware from './middlewares/UserMiddleware'

const routes = express.Router()

routes.get('/transacoes', TransacaoController.index)
routes.get('/transacoes/:id', UserMiddleware.validateId, TransacaoController.indexUsuario)
routes.post('/transacoes', TransacaoController.store)

export default routes
