import { FastifyServerOptions } from 'fastify'
import buildApp from './src/app'

const appOptions: FastifyServerOptions = {
  logger: {
    prettyPrint: true
  }
}
const app = buildApp(appOptions)

app.listen(3000)