import 'reflect-metadata'

const HPCT_ROUTE = 'hpct_route'
const HPCT_CONTROLLER = 'hpct_controller'

const setRouteProps = (route: any, meta: any) =>
  Reflect.defineMetadata(HPCT_ROUTE, meta, route)

const getRouteProps = (target: Record<string, any>) =>
  Reflect.getOwnMetadata(HPCT_ROUTE, target)

const setControllerProps = (target: any, meta: any) =>
  Reflect.defineMetadata(HPCT_CONTROLLER, meta, target.prototype)

const getControllerProps = (target: Record<string, any>): any =>
  Reflect.getOwnMetadata(HPCT_CONTROLLER, target.constructor.prototype)

export { setRouteProps, getRouteProps, setControllerProps, getControllerProps }
