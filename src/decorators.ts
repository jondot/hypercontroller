import { makePath, leadingSlash } from './utils'
import { setRouteProps, setControllerProps } from './meta-store'

const makeController = (
  path: string | null,
  middleware?: Function | Function[]
): ClassDecorator => {
  // tslint:disable-next-line:ban-types
  return <TFunction extends Function>(target: TFunction) => {
    setControllerProps(target, {
      path: leadingSlash(path || makePath(target.name)),
      middleware
    })
    return target
  }
}

const make = (
  verb: string,
  path: string | null,
  middleware?: Function | Function[]
): MethodDecorator => (
  target: Object, // eslint-disable-line
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) => {
  const meta = {
    verb,
    path: leadingSlash(path || makePath(propertyKey.toString())),
    middleware
  }

  // @ts-ignore
  setRouteProps(target[propertyKey.toString()], meta)

  return descriptor
}

export function Get(middleware?: Function | Function[]): MethodDecorator {
  return make('get', null, middleware)
}

export function Post(middleware?: Function | Function[]): MethodDecorator {
  return make('post', null, middleware)
}

export function Put(middleware?: Function | Function[]): MethodDecorator {
  return make('put', null, middleware)
}

export function Delete(middleware?: Function | Function[]): MethodDecorator {
  return make('delete', null, middleware)
}
export { Get as get, Post as post, Put as put, Delete as delete }

export function GetWithRoute(
  path: string,
  middleware?: Function | Function[]
): MethodDecorator {
  return make('get', path, middleware)
}

export function PostWithRoute(
  path: string,
  middleware?: Function | Function[]
): MethodDecorator {
  return make('post', path, middleware)
}

export function PutWithRoute(
  path: string,
  middleware?: Function | Function[]
): MethodDecorator {
  return make('put', path, middleware)
}

export function DeleteWithRoute(
  path: string,
  middleware?: Function | Function[]
): MethodDecorator {
  return make('delete', path, middleware)
}
export {
  GetWithRoute as getWithRoute,
  PostWithRoute as postWithRoute,
  PutWithRoute as putWithRoute,
  DeleteWithRoute as deleteWithRoute
}

export function Controller(middleware?: Function | Function[]) {
  return makeController(null, middleware || [])
}

export function ControllerWithRoute(
  path: string,
  middleware?: Function | Function[]
) {
  return makeController(path, middleware || [])
}
export { Controller as controller, ControllerWithRoute as controllerWithRoute }
