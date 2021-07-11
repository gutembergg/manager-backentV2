import ProjectsStatus from '../enums/ProjectsStatus'

export default interface CreateProjectDTO {
  name: string
  client_id: string
  user_id: string
  description: string
  logo?: string
  status: ProjectsStatus
}
