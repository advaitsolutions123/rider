import { Router } from "express";
import { UserController } from "../controllers/UserController";
import {body} from 'express-validator';
import { UserValidators } from "../validator/UserValidators";
import { GlobalMiddleware } from "../middlewares/CheckError";

export class UserRouter{
    public router: Router;
    constructor(){
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }

    getRoutes(){
        this.router.get('/send/verification/email', GlobalMiddleware.authenticate, UserController.resendVerificationEmail);
        this.router.get('/login', UserValidators.login(), GlobalMiddleware.checkError, UserController.login)
        // this.router.patch('/forgot-password', UserValidators.forgotPassword(), )
        
    }

    postRoutes(){
        this.router.post('/login', UserValidators.login(), UserController.login)
        this.router.post('/signup', UserValidators.signUp(), GlobalMiddleware.checkError , UserController.signUp)
    }

    patchRoutes(){
        this.router.patch('/verify', UserValidators.verifyUser(), GlobalMiddleware.checkError, GlobalMiddleware.authenticate  ,UserController.verify);
        this.router.patch('/update/password', UserValidators.updatePassword(), GlobalMiddleware.checkError, GlobalMiddleware.authenticate, UserController.updatePassword)
    }   
    
    deleteRoutes(){

    }

}

export default new UserRouter().router;