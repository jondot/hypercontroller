"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var FastifyAdapter = /** @class */ (function () {
    function FastifyAdapter(fastify) {
        this.fastify = fastify;
    }
    // eslint-disable-next-line
    FastifyAdapter.prototype.createApp = function (opts) {
        return this.fastify(opts);
    };
    // eslint-disable-next-line
    FastifyAdapter.prototype.mountAction = function (app, _router, verb, parentPath, path, middleware, cb) {
        app.route({
            method: verb.toUpperCase(),
            url: path_1.join(parentPath, path),
            preHandler: middleware,
            handler: cb
        });
    };
    // eslint-disable-next-line
    FastifyAdapter.prototype.mountController = function (_app, _router, _path, _middleware) { };
    // eslint-disable-next-line
    FastifyAdapter.prototype.createRouter = function () {
        return {};
    };
    return FastifyAdapter;
}());
exports.default = FastifyAdapter;
//# sourceMappingURL=fastify.js.map