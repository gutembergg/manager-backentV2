import { Request, Response } from 'express'
import UserRepository from '../Repository/repositories/UserRepository'
import SessionUserService from '../services/SessionUserService'

class SessionController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    const userRepository = new UserRepository()
    const createSession = new SessionUserService(userRepository)

    const session = await createSession.execute({
      email,
      password
    })

    return res.send(session)
  }
}

export default SessionController
