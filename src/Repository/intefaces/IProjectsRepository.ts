import CreateProjectDTO from '../../DTOS/CreateProjectDTO'
import Project from '../../models/Project'

export default interface IProjectsRepository {
  findAll(): Promise<Project[] | undefined>
  findAllOfUser(user_id: string): Promise<Project[]>
  pagenatedProjects(page: number): Promise<[Project[], number]>
  findById(id: string): Promise<Project>
  create(createProject: CreateProjectDTO): Promise<Project>
  save(project: Project): Promise<Project>
}
