import FastifyAdapter from './adapters/fastify';
import ExpressAdapter from './adapters/express';
import { printMountpoints } from './mounting';
declare type ExtractorFn = (rec: Record<string, any>) => Record<string, any>;
declare const requireParams: (root: string, paths: [string | Record<string, any>]) => ExtractorFn;
export * from './decorators';
export * from './server';
export { FastifyAdapter, ExpressAdapter, printMountpoints, requireParams };
