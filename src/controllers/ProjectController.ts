import { Request, Response } from 'express'
import ProjectRepository from '../Repository/repositories/ProjectRepository'

class ProjectController {
  public async index(req: Request, res: Response): Promise<Response> {
    const projectRepository = new ProjectRepository()

    const projects = await projectRepository.findAll()

    return res.status(200).json(projects)
  }
}

export default ProjectController
