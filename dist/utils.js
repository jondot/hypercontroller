"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var makePath = function (name) {
    if (name === 'index') {
        return '';
    }
    var controllerOrPath = lodash_1.replace(name, /Controller$/, '');
    if (controllerOrPath === 'Index') {
        return '';
    }
    return lodash_1.kebabCase(controllerOrPath);
};
exports.makePath = makePath;
var leadingSlash = function (mountedPath) {
    return mountedPath.startsWith('/') ? mountedPath : "/" + mountedPath;
};
exports.leadingSlash = leadingSlash;
//# sourceMappingURL=utils.js.map