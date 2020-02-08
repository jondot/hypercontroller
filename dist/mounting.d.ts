import { ActionController, ServerAdapter } from './server';
export declare const mountActions: (app: any, controller: ActionController, router: any, adapter: ServerAdapter) => void;
export declare const mountControllers: (app: any, controllers: any[], adapter: ServerAdapter) => void;
