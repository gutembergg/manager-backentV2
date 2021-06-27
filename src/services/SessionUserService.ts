import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import AppErros from '../erros/AppErros'
import User from '../models/User'
import IUserRepository from '../Repository/intefaces/IUserRepository'
import UserRepository from '../Repository/repositories/UserRepository'

interface Request {
  email: string
  password: string
}

interface IResponse {
  token: string
  user: User
}

class SessionUserService {
  private _userRepository: IUserRepository

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository
  }

  public async execute({ email, password }: Request): Promise<IResponse> {
    const user = await this._userRepository.findByEmail(email)

    if (!user) {
      throw new AppErros('Invailid credentials', 401)
    }

    const passwordCompare = await compare(password, user.password)

    if (!passwordCompare) {
      throw new AppErros('Invailid password', 401)
    }

    if (!user.active) {
      throw new AppErros('User inactive', 401)
    }

    const token = sign({ id: user.id }, process.env.APP_SECRET, {
      expiresIn: '1d'
    })

    delete user.password

    return {
      token,
      user
    }
  }
}

export default SessionUserService
