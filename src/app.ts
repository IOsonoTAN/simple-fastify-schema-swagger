import fastify, { FastifyRequest, FastifyServerOptions } from 'fastify'
import fastifySwagger from 'fastify-swagger'

const buildApp = (options: FastifyServerOptions = {}) => {
  const app = fastify(options)

  app.register(fastifySwagger, {
    routePrefix: '/docs',
    swagger: {
      info: {
        title: 'A simple project',
        description: 'DESC',
        version: '1.0.0'
      }
    },
    exposeRoute: true
  })

  app.get('/', async () => 'OK')

  type CreateNewUsersRequestBodyType = FastifyRequest<{
    Body: {
      username: string
      password: string
    }
  }>

  const CreateNewUsersRequestBody = {
    body: {
      type: 'object',
      required: ['username', 'password'],
      properties: {
        username: {
          type: 'string'
        },
        password: {
          type: 'string'
        },
      }
    },
    response: {
      200: {
        type: 'string',
        example: 'User has been created'
      }
    }
  }

  app.post('/users', { schema: CreateNewUsersRequestBody }, async (request: CreateNewUsersRequestBodyType): Promise<string> => {
    const { username, password } = request.body
    console.log('username ->', username)
    console.log('password ->', password)

    return 'User has been created'
  })

  return app
}

export default buildApp