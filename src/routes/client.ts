import { Router } from 'express'
import ClientController from '../controllers/ClientController'

const clientRoutes = Router()

const clientController = new ClientController()

clientRoutes.get('/', clientController.index)
clientRoutes.post('/', clientController.create)

export default clientRoutes
