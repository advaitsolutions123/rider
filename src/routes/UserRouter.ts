import { Router } from "express";
import { UserController } from "../controllers/UserController";
import {body} from 'express-validator';
import { UserValidators } from "../validator/UserValidators";

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
        this.router.post('/login', UserValidators.login(), UserController.login)
    }

    postRoutes(){

    }

    patchRoutes(){

    }   
    
    deleteRoutes(){

    }

}

export default new UserRouter().router;