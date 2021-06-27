import { hash } from 'bcryptjs'
import User from '../models/User'
import IUserRepository from '../Repository/intefaces/IUserRepository'
import UserRepository from '../Repository/repositories/UserRepository'

interface Request {
  name: string
  email: string
  password: string
}

class CreateUserService {
  private _userRepository: IUserRepository

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository
  }

  public async execute({ name, email, password }: Request): Promise<User> {
    const passwordHash = await hash(password, 8)

    const user = this._userRepository.create({
      name,
      email,
      password: passwordHash
    })

    return user
  }
}

export default CreateUserService
