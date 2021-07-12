import IPaginated from '../interfaces/IPaginated'
import Project from '../models/Project'
import IProjectsRepository from '../Repository/intefaces/IProjectsRepository'

interface IRequest {
  page: number
}

class PaginatedProjectsService {
  private _projectRepository: IProjectsRepository

  constructor(projectRepository: IProjectsRepository) {
    this._projectRepository = projectRepository
  }

  public async execute({ page }: IRequest): Promise<IPaginated<Project>> {
    const [projects, total] = await this._projectRepository.pagenatedProjects(
      page * 10
    )

    const totalPages = Math.ceil(total / 10)

    const response: IPaginated<Project> = {
      data: projects,
      totalElements: total,
      page,
      elements: projects.length,
      elementsPerPage: 10,
      totalPages,
      firstPage: page === 0,
      lastPage: page === totalPages - 1
    }

    return response
  }
}

export default PaginatedProjectsService
