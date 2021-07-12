import { getRepository, Repository } from 'typeorm'
import CreateProjectDTO from '../../DTOS/CreateProjectDTO'
import Project from '../../models/Project'
import IProjectsRepository from '../intefaces/IProjectsRepository'

class ProjectRepository implements IProjectsRepository {
  private ormRepository: Repository<Project>

  constructor() {
    this.ormRepository = getRepository(Project)
  }

  public async findAll(): Promise<Project[]> {
    return await this.ormRepository.find({
      relations: ['client']
    })
  }

  public async findById(id: string): Promise<Project> {
    return await this.ormRepository.findOne(id, {
      relations: ['client']
    })
  }

  public async findAllOfUser(user_id: string): Promise<Project[]> {
    return await this.ormRepository.find({
      relations: ['client'],
      where: { user_id }
    })
  }

  public async pagenatedProjects(page: number): Promise<[Project[], number]> {
    return this.ormRepository.findAndCount({
      skip: page,
      take: 10
    })
  }

  public async create({
    name,
    client_id,
    user_id,
    description,
    logo,
    status
  }: CreateProjectDTO): Promise<Project> {
    const project = this.ormRepository.create({
      name,
      client_id,
      user_id,
      description,
      logo,
      status
    })

    await this.ormRepository.save(project)
    return project
  }

  public async save(project: Project): Promise<Project> {
    return await this.ormRepository.save(project)
  }
}

export default ProjectRepository
