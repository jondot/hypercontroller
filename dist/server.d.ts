import { ControllerMountpoint } from './mounting';
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
    mount(controllerOrControllers: any): ControllerMountpoint[];
    start(createConnection?: () => Promise<void>, opts?: any): Promise<any>;
}
