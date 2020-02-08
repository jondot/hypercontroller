import request from 'supertest'
import express from 'express'
import {
  Server,
  ServerAdapter,
  get,
  Post,
  Controller,
  GetWithRoute,
  Delete
} from '../index'
import ExpressAdapter from '../adapters/express'

function someMiddleware(req: any, _res: any, next: any) {
  req.hello = 'world'
  next()
}

@Controller(someMiddleware)
class TestingController {
  @GetWithRoute('/')
  get(req: any, res: any) {
    res.json({ middleware: req.hello, get: 'bar' })
  }

  @Post()
  foobar(_req: any, _res: any) {}

  @Delete()
  index(_req: any, _res: any) {}

  @get(someMiddleware)
  withMiddleware(_req: any, _res: any) {}

  custom(_req: any, res: any) {
    res.json({ custom: true })
  }

  _routes({ router }: { router: any }) {
    router.get('custom', this.custom)
  }
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
    return { router: true, get: () => {} }
  }
}

describe('server', () => {
  it('should mount controllers and actions', () => {
    const testAdapter = new TestAdapter()

    const server = new Server(testAdapter)
    server.mount([new TestingController()])
    expect(testAdapter.mountedActions).toMatchSnapshot('mounted actions')
    expect(testAdapter.mountedControllers).toMatchSnapshot(
      'mounted controllers'
    )
  })
  it('should respond with mounted middleware', async () => {
    const testAdapter = new ExpressAdapter(express)

    const server = new Server(testAdapter)
    server.mount([new TestingController()])
    const res = await request(server.app).get('/testing')
    expect(res.body).toMatchSnapshot()
  })
})
