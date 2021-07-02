import IPaginated from '../interfaces/IPaginated'
import Client from '../models/Client'
import IClientsRepository from '../Repository/intefaces/IClientsRepository'
import ClientRepository from '../Repository/repositories/Clientrepository'

interface IRequest {
  page: number
}

class PaginateClientService {
  private _clientRepository: IClientsRepository

  constructor(clientRepository: ClientRepository) {
    this._clientRepository = clientRepository
  }

  public async execute({ page }: IRequest): Promise<IPaginated<Client>> {
    const [clients, total] = await this._clientRepository.findAllPaginated(
      page * 10
    )

    const totalPages = Math.ceil(total / 10)

    const response: IPaginated<Client> = {
      data: clients,
      totalElements: total,
      page,
      elements: clients.length,
      elementsPerPage: 10,
      totalPages,
      firstPage: page === 0,
      lastPage: page === totalPages - 1
    }

    console.log('response:', response)
    return response
  }
}

export default PaginateClientService
