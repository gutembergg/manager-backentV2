import ProjectsStatus from '../enums/ProjectsStatus'
import AppErros from '../erros/AppErros'
import Project from '../models/Project'
import IClientsRepository from '../Repository/intefaces/IClientsRepository'
import IProjectsRepository from '../Repository/intefaces/IProjectsRepository'

interface Request {
  name: string
  client_id: string
  user_id: string
  description: string
  logo?: string
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
    client_id,
    user_id,
    description,
    logo
  }: Request): Promise<Project> {
    const verifyClient = this._clientRepository.findById(client_id)

    if (!verifyClient) {
      throw new AppErros('Client not found', 404)
    }

    const project = await this._projectRepository.create({
      name,
      client_id,
      user_id,
      description,
      status: ProjectsStatus.NEW,
      logo
    })

    return project
  }
}

export default CreateProjectService
