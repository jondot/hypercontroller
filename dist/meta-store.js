"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const HPCT_ROUTE = 'hpct_route';
const HPCT_CONTROLLER = 'hpct_controller';
const setRouteProps = (route, meta) => Reflect.defineMetadata(HPCT_ROUTE, meta, route);
exports.setRouteProps = setRouteProps;
const getRouteProps = (target) => Reflect.getOwnMetadata(HPCT_ROUTE, target);
exports.getRouteProps = getRouteProps;
const setControllerProps = (target, meta) => Reflect.defineMetadata(HPCT_CONTROLLER, meta, target.prototype);
exports.setControllerProps = setControllerProps;
const getControllerProps = (target) => Reflect.getOwnMetadata(HPCT_CONTROLLER, target.constructor.prototype);
exports.getControllerProps = getControllerProps;
//# sourceMappingURL=meta-store.js.map