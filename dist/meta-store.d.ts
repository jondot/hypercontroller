import 'reflect-metadata';
declare const setRouteProps: (route: any, meta: any) => void;
declare const getRouteProps: (target: Record<string, any>) => any;
declare const setControllerProps: (target: any, meta: any) => void;
declare const getControllerProps: (target: Record<string, any>) => any;
export { setRouteProps, getRouteProps, setControllerProps, getControllerProps };
