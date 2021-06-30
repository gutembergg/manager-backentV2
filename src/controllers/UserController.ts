import { Request, Response } from 'express'
import AppErros from '../erros/AppErros'
import UserRepository from '../Repository/repositories/UserRepository'
import CreateUserService from '../services/CreateUserService'
import EnableUserService from '../services/EnableUserService'

class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body

    const userRepository = new UserRepository()
    const createUser = new CreateUserService(userRepository)

    const user = await createUser.execute({
      name,
      email,
      password
    })

    delete user.password

    return res.status(201).json(user)
  }

  public async enable(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    if (id.length !== 36) {
      throw new AppErros('Invalid Id', 401)
    }

    const userRepository = new UserRepository()
    const enableService = new EnableUserService(userRepository)

    const user = await enableService.execute({ id })

    delete user.password

    return res.json(user)
  }
}

export default UserController
