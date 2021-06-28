import { getRepository, Repository } from 'typeorm'
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
  public async findById(id: string): Promise<Client> {
    const client = await this.ormRepository.findOne({
      where: { id }
    })
    return client
  }
  public async findByEmail(email: string): Promise<Client> {
    const client = await this.ormRepository.findOne({
      where: { email }
    })
    return client
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
}

export default ClientRepository
