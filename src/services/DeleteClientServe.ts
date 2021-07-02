import AppErros from '../erros/AppErros'
import IClientsRepository from '../Repository/intefaces/IClientsRepository'
import ClientRepository from '../Repository/repositories/Clientrepository'

class DeleteClientService {
  private _clentRepository: IClientsRepository

  constructor(clientRepository: ClientRepository) {
    this._clentRepository = clientRepository
  }

  public async execute(id: string): Promise<void> {
    const verifyId = await this._clentRepository.findById(id)

    console.log('ID')

    if (!verifyId) {
      throw new AppErros('Client not found', 404)
    }

    await this._clentRepository.delete(id)
  }
}

export default DeleteClientService
