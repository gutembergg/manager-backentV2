import { Request, Response } from 'express'
import ClientRepository from '../Repository/repositories/Clientrepository'
import CreateClientService from '../services/CreateClientService'

class ClientController {
  public async index(req: Request, res: Response): Promise<Response> {
    const clientRepository = new ClientRepository()

    const clients = await clientRepository.findAll()

    return res.send(clients)
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

    return res.status(201).send(client)
  }
}

export default ClientController
