import { makePath, leadingSlash } from './utils'

const makeController = (
  path: string | null,
  middleware: Function | Function[]
) => <T extends { new (...args: any[]): {} }>(constructor: T) =>
  class extends constructor {
    public path: string = leadingSlash(path || makePath(constructor.name))

    public middleware: Function | Function[] = middleware
  }

const make = (
  verb: string,
  path: string | null,
  middleware?: Function | Function[]
): MethodDecorator => (
  _target: Object, // eslint-disable-line
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) => {
  const meth = descriptor.value
  // wrap because we dont want to attach our own props onto someone
  // else's code.
  // eslint-disable-next-line
  descriptor.value = function(...args: any[]) {
    return meth.apply(this, args)
  }
  // eslint-disable-next-line
  descriptor.value.props = {
    verb,
    path: leadingSlash(path || makePath(propertyKey.toString())),
    middleware
  }

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

/*
 Class Decorators
 */

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
