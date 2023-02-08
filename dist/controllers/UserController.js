"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const express_validator_1 = require("express-validator");
class UserController {
    static login(req, res, next) {
        const error = (0, express_validator_1.validationResult)(req);
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        if (!error.isEmpty()) {
            console.log(error.array());
        }
    }
}
exports.UserController = UserController;
