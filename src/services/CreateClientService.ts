import AppErros from '../erros/AppErros'
import Client from '../models/Client'
import IClientsRepository from '../Repository/intefaces/IClientsRepository'
import ClientRepository from '../Repository/repositories/Clientrepository'

interface Request {
  name: string
  email: string
  telephone: string
}

class CreateClientService {
  private _clientRepository: IClientsRepository

  constructor(clientRepository: ClientRepository) {
    this._clientRepository = clientRepository
  }

  public async execute({ name, email, telephone }: Request): Promise<Client> {
    const verifyClient = await this._clientRepository.findByEmail(email)

    if (verifyClient) {
      throw new AppErros('Client exisits already', 400)
    }

    const client = await this._clientRepository.create({
      name,
      email,
      telephone
    })

    return client
  }
}

export default CreateClientService
