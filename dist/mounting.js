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
exports.mountActions = (app, controller, router, adapter) => {
    const controllerProps = meta_store_1.getControllerProps(controller);
    // mount all actions within a controller
    methods(controller).forEach(member => {
        const route = controller[member];
        // remember we tucked props in each route with the decorator
        if (route && meta_store_1.getRouteProps(route)) {
            const { middleware, verb, path } = meta_store_1.getRouteProps(route);
            const middlewares = lodash_1.castArray(middleware || []);
            // supply the adapter with everything it needs. some adapters
            // don't have concept of 'router' for nesting and so supply the controller
            // path.
            adapter.mountAction(app, router, verb, controllerProps.path, path, middlewares, route);
        }
    });
    // finally mount the controller itself
    const middlewares = lodash_1.castArray(controllerProps.middleware || []);
    adapter.mountController(app, router, controllerProps.path, middlewares);
};
exports.mountControllers = (app, controllers, adapter) => controllers.forEach(controller => {
    const controllerProps = meta_store_1.getControllerProps(controller);
    if (controller && controllerProps.path) {
        const router = adapter.createRouter();
        exports.mountActions(app, controller, router, adapter);
        // eslint-disable-next-line
        if (controller._routes) {
            // eslint-disable-next-line
            controller._routes({ router });
        }
    }
});
//# sourceMappingURL=mounting.js.map