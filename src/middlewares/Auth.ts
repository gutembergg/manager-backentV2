import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import AppErros from '../erros/AppErros'

const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> | void => {
  const authHeaders = req.headers.authorization

  if (!authHeaders) {
    throw new AppErros('JWT token is missing!', 401)
  }

  const [, token] = authHeaders.split(' ')

  try {
    verify(token, process.env.APP_SECRET)

    next()
  } catch (error) {
    throw new AppErros('Token badly formatted', 406)
  }
}

export default authenticate
