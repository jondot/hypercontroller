import { castArray, compact } from 'lodash'
import { ActionController, ServerAdapter } from './server'

export interface Route {
  (...args: any[]): any
  props: any
}

export interface ActionMountpoint {
  path: string
  verb: string
  parent: string
  middleware: string[]
}

export interface ControllerMountpoint {
  path: string
  middleware: string[]
  actions: ActionMountpoint[]
}

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

export function printMountpoints(mps: ControllerMountpoint[]) {
  const printMiddleware = (middleware: string[]) =>
    middleware && middleware.length > 0 ? `[${middleware}]` : ''
  mps.forEach(cmp => {
    console.log(`${cmp.path}\t${printMiddleware(cmp.middleware)}`)
    cmp.actions.forEach(amp => {
      console.log(
        `\t${amp.verb.toUpperCase()} ${cmp.path !== '/' ? cmp.path : ''}${amp.path}\t${printMiddleware(
          amp.middleware
        )}`
      )
    })
    console.log('')
  })
}

export const mountActions = (
  app: any,
  controller: ActionController,
  router: any,
  adapter: ServerAdapter
): ControllerMountpoint => {
  // mount all actions within a controller
  const actionMountpoints = compact(
    methods(controller).map(member => {
      const route = controller[member] as Route

      // remember we tucked props in each route with the decorator
      if (route && route.props) {
        const { middleware, verb, path } = route.props
        const handler = (req: any, res: any, next: any) =>
          (controller[member] as Route)(req, res, next)
        const middlewares = castArray(middleware || [])

        // supply the adapter with everything it needs. some adapters
        // don't have concept of 'router' for nesting and so supply the controller
        // path.
        adapter.mountAction(
          app,
          router,
          verb,
          controller.path,
          path,
          middlewares,
          handler
        )

        // return a descriptor for what we did. this is for printing a routing map
        // and other potential tooling
        return {
          path,
          verb,
          parent: controller.path,
          middleware: middlewares.map(m => m.name || 'unnamed-middleware')
        }
      }
      return null
    })
  )

  // finally mount the controller itself
  const middlewares = castArray(controller.middleware || [])
  adapter.mountController(app, router, controller.path, middlewares)

  // return descriptor for what we did.
  return {
    path: controller.path,
    middleware: middlewares.map(m => m.name || 'unnamed-middleware'),
    actions: actionMountpoints
  }
}
export const mountControllers = (
  app: any,
  controllers: any[],
  adapter: ServerAdapter
): ControllerMountpoint[] =>
  compact(
    controllers.map(controller => {
      if (controller && controller.path) {
        const router = adapter.createRouter()
        return mountActions(app, controller, router, adapter)
      }
      return null
    })
  )
