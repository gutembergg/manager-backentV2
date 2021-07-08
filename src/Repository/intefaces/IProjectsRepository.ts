import CreateProjectDTO from '../../DTOS/CreateProjectDTO'
import Project from '../../models/Project'

export default interface IProjectsRepository {
  findAll(): Promise<Project[] | undefined>
  findById(id: string): Promise<Project>
  create(createProject: CreateProjectDTO): Promise<Project>
  save(project: Project): Promise<Project>
}
