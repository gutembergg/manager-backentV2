import 'reflect-metadata'
import './config/env'
import 'express-async-errors'
import express, {
  NextFunction,
  Request,
  Response,
  ErrorRequestHandler
} from 'express'
import './database'
import routes from './routes'
import AppErros from './erros/AppErros'

const app = express()
const PORT = 3333

app.use(express.json())
app.use(routes)

app.use(
  (
    error: ErrorRequestHandler,
    req: Request,
    res: Response,
    _: NextFunction
  ) => {
    if (error instanceof AppErros) {
      return res
        .status(error.statusCode)
        .json({ status: 'error', message: error.message })
    }

    return res
      .status(500)
      .json({ status: 'error', message: 'Internal server error' })
  }
)

app.listen(PORT, () => {
  console.log('connected!!!!')
})
