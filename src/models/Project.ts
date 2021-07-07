import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'
import ProjectsStatus from '../enums/ProjectsStatus'

@Entity('projects')
class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  client_id: string

  @Column({
    type: 'varchar'
  })
  status: ProjectsStatus

  @Column()
  logo: string

  @Column()
  description: string

  @CreateDateColumn()
  created_at: Date

  @CreateDateColumn()
  updated_at: Date
}

export default Project
