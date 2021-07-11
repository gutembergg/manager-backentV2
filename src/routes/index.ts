import { Router } from 'express'

import UserRoutes from './user'
import SessionRouter from './session'
import clientRoutes from './client'
import projectRoute from './project'

const routes = Router()
const prefixRoutes = '/api'

routes.use(`${prefixRoutes}/users`, UserRoutes)
routes.use(`${prefixRoutes}/session`, SessionRouter)
routes.use(`${prefixRoutes}/clients`, clientRoutes)
routes.use(`${prefixRoutes}/projects`, projectRoute)

export default routes
