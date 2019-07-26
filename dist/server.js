"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        return mounting_1.mountControllers(this.app, controllers, this.adapter);
    }
    start(createConnection = () => Promise.resolve(), opts = {}) {
        const resolvedOpts = Object.assign({ env: process.env.NODE_ENV, port: process.env.PORT || 3000 }, opts);
        return new Promise((resolve, reject) => {
            createConnection()
                .then((connection) => __awaiter(this, void 0, void 0, function* () {
                this.connection = connection;
                if (resolvedOpts.env !== 'test') {
                    this.app.listen(resolvedOpts.port, () => {
                        resolve({ opts: resolvedOpts });
                    });
                }
                else {
                    resolve({ opts: resolvedOpts });
                }
            }))
                .catch((err) => reject(err));
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map