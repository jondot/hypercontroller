import { ActionController, ServerAdapter } from './server';
export interface ActionMountpoint {
    path: string;
    verb: string;
    parent: string;
    middleware: string[];
}
export interface ControllerMountpoint {
    path: string;
    middleware: string[];
    actions: ActionMountpoint[];
}
export declare function printMountpoints(mps: ControllerMountpoint[]): void;
export declare const mountActions: (app: any, controller: ActionController, router: any, adapter: ServerAdapter) => ControllerMountpoint;
export declare const mountControllers: (app: any, controllers: any[], adapter: ServerAdapter) => ControllerMountpoint[];
