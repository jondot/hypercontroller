"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
function printMountpoints(mps) {
    var printMiddleware = function (middleware) {
        return middleware && middleware.length > 0 ? "[" + middleware + "]" : '';
    };
    mps.forEach(function (cmp) {
        console.log(cmp.path + "\t" + printMiddleware(cmp.middleware));
        cmp.actions.forEach(function (amp) {
            console.log("\t" + amp.verb.toUpperCase() + " " + cmp.path + amp.path + "\t" + printMiddleware(amp.middleware));
        });
        console.log('');
    });
}
exports.printMountpoints = printMountpoints;
exports.mountActions = function (app, controller, router, adapter) {
    // mount all actions within a controller
    var actionMountpoints = lodash_1.compact(lodash_1.keysIn(controller).map(function (member) {
        var route = controller[member];
        // remember we tucked props in each route with the decorator
        if (route && route.props) {
            var _a = route.props, middleware = _a.middleware, verb = _a.verb, path = _a.path;
            var handler = function (req, res, next) {
                return controller[member](req, res, next);
            };
            var middlewares_1 = lodash_1.castArray(middleware || []);
            // supply the adapter with everything it needs. some adapters
            // don't have concept of 'router' for nesting and so supply the controller
            // path.
            adapter.mountAction(app, router, verb, controller.path, path, middlewares_1, handler);
            // return a descriptor for what we did. this is for printing a routing map
            // and other potential tooling
            return {
                path: path,
                verb: verb,
                parent: controller.path,
                middleware: middlewares_1.map(function (m) { return m.name || 'unnamed-middleware'; })
            };
        }
        return null;
    }));
    // finally mount the controller itself
    var middlewares = lodash_1.castArray(controller.middleware || []);
    adapter.mountController(app, router, controller.path, middlewares);
    // return descriptor for what we did.
    return {
        path: controller.path,
        middleware: middlewares.map(function (m) { return m.name || 'unnamed-middleware'; }),
        actions: actionMountpoints
    };
};
exports.mountControllers = function (app, controllers, adapter) {
    return lodash_1.compact(controllers.map(function (controller) {
        if (controller && controller.path) {
            var router = adapter.createRouter();
            return exports.mountActions(app, controller, router, adapter);
        }
        return null;
    }));
};
//# sourceMappingURL=mounting.js.map