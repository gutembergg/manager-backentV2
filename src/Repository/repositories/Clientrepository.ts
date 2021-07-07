import { getRepository, Like, Repository } from 'typeorm'
import CreateClientDTO from '../../DTOS/CreateClientDTO'
import Client from '../../models/Client'
import IClientsRepository from '../intefaces/IClientsRepository'

class ClientRepository implements IClientsRepository {
  private ormRepository: Repository<Client>

  constructor() {
    this.ormRepository = getRepository(Client)
  }

  public async findAll(): Promise<Client[]> {
    return this.ormRepository.find()
  }

  public async findAllPaginated(page: number): Promise<[Client[], number]> {
    return this.ormRepository.findAndCount({
      skip: page,
      take: 10
    })
  }

  public async findAllByName(name: string): Promise<Client[]> {
    return this.ormRepository.find({
      name: Like(`%${name}%`)
    })
  }

  public async findById(id: string): Promise<Client> {
    return await this.ormRepository.findOne({
      where: { id }
    })
  }

  public async findByEmail(email: string): Promise<Client> {
    return await this.ormRepository.findOne({
      where: { email }
    })
  }

  public async create({
    name,
    email,
    telephone
  }: CreateClientDTO): Promise<Client> {
    const client = this.ormRepository.create({
      name,
      email,
      telephone
    })
    await this.ormRepository.save(client)

    return client
  }

  public async save(client: Client): Promise<Client> {
    return this.ormRepository.save(client)
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id)
  }
}

export default ClientRepository
