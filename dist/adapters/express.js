"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var async_express_mw_1 = __importDefault(require("async-express-mw"));
var ExpressAdapter = /** @class */ (function () {
    function ExpressAdapter(express) {
        this.express = express;
    }
    // eslint-disable-next-line
    ExpressAdapter.prototype.createApp = function (opts) {
        return this.express(opts);
    };
    // eslint-disable-next-line
    ExpressAdapter.prototype.mountAction = function (_app, router, verb, _parentPath, path, middleware, cb) {
        if (middleware && middleware.length > 0) {
            router[verb](path, middleware, async_express_mw_1.default(cb));
        }
        else {
            router[verb](path, async_express_mw_1.default(cb));
        }
    };
    // eslint-disable-next-line
    ExpressAdapter.prototype.mountController = function (app, router, path, middleware) {
        app.use(path, middleware, router);
    };
    // eslint-disable-next-line
    ExpressAdapter.prototype.createRouter = function () {
        return this.express.Router();
    };
    return ExpressAdapter;
}());
exports.default = ExpressAdapter;
//# sourceMappingURL=express.js.map