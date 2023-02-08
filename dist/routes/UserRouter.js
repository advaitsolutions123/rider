"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const UserValidators_1 = require("../validator/UserValidators");
class UserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.post('/login', UserValidators_1.UserValidators.login, UserController_1.UserController.login);
    }
    postRoutes() {
    }
    patchRoutes() {
    }
    deleteRoutes() {
    }
}
exports.UserRouter = UserRouter;
exports.default = new UserRouter().router;
