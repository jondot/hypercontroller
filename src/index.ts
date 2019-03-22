import { extract } from 'hyperparams'
import FastifyAdapter from './adapters/fastify'
import ExpressAdapter from './adapters/express'
import { printMountpoints } from './mounting'

const requireParams = (
  root: string,
  paths: [string | Record<string, any>]
): Record<string, any> => extract(root, paths)

export * from './decorators'
export * from './server'

export { FastifyAdapter, ExpressAdapter, printMountpoints, requireParams }
