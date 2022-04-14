import SaldoController from './Controller/SaldoController'
import UserMiddleware from './middleware/UserMiddleware'
import express from 'express'

const routes = express.Router()

routes.post('/saldo/:id', SaldoController.store)

routes.get('/saldo/:id', UserMiddleware.validateId, SaldoController.indexUser)

export default routes
