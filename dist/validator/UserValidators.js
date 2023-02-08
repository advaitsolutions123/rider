"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidators = void 0;
const express_validator_1 = require("express-validator");
class UserValidators {
    static login() {
        return [(0, express_validator_1.body)('username', 'Username is Required').isString(),
            (0, express_validator_1.body)('email', 'Email is Required').isEmail(),
            (0, express_validator_1.body)('password').custom((req) => {
                if (req.email) {
                    return true;
                }
                else {
                    throw new Error('Testing Custom Validation');
                }
            })
        ];
    }
}
exports.UserValidators = UserValidators;
