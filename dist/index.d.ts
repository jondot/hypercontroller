import FastifyAdapter from './adapters/fastify';
import ExpressAdapter from './adapters/express';
import { printMountpoints } from './mounting';
declare const requireParams: (root: string, paths: [string | Record<string, any>]) => Record<string, any>;
export * from './decorators';
export * from './server';
export { FastifyAdapter, ExpressAdapter, printMountpoints, requireParams };
