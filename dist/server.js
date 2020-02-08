"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const mounting_1 = require("./mounting");
class Server {
    constructor(adapter, opts = {}) {
        this.adapter = adapter;
        this.app = adapter.createApp(opts);
    }
    mount(controllerOrControllers) {
        const controllers = lodash_1.castArray(controllerOrControllers);
        mounting_1.mountControllers(this.app, controllers, this.adapter);
    }
    start(boot = () => Promise.resolve(), opts = {}) {
        const resolvedOpts = Object.assign({ env: process.env.NODE_ENV, port: process.env.PORT || 3000 }, opts);
        return new Promise((resolve, reject) => {
            boot()
                .then(() => {
                if (resolvedOpts.env !== 'test') {
                    this.app.listen(resolvedOpts.port, () => {
                        resolve(resolvedOpts);
                    });
                }
                else {
                    resolve(resolvedOpts);
                }
            })
                .catch((err) => reject(err));
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map