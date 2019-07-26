"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const makePath = (name) => {
    if (name === 'index') {
        return '';
    }
    const controllerOrPath = lodash_1.replace(name, /Controller$/, '');
    if (controllerOrPath === 'Index') {
        return '';
    }
    return lodash_1.kebabCase(controllerOrPath);
};
exports.makePath = makePath;
const leadingSlash = (mountedPath) => mountedPath.startsWith('/') ? mountedPath : `/${mountedPath}`;
exports.leadingSlash = leadingSlash;
//# sourceMappingURL=utils.js.map