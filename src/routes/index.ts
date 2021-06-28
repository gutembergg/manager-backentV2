import { Router } from 'express'

import UserRoutes from './user'
import SessionRouter from './session'
import clientRoutes from './client'

const routes = Router()
const prefixRoutes = '/api'

routes.use(`${prefixRoutes}/users`, UserRoutes)
routes.use(`${prefixRoutes}/session`, SessionRouter)
routes.use(`${prefixRoutes}/clients`, clientRoutes)

export default routes
