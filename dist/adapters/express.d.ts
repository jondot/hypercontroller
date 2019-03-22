import { ServerAdapter } from '../server';
declare class ExpressAdapter implements ServerAdapter {
    express: any;
    constructor(express: any);
    createApp(opts: any): any;
    mountAction(_app: any, router: any, verb: string, _parentPath: string, path: string, middleware: Function[], cb: Function): void;
    mountController(app: any, router: any, path: string, middleware: Function[]): void;
    createRouter(): any;
}
export default ExpressAdapter;
