import { Request, Response } from 'express'
import ClientRepository from '../Repository/repositories/Clientrepository'
import ProjectRepository from '../Repository/repositories/ProjectRepository'
import CreateProjectService from '../services/CreateProjectService'
import ListAllProjectsService from '../services/ListAllProjectsService'
import ShowProjectService from '../services/ShowProjectService'
import UpdateProjectService from '../services/UpdateProjectService'
import UpdateProjectStatusService from '../services/UpdateProjectStatusService'
import UploadLogoOfProjectService from '../services/UploadLogoOfProjectService'

class ProjectController {
  public async index(req: Request, res: Response): Promise<Response> {
    const projectRepository = new ProjectRepository()
    const projectListService = new ListAllProjectsService(projectRepository)

    const projects = await projectListService.execute()

    return res.status(200).json(projects)
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, client_id, description, user_id } = req.body

    const projectRepository = new ProjectRepository()
    const clientRepository = new ClientRepository()

    const createProject = new CreateProjectService(
      projectRepository,
      clientRepository
    )

    const project = await createProject.execute({
      name,
      client_id,
      description,
      logo: req.file?.filename,
      user_id
    })

    return res.status(201).json(project)
  }

  public async uploadLogo(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { filename } = req.file

    const projectrepository = new ProjectRepository()
    const uploadLogoService = new UploadLogoOfProjectService(projectrepository)

    const project = await uploadLogoService.execute({
      id,
      logo: filename
    })

    return res.json(project)
  }

  public async showProject(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const projectRepository = new ProjectRepository()
    const showProjectService = new ShowProjectService(projectRepository)

    const project = await showProjectService.execute(id)

    return res.json(project)
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { name, description, logo, client_id } = req.body

    const projectRepository = new ProjectRepository()
    const clientRepository = new ClientRepository()
    const updateProjectService = new UpdateProjectService(
      projectRepository,
      clientRepository
    )

    const project = await updateProjectService.execute({
      id,
      name,
      client_id,
      description,
      logo
    })

    return res.json(project)
  }

  public async changeStatus(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { status } = req.body

    const projectRepository = new ProjectRepository()
    const projectUpdateStatusService = new UpdateProjectStatusService(
      projectRepository
    )
    const project = await projectUpdateStatusService.execute({
      id,
      status
    })

    return res.json(project)
  }
}

export default ProjectController
