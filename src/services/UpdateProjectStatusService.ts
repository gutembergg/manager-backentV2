import ProjectsStatus from '../enums/ProjectsStatus'
import AppErros from '../erros/AppErros'
import Project from '../models/Project'
import IProjectsRepository from '../Repository/intefaces/IProjectsRepository'

interface IRequest {
  id: string
  status: ProjectsStatus
}

class UpdateProjectStatusService {
  private _projectRepository: IProjectsRepository

  constructor(projectRepository: IProjectsRepository) {
    this._projectRepository = projectRepository
  }

  public async execute({ id, status }: IRequest): Promise<Project> {
    const project = await this._projectRepository.findById(id)

    if (!project) {
      throw new AppErros('Project not found', 400)
    }

    project.status = status

    await this._projectRepository.save(project)

    return project
  }
}

export default UpdateProjectStatusService
