"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var mounting_1 = require("./mounting");
var Server = /** @class */ (function () {
    function Server(adapter, opts) {
        if (opts === void 0) { opts = {}; }
        this.adapter = adapter;
        this.app = adapter.createApp(opts);
    }
    Server.prototype.mount = function (controllerOrControllers) {
        var controllers = lodash_1.castArray(controllerOrControllers);
        return mounting_1.mountControllers(this.app, controllers, this.adapter);
    };
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=server.js.map