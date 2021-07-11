import AppErros from '../erros/AppErros'
import Project from '../models/Project'
import IProjectsRepository from '../Repository/intefaces/IProjectsRepository'

class ShowProjectService {
  private _projectRepository: IProjectsRepository

  constructor(projectRepository: IProjectsRepository) {
    this._projectRepository = projectRepository
  }

  public async execute(id: string): Promise<Project> {
    const project = await this._projectRepository.findById(id)

    if (!project) {
      throw new AppErros('Project not found', 400)
    }

    return project
  }
}

export default ShowProjectService
