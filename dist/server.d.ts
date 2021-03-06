export interface ServerAdapter {
    createApp(opts: any): any;
    mountAction(app: any, router: any, verb: string, parentPath: string, path: string, middleware: Function[], cb: Function): void;
    mountController(app: any, router: any, path: string, middleware: Function[]): void;
    createRouter(): any;
}
export interface ActionController {
    [key: string]: any;
    path: string;
    middleware: Function | Function[];
}
export declare class Server {
    readonly app: any;
    connection: any;
    readonly adapter: ServerAdapter;
    constructor(adapter: ServerAdapter, opts?: {});
    mount(controllerOrControllers: any): void;
    start(boot?: Function, opts?: any): Promise<any>;
}
