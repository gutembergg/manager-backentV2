import 'reflect-metadata'
import 'express-async-errors'
import cors from 'cors'
import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response
} from 'express'
import swaggerUi from 'swagger-ui-express'
import './config/env'
import createConnection from './database'
import AppErros from './erros/AppErros'
import routes from './routes'
import swaggerDocs from './swagger.json'
import { resolve } from 'path'

createConnection()

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use('/files', express.static(resolve(__dirname, '..', 'uploads')))
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

export { app }
