import { Router } from 'express'
import ProjectController from '../controllers/ProjectController'
import authenticate from '../middlewares/Auth'
import multer from 'multer'
import multerConfig from '../config/multer'

const projectRoute = Router()

const projectController = new ProjectController()

projectRoute.use(authenticate)

projectRoute.get('/paginated', projectController.paginate)
projectRoute.get('/users/:user_id', projectController.index)
projectRoute.get('/:id', projectController.showProject)
projectRoute.post(
  '/',
  multer(multerConfig).single('logo'),
  projectController.create
)
projectRoute.put(
  '/:id/uploads',
  multer(multerConfig).single('logo'),
  projectController.uploadLogo
)
projectRoute.put('/:id', projectController.update)
projectRoute.patch('/:id', projectController.changeStatus)

export default projectRoute
