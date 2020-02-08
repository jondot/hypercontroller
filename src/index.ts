import { extract } from 'hyperparams'
import FastifyAdapter from './adapters/fastify'
import ExpressAdapter from './adapters/express'

type ExtractorFn = (rec: Record<string, any>) => Record<string, any>

const permitParams = (
  root: string,
  paths: [string | Record<string, any>]
): ExtractorFn => extract(root, paths)

export * from './decorators'
export * from './server'

export { FastifyAdapter, ExpressAdapter, permitParams }
