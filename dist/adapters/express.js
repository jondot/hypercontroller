"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const async_express_mw_1 = __importDefault(require("async-express-mw"));
class ExpressAdapter {
    constructor(express) {
        this.express = express;
    }
    // eslint-disable-next-line
    createApp(opts) {
        return this.express(opts);
    }
    // eslint-disable-next-line
    mountAction(_app, router, verb, _parentPath, path, middleware, cb) {
        if (middleware && middleware.length > 0) {
            router[verb](path, middleware, async_express_mw_1.default(cb));
        }
        else {
            router[verb](path, async_express_mw_1.default(cb));
        }
    }
    // eslint-disable-next-line
    mountController(app, router, path, middleware) {
        app.use(path, middleware, router);
    }
    // eslint-disable-next-line
    createRouter() {
        return this.express.Router();
    }
}
exports.default = ExpressAdapter;
//# sourceMappingURL=express.js.map