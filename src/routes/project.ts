import { Router } from 'express'
import ProjectController from '../controllers/ProjectController'
import authenticate from '../middlewares/Auth'

const projectRoute = Router()

const projectController = new ProjectController()

projectRoute.use(authenticate)

projectRoute.get('/', projectController.index)
projectRoute.get('/:id', projectController.showProject)
projectRoute.post('/', projectController.create)
projectRoute.put('/:id', projectController.update)
projectRoute.patch('/:id', projectController.changeStatus)

export default projectRoute
