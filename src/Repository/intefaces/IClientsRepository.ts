import CreateClientDTO from '../../DTOS/CreateClientDTO'
import Client from '../../models/Client'

export default interface IClientsRepository {
  findAll(): Promise<Client[]>
  findById(id: string): Promise<Client | undefined>
  findByEmail(email: string): Promise<Client | undefined>
  create(clientDTO: CreateClientDTO): Promise<Client>
  save(client: Client): Promise<Client>
}
