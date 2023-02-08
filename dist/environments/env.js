"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvironmentVariables = void 0;
const dev_env_1 = require("./dev.env");
const prod_env_1 = require("./prod.env");
function getEnvironmentVariables() {
    if (process.env.NODE === 'production') {
        return prod_env_1.ProddEnvironment;
    }
    return dev_env_1.DevEnvironment;
}
exports.getEnvironmentVariables = getEnvironmentVariables;
