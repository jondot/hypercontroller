import wrap from 'async-express-mw'

import { ServerAdapter } from '../server'

class ExpressAdapter implements ServerAdapter {
  express: any

  constructor(express: any) {
    this.express = express
  }
  // eslint-disable-next-line
  createApp(opts: any): any {
    return this.express(opts)
  }

  // eslint-disable-next-line
  mountAction(
    _app: any,
    router: any,
    verb: string,
    _parentPath: string,
    path: string,
    middleware: Function[],
    cb: Function
  ) {
    if (middleware && middleware.length > 0) {
      router[verb](path, middleware, wrap(cb))
    } else {
      router[verb](path, wrap(cb))
    }
  }

  // eslint-disable-next-line
  mountController(app: any, router: any, path: string, middleware: Function[]) {
    app.use(path, middleware, router)
  }

  // eslint-disable-next-line
  createRouter() {
    return this.express.Router()
  }
}

export default ExpressAdapter
