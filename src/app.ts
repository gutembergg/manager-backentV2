import 'reflect-metadata'
import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response
} from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import 'express-async-errors'
import './config/env'
import createConnection from './database'
import AppErros from './erros/AppErros'
import routes from './routes'
import swaggerDocs from './swagger.json'

createConnection()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

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
