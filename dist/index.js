"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var hyperparams_1 = require("hyperparams");
var fastify_1 = __importDefault(require("./adapters/fastify"));
exports.FastifyAdapter = fastify_1.default;
var express_1 = __importDefault(require("./adapters/express"));
exports.ExpressAdapter = express_1.default;
var mounting_1 = require("./mounting");
exports.printMountpoints = mounting_1.printMountpoints;
var permitParams = function (root, paths) { return hyperparams_1.extract(root, paths); };
exports.permitParams = permitParams;
__export(require("./decorators"));
__export(require("./server"));
//# sourceMappingURL=index.js.map