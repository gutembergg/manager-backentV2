import Project from '../models/Project'
import IProjectsRepository from '../Repository/intefaces/IProjectsRepository'

class ListAllProjectsOfUserService {
  private _projectrepository: IProjectsRepository

  constructor(projectrepository: IProjectsRepository) {
    this._projectrepository = projectrepository
  }

  public async execute(user_id: string): Promise<Project[]> {
    const projects = await this._projectrepository.findAllOfUser(user_id)

    return projects
  }
}

export default ListAllProjectsOfUserService
