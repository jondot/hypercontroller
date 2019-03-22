"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var makeController = function (path, middleware) { return function (constructor) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.path = utils_1.leadingSlash(path || utils_1.makePath(constructor.name));
            _this.middleware = middleware;
            return _this;
        }
        return class_1;
    }(constructor));
}; };
var make = function (verb, path, middleware) { return function (_target, // eslint-disable-line
propertyKey, descriptor) {
    var meth = descriptor.value;
    // wrap because we dont want to attach our own props onto someone
    // else's code.
    // eslint-disable-next-line
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return meth.apply(this, args);
    };
    // eslint-disable-next-line
    descriptor.value.props = {
        verb: verb,
        path: utils_1.leadingSlash(path || utils_1.makePath(propertyKey.toString())),
        middleware: middleware
    };
    return descriptor;
}; };
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