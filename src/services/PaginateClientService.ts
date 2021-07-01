import Client from 'models/Client'
import IClientsRepository from 'Repository/intefaces/IClientsRepository'
import ClientRepository from 'Repository/repositories/Clientrepository'

interface IRequest {
  page: number
}

interface IResponse {
  data: Client[]
  totalElements: number
  page: number
  elements: number
  elementsPerPage: number
  totalPages: number
  firstPage: boolean
  lastPage: boolean
}

class PaginateClientService {
  private _clientRepository: IClientsRepository

  constructor(clientRepository: ClientRepository) {
    this._clientRepository = clientRepository
  }

  /*  public async execute({ page }: IRequest): Promise<void> {
    const [clients, total] = await this._clientRepository.findAllPaginate(
      page * 10
    )
  } */
}

export default PaginateClientService
