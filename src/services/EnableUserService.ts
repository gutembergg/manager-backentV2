import AppErros from '../erros/AppErros'
import User from '../models/User'
import IUserRepository from '../Repository/intefaces/IUserRepository'
import UserRepository from '../Repository/repositories/UserRepository'

interface Request {
  id: string
}

class EnableUserService {
  private _userRepository: IUserRepository

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository
  }

  public async execute({ id }: Request): Promise<User> {
    const user = await this._userRepository.findById(id)

    if (!user) {
      throw new AppErros('User not found', 400)
    }

    user.active = !user.active

    await this._userRepository.save(user)

    return user
  }
}

export default EnableUserService
