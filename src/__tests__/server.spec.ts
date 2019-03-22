import {
  Server,
  ServerAdapter,
  get,
  Post,
  Controller,
  GetWithRoute,
  Delete
} from '../index'

function someMiddleware(_req: any, _res: any, _next: any) {}

@Controller(someMiddleware)
class TestingController {
  @GetWithRoute('/')
  get(req: any, res: any) {
    res.json({ user: req.user })
  }

  @Post()
  foobar(_req: any, _res: any) {}

  @Delete()
  index(_req: any, _res: any) {}

  @get(someMiddleware)
  withMiddleware(_req: any, _res: any) {}
}

class TestAdapter implements ServerAdapter {
  mountedActions: any[] = []

  mountedControllers: any[] = []

  createApp(_opts: any): any {
    return { app: true }
  }

  mountAction(
    app: any,
    router: any,
    verb: string,
    parentPath: string,
    path: string,
    middleware: Function[],
    cb: Function
  ) {
    this.mountedActions.push({
      app,
      router,
      verb,
      parentPath,
      path,
      middleware,
      cb
    })
  }

  mountController(app: any, router: any, path: string, middleware: Function[]) {
    this.mountedControllers.push({
      app,
      router,
      path,
      middleware
    })
  }

  createRouter() {
    return { router: true }
  }
}

describe('server', () => {
  it('should mount controllers and actions', () => {
    const testAdapter = new TestAdapter()

    const server = new Server(testAdapter)
    const mountpoints = server.mount([new TestingController()])
    expect(testAdapter.mountedActions).toMatchSnapshot('mounted actions')
    expect(testAdapter.mountedControllers).toMatchSnapshot(
      'mounted controllers'
    )
    expect(mountpoints).toMatchSnapshot('mountpoints')
  })
})
