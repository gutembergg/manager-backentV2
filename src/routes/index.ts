import { Router } from 'express'

import UserRoutes from './user'
import SessionRouter from './session'

const routes = Router()
const prefixRoutes = '/api'

routes.use(`${prefixRoutes}/users`, UserRoutes)
routes.use(`${prefixRoutes}/session`, SessionRouter)

export default routes
