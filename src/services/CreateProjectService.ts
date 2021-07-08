import ProjectsStatus from '../enums/ProjectsStatus'
import AppErros from '../erros/AppErros'
import Project from '../models/Project'
import IClientsRepository from '../Repository/intefaces/IClientsRepository'
import IProjectsRepository from '../Repository/intefaces/IProjectsRepository'

interface Request {
  name: string
  description: string
  logo: string
  client_id: string
}

class CreateProjectService {
  private _projectRepository: IProjectsRepository
  private _clientRepository: IClientsRepository

  constructor(
    projectRepository: IProjectsRepository,
    clientRepository: IClientsRepository
  ) {
    this._projectRepository = projectRepository
    this._clientRepository = clientRepository
  }

  public async execute({
    name,
    description,
    logo,
    client_id
  }: Request): Promise<Project> {
    const verifyClient = this._clientRepository.findById(client_id)

    if (!verifyClient) {
      throw new AppErros('Client not found', 404)
    }

    const project = await this._projectRepository.create({
      name,
      description,
      logo,
      client_id,
      status: ProjectsStatus.NEW
    })

    return project
  }
}

export default CreateProjectService
