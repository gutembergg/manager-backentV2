import AppErros from '../erros/AppErros'
import Client from '../models/Client'
import IClientsRepository from '../Repository/intefaces/IClientsRepository'
import ClientRepository from '../Repository/repositories/Clientrepository'

interface Request {
  id: string
  name: string
  email: string
  telephone: string
}

class UpdateClientService {
  private _clientRepository: IClientsRepository

  constructor(clientRepository: ClientRepository) {
    this._clientRepository = clientRepository
  }

  public async execute({
    id,
    name,
    email,
    telephone
  }: Request): Promise<Client> {
    const client = await this._clientRepository.findById(id)

    console.log(client)

    /*  if (id.length !== 36) {
      throw new AppErros('Invailid ID', 401)
    }
 */
    if (!client) {
      throw new AppErros('Client not found', 400)
    }

    if (email !== client.email) {
      const verifyEmail = await this._clientRepository.findByEmail(email)

      if (verifyEmail) {
        throw new AppErros('Client exists already', 401)
      }
    }

    client.name = name
    client.email = email
    client.telephone = telephone

    await this._clientRepository.save(client)

    return client
  }
}

export default UpdateClientService
