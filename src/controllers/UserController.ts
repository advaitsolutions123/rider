import Users from "../models/Users";
import {
    Utils
} from "../utils/utils";
import {
    NodeMailer
} from "../utils/NodeMailer";
import * as jwt from 'jsonwebtoken';
import {
    getEnvironmentVariables
} from "../environments/env";


export class UserController {

    static async signUp(req, res, next) {

        const email = req.body.email;
        const password = req.body.password;
        const username = req.body.username;
        const phone = req.body.phone;
        const verificationToken = Utils.generateVerificationToken();

        try {
            const hash = await Utils.encryptPassword(password);
            const data = {
                email: email,
                password: hash,
                username: username,
                phone: phone,
                verification_token: verificationToken,
                verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME
            };

            let user = await new Users(data).save();
            res.send(user)
            const mailer = await NodeMailer.sendEmail({
                to: [email],
                subject: "Email verification",
                html: `<h1>${verificationToken}</h1>`
            })



        } catch (e) {
            next(e)
        }



    }

    static async verify(req, res, next) {
        const verificationToken = req.body.verification_token;
        const email = req.body.email;

        try {
            const user = await Users.findOneAndUpdate({
                email: email,
                verification_token: verificationToken,
                verification_token_time: {
                    $gt: Date.now()
                }
            }, {
                verified: true
            }, {
                new: true
            });

            if (user) {
                res.send(user);
            } else {
                throw new Error('Verification token is expired. Please Request for new one');
            }
        } catch (e) {
            next(e)
        }

    }

    static async resendVerificationEmail(req, res, next) {
        const email = req.query.email;
        const verificationToken = Utils.generateVerificationToken();
        try {
            const user: any = await Users.findOneAndUpdate({
                email: email
            }, {
                verification_token: verificationToken,
                verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME
            })

            if (user) {
                const mailer = await NodeMailer.sendEmail({
                    to: [user.email],
                    subject: 'Email Verification',
                    html: `<h1>${verificationToken}</h1>`
                });

                res.json({
                    success: true,
                })
            } else {
                throw Error('User Does Not Exist')
            }
        } catch (e) {

        }
    }

    static async login(req, res, next) {
        const email = req.query.email;
        const password = req.query.password;

        const user = req.user;

        try {
            await Utils.comparePassword({
                plainPassword: password,
                encryptPassword: user.password
            });

            const token = jwt.sign({
                    email: user.email,
                    user_id: user._id
                },
                getEnvironmentVariables().jwt_secret, {
                    expiresIn: '120d'
                })

            const data = {
                status: 200,
                token: token
            };
            res.json(data)
        } catch (e) {
            next(e)
        }
    }

    static async updatePassword(req, res, next) {
        const user_id = req.user.user_id;
        const password = req.body.password;
        const confirmPassword = req.body.confirm_password;
        const newPassword = req.body.new_password;

        try {
            Users.findOne({
                _id: user_id
            }).then(async (user: any) => {
                Utils.comparePassword({
                    plainPassword: password,
                    encryptPassword: user.password
                });
                const encryptedPassword = await Utils.encryptPassword(newPassword);
                const newUser = Users.findOneAndUpdate({
                    _id: user_id
                }, {
                    password: encryptedPassword
                }, {
                    new: true
                })
                res.send(newUser);
            })
        } catch (e) {
            next(e)
        }
    }

}