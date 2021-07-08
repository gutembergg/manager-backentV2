import Project from '../models/Project'
import IProjectsRepository from '../Repository/intefaces/IProjectsRepository'

class ListAllProjectsService {
  private _projectRepository: IProjectsRepository

  constructor(projectRepository: IProjectsRepository) {
    this._projectRepository = projectRepository
  }

  public async execute(): Promise<Project[]> {
    const projects = await this._projectRepository.findAll()

    return projects
  }
}

export default ListAllProjectsService
