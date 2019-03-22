import { ServerAdapter } from '../server';
declare class FastifyAdapter implements ServerAdapter {
    fastify: any;
    constructor(fastify: any);
    createApp(opts: any): any;
    mountAction(app: any, _router: any, verb: string, parentPath: string, path: string, middleware: Function[], cb: Function): void;
    mountController(_app: any, _router: any, _path: string, _middleware: Function[]): void;
    createRouter(): {};
}
export default FastifyAdapter;
