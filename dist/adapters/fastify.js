"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
class FastifyAdapter {
    constructor(fastify) {
        this.fastify = fastify;
    }
    // eslint-disable-next-line
    createApp(opts) {
        return this.fastify(opts);
    }
    // eslint-disable-next-line
    mountAction(app, _router, verb, parentPath, path, middleware, cb) {
        app.route({
            method: verb.toUpperCase(),
            url: path_1.join(parentPath, path),
            preHandler: middleware,
            handler: cb
        });
    }
    // eslint-disable-next-line
    mountController(_app, _router, _path, _middleware) { }
    // eslint-disable-next-line
    createRouter() {
        return {};
    }
}
exports.default = FastifyAdapter;
//# sourceMappingURL=fastify.js.map