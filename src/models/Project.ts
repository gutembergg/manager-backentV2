import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import ProjectsStatus from '../enums/ProjectsStatus'
import Client from './Client'

@Entity('projects')
class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  client_id: string

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: string

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
