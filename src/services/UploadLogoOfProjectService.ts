import AppErros from '../erros/AppErros'
import Project from '../models/Project'
import IProjectsRepository from '../Repository/intefaces/IProjectsRepository'

interface IRequest {
  id: string
  logo: string
}

class UploadLogoOfProjectService {
  private _projectRepository: IProjectsRepository

  constructor(projectRepository: IProjectsRepository) {
    this._projectRepository = projectRepository
  }

  public async execute({ id, logo }: IRequest): Promise<Project> {
    const project = await this._projectRepository.findById(id)

    if (!project) {
      throw new AppErros('Project not found', 404)
    }

    project.logo = logo
    await this._projectRepository.save(project)

    return project
  }
}

export default UploadLogoOfProjectService
