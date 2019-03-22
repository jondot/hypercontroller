import { join } from 'path'
import { ServerAdapter } from '../server'

class FastifyAdapter implements ServerAdapter {
  fastify: any

  constructor(fastify: any) {
    this.fastify = fastify
  }
  // eslint-disable-next-line
  createApp(opts: any): any {
    return this.fastify(opts)
  }

  // eslint-disable-next-line
  mountAction(
    app: any,
    _router: any,
    verb: string,
    parentPath: string,
    path: string,
    middleware: Function[],
    cb: Function
  ) {
    app.route({
      method: verb.toUpperCase(),
      url: join(parentPath, path),
      preHandler: middleware,
      handler: cb
    })
  }

  // eslint-disable-next-line
  mountController(
    _app: any,
    _router: any,
    _path: string,
    _middleware: Function[]
  ) {}

  // eslint-disable-next-line
  createRouter() {
    return {}
  }
}

export default FastifyAdapter
