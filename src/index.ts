import { extract } from 'hyperparams'
import FastifyAdapter from './adapters/fastify'
import ExpressAdapter from './adapters/express'
import { printMountpoints } from './mounting'

type ExtractorFn = (rec: Record<string, any>) => Record<string, any>

const requireParams = (
  root: string,
  paths: [string | Record<string, any>]
): ExtractorFn => extract(root, paths)

export * from './decorators'
export * from './server'

export { FastifyAdapter, ExpressAdapter, printMountpoints, requireParams }
