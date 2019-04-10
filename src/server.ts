import { castArray } from 'lodash'
import { mountControllers, ControllerMountpoint } from './mounting'

export interface ServerAdapter {
  createApp(opts: any): any
  mountAction(
    app: any,
    router: any,
    verb: string,
    parentPath: string,
    path: string,
    middleware: Function[],
    cb: Function
  ): void
  mountController(
    app: any,
    router: any,
    path: string,
    middleware: Function[]
  ): void
  createRouter(): any
}

export interface ActionController {
  [key: string]: any
  path: string
  middleware: Function | Function[]
}

export class Server {
  public readonly app: any

  public connection: any

  public readonly adapter: ServerAdapter

  public constructor(adapter: ServerAdapter, opts = {}) {
    this.adapter = adapter
    this.app = adapter.createApp(opts)
  }

  public mount(controllerOrControllers: any): ControllerMountpoint[] {
    const controllers = castArray(controllerOrControllers as
      | ActionController
      | ActionController[])
    return mountControllers(this.app, controllers, this.adapter)
  }

  public start(
    createConnection: Function = () => Promise.resolve(),
    opts: any = {}
  ): Promise<any> {
    const resolvedOpts = {
      ...{ env: process.env.NODE_ENV, port: process.env.PORT || 3000 },
      ...opts
    }
    return new Promise((resolve, reject) => {
      createConnection()
        .then(async (connection: any) => {
          this.connection = connection
          if (resolvedOpts.env !== 'test') {
            this.app.listen(resolvedOpts.port, () => {
              resolve({ opts: resolvedOpts })
            })
          } else {
            resolve({ opts: resolvedOpts })
          }
        })

        .catch((err: any) => reject(err))
    })
  }
}
