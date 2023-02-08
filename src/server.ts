import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import { getEnvironmentVariables } from './environments/env';
import UserRouter from './routes/UserRouter';

export class Server{
    public app: express.Application = express();
    constructor(){
        this.setConfigurations();
        this.setRoutes();
        this.error404Handler();
        this.handleError();
    }

    setConfigurations(){
        this.connectMongoDb();
        this.configureBodyParser();
    }

    connectMongoDb(){
        const databaseUrl = getEnvironmentVariables().db_url
        mongoose.set('strictQuery', true).connect(databaseUrl)
        .then(()=> {
            console.log('mongodb is connected');
        });
    
    }

    configureBodyParser(){
        this.app.use(bodyParser.urlencoded({extended:true}))
    }

    setRoutes(){
        this.app.use('/api/user/', UserRouter)
    }

    error404Handler(){
        this.app.use((req, res) => {
            res.status(404).json({
                message: "Not Found",
                status_code: 404
            })
        })
    }

    handleError(){
        this.app.use((error, req, res, next)=> {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || "Something went wrong. Please try again.",
                status_code: errorStatus
            })
        })
    }
}