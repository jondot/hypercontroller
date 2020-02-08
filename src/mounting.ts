import { castArray } from 'lodash'
import { getRouteProps, getControllerProps } from './meta-store'
import { ActionController, ServerAdapter } from './server'

function methods(obj: any): string[] {
  const ret: string[] = []
  if (obj) {
    const ps = Object.getOwnPropertyNames(obj)

    ps.forEach(p => {
      if (obj[p] instanceof Function) {
        ret.push(p)
      } else {
        // can add properties if needed
      }
    })

    return [...ret, ...methods(Object.getPrototypeOf(obj))]
  }
  return ret
}

export const mountActions = (
  app: any,
  controller: ActionController,
  router: any,
  adapter: ServerAdapter
) => {
  const controllerProps = getControllerProps(controller)
  // mount all actions within a controller
  methods(controller).forEach(member => {
    const route = controller[member]

    // remember we tucked props in each route with the decorator
    if (route && getRouteProps(route)) {
      const { middleware, verb, path } = getRouteProps(route)
      const middlewares = castArray(middleware || [])

      // supply the adapter with everything it needs. some adapters
      // don't have concept of 'router' for nesting and so supply the controller
      // path.
      adapter.mountAction(
        app,
        router,
        verb,
        controllerProps.path,
        path,
        middlewares,
        route
      )
    }
  })

  // finally mount the controller itself
  const middlewares = castArray(controllerProps.middleware || [])
  adapter.mountController(app, router, controllerProps.path, middlewares)
}
export const mountControllers = (
  app: any,
  controllers: any[],
  adapter: ServerAdapter
) =>
  controllers.forEach(controller => {
    const controllerProps = getControllerProps(controller)
    if (controller && controllerProps.path) {
      const router = adapter.createRouter()
      mountActions(app, controller, router, adapter)
      // eslint-disable-next-line
      if (controller._routes) {
        // eslint-disable-next-line
        controller._routes({ router })
      }
    }
  })
