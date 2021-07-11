import AppErros from '../erros/AppErros'
import Project from '../models/Project'
import IClientsRepository from '../Repository/intefaces/IClientsRepository'
import IProjectsRepository from '../Repository/intefaces/IProjectsRepository'

interface IRequest {
  id: string
  name: string
  logo: string
  description: string
  client_id: string
}

class UpdateProjectService {
  private _projectrepository: IProjectsRepository
  private _clientRepository: IClientsRepository

  constructor(
    projectrepository: IProjectsRepository,
    clientRepository: IClientsRepository
  ) {
    this._projectrepository = projectrepository
    this._clientRepository = clientRepository
  }

  public async execute({
    id,
    name,
    client_id,
    description,
    logo
  }: IRequest): Promise<Project> {
    const project = await this._projectrepository.findById(id)

    if (!project) {
      throw new AppErros('Project not found', 404)
    }

    const client = await this._clientRepository.findById(client_id)

    if (!client) {
      throw new AppErros('Client not found', 404)
    }

    project.name = name
    project.client_id = client_id
    project.description = description
    project.logo = logo

    await this._projectrepository.save(project)

    return project
  }
}

export default UpdateProjectService
