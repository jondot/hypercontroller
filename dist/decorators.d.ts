export declare function Get(middleware?: Function | Function[]): MethodDecorator;
export declare function Post(middleware?: Function | Function[]): MethodDecorator;
export declare function Put(middleware?: Function | Function[]): MethodDecorator;
export declare function Delete(middleware?: Function | Function[]): MethodDecorator;
export { Get as get, Post as post, Put as put, Delete as delete };
export declare function GetWithRoute(path: string, middleware?: Function | Function[]): MethodDecorator;
export declare function PostWithRoute(path: string, middleware?: Function | Function[]): MethodDecorator;
export declare function PutWithRoute(path: string, middleware?: Function | Function[]): MethodDecorator;
export declare function DeleteWithRoute(path: string, middleware?: Function | Function[]): MethodDecorator;
export { GetWithRoute as getWithRoute, PostWithRoute as postWithRoute, PutWithRoute as putWithRoute, DeleteWithRoute as deleteWithRoute };
export declare function Controller(middleware?: Function | Function[]): <T extends new (...args: any[]) => {}>(constructor: T) => {
    new (...args: any[]): {
        path: string;
        middleware: Function | Function[];
    };
} & T;
export declare function ControllerWithRoute(path: string, middleware?: Function | Function[]): <T extends new (...args: any[]) => {}>(constructor: T) => {
    new (...args: any[]): {
        path: string;
        middleware: Function | Function[];
    };
} & T;
export { Controller as controller, ControllerWithRoute as controllerWithRoute };
