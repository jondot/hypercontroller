"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const meta_store_1 = require("./meta-store");
function methods(obj) {
    const ret = [];
    if (obj) {
        const ps = Object.getOwnPropertyNames(obj);
        ps.forEach(p => {
            if (obj[p] instanceof Function) {
                ret.push(p);
            }
            else {
                // can add properties if needed
            }
        });
        return [...ret, ...methods(Object.getPrototypeOf(obj))];
    }
    return ret;
}
function printMountpoints(mps) {
    const printMiddleware = (middleware) => middleware && middleware.length > 0 ? `[${middleware}]` : '';
    mps.forEach(cmp => {
        console.log(`${cmp.path}\t${printMiddleware(cmp.middleware)}`);
        cmp.actions.forEach(amp => {
            console.log(`\t${amp.verb.toUpperCase()} ${cmp.path !== '/' ? cmp.path : ''}${amp.path}\t${printMiddleware(amp.middleware)}`);
        });
        console.log('');
    });
}
exports.printMountpoints = printMountpoints;
exports.mountActions = (app, controller, router, adapter) => {
    const controllerProps = meta_store_1.getControllerProps(controller);
    // mount all actions within a controller
    const actionMountpoints = lodash_1.compact(methods(controller).map(member => {
        const route = controller[member];
        // remember we tucked props in each route with the decorator
        if (route && meta_store_1.getRouteProps(route)) {
            const { middleware, verb, path } = meta_store_1.getRouteProps(route);
            const middlewares = lodash_1.castArray(middleware || []);
            // supply the adapter with everything it needs. some adapters
            // don't have concept of 'router' for nesting and so supply the controller
            // path.
            adapter.mountAction(app, router, verb, controllerProps.path, path, middlewares, route);
            // return a descriptor for what we did. this is for printing a routing map
            // and other potential tooling
            return {
                path,
                verb,
                parent: controllerProps.path,
                middleware: middlewares.map(m => m.name || 'unnamed-middleware')
            };
        }
        return null;
    }));
    // finally mount the controller itself
    const middlewares = lodash_1.castArray(controllerProps.middleware || []);
    adapter.mountController(app, router, controllerProps.path, middlewares);
    // return descriptor for what we did.
    return {
        path: controllerProps.path,
        middleware: middlewares.map(m => m.name || 'unnamed-middleware'),
        actions: actionMountpoints
    };
};
exports.mountControllers = (app, controllers, adapter) => lodash_1.compact(controllers.map(controller => {
    const controllerProps = meta_store_1.getControllerProps(controller);
    if (controller && controllerProps.path) {
        const router = adapter.createRouter();
        return exports.mountActions(app, controller, router, adapter);
    }
    return null;
}));
//# sourceMappingURL=mounting.js.map