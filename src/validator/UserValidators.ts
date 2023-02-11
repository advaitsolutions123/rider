import {
    body, query
} from 'express-validator';

import Users from '../models/Users';

export class UserValidators {

    static signUp() {
        return [
            body('email', 'Email is Required')
                .isEmail().custom((email , {req}) => {
                    console.log(req.body)
                    return Users.findOne({email: email}).then(user => {
                        if(user){
                            throw new Error('Email Already Exist')
                        }else {
                            return true;
                        }
                    })
                }),
            body('password', 'Password is Required').isAlphanumeric()
                .isLength({min: 8, max: 20})
                    .withMessage('Password can be from 8-20 Character only'),
            body('username', 'Username is Required').isString(),
            body('phone', 'Invalid Phone Number')
                .isLength({min:10, max: 12})
                    .isNumeric()
                        .withMessage('Please enter your phone no'),

        ]
    }

    static verifyUser(){
        return [
            body('verification_token', 'Verification Token is Require').isNumeric()
    ]
    }

    static resendVerificationEmail() {
        return [query('email', 'Email is required').isEmail()]
    }



    static login() {
        return [
            query('email','Email is required').isEmail()
                .custom((email, {req}) => {
                    return Users.findOne({email:email}).then(user => {
                        if(user){
                            req.user = user;
                            return true
                        }else {
                            throw new Error('User Does Not Exist')
                        }
                    })
                }),
            query('password', 'Password is required').isAlphanumeric()
    ]
    }

    static updatePassword(){
        return [body('password', 'Password is Required').isAlphanumeric(),
        body('new_password', 'New Password is Required').isAlphanumeric(),
        body('confirm_password', 'Confirm Password is Required').isAlphanumeric()
            .custom((confirmPassword, {req}) => {
                if(confirmPassword === req.body.new_password){
                    return true
                }else {
                    req.errorStatus = 422;
                    throw new Error('Password and confirm Password does not match')
                }
            })
    ]
    }

}