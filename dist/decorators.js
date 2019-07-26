"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const makeController = (path, middleware) => (constructor) => class extends constructor {
    constructor() {
        super(...arguments);
        this.path = utils_1.leadingSlash(path || utils_1.makePath(constructor.name));
        this.middleware = middleware;
    }
};
const make = (verb, path, middleware) => (_target, // eslint-disable-line
propertyKey, descriptor) => {
    const meth = descriptor.value;
    // wrap because we dont want to attach our own props onto someone
    // else's code.
    // eslint-disable-next-line
    descriptor.value = function (...args) {
        return meth.apply(this, args);
    };
    // eslint-disable-next-line
    descriptor.value.props = {
        verb,
        path: utils_1.leadingSlash(path || utils_1.makePath(propertyKey.toString())),
        middleware
    };
    return descriptor;
};
function Get(middleware) {
    return make('get', null, middleware);
}
exports.Get = Get;
exports.get = Get;
function Post(middleware) {
    return make('post', null, middleware);
}
exports.Post = Post;
exports.post = Post;
function Put(middleware) {
    return make('put', null, middleware);
}
exports.Put = Put;
exports.put = Put;
function Delete(middleware) {
    return make('delete', null, middleware);
}
exports.Delete = Delete;
exports.delete = Delete;
function GetWithRoute(path, middleware) {
    return make('get', path, middleware);
}
exports.GetWithRoute = GetWithRoute;
exports.getWithRoute = GetWithRoute;
function PostWithRoute(path, middleware) {
    return make('post', path, middleware);
}
exports.PostWithRoute = PostWithRoute;
exports.postWithRoute = PostWithRoute;
function PutWithRoute(path, middleware) {
    return make('put', path, middleware);
}
exports.PutWithRoute = PutWithRoute;
exports.putWithRoute = PutWithRoute;
function DeleteWithRoute(path, middleware) {
    return make('delete', path, middleware);
}
exports.DeleteWithRoute = DeleteWithRoute;
exports.deleteWithRoute = DeleteWithRoute;
/*
 Class Decorators
 */
function Controller(middleware) {
    return makeController(null, middleware || []);
}
exports.Controller = Controller;
exports.controller = Controller;
function ControllerWithRoute(path, middleware) {
    return makeController(path, middleware || []);
}
exports.ControllerWithRoute = ControllerWithRoute;
exports.controllerWithRoute = ControllerWithRoute;
//# sourceMappingURL=decorators.js.map