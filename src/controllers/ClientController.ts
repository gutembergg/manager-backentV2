import { Request, Response } from 'express'
import UpdateClientService from '../services/UpdateClientService'
import ClientRepository from '../Repository/repositories/Clientrepository'
import CreateClientService from '../services/CreateClientService'

class ClientController {
  public async index(req: Request, res: Response): Promise<Response> {
    const clientRepository = new ClientRepository()

    const clients = await clientRepository.findAll()

    return res.json(clients)
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, telephone } = req.body

    const clientRepository = new ClientRepository()
    const clientservice = new CreateClientService(clientRepository)

    const client = await clientservice.execute({
      name,
      email,
      telephone
    })

    return res.status(201).json(client)
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { name, email, telephone } = req.body

    const clientRepository = new ClientRepository()
    const updateClient = new UpdateClientService(clientRepository)

    const client = await updateClient.execute({
      id,
      name,
      email,
      telephone
    })

    return res.status(200).json(client)
  }
}

export default ClientController
