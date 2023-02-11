import { rejects } from 'assert';
import * as Bcrypt from 'bcrypt';
import { resolve } from 'path';

export class Utils {

    public MAX_TOKEN_TIME = 60000;

    static generateVerificationToken(size: number = 5) {
        let digits = '0123456789';
        let otp = '';

        for (let i = 0; i < size; i++) {
            otp += digits[Math.floor(Math.random() * 10)]
        }

        return parseInt(otp)
    }

    static async encryptPassword(password: string) {
        return new Promise((resolve, reject) => {
            Bcrypt.hash(password, 10,async (err, hash) => {
                    if (err) {
                        reject();
                    } else {
                        console.log(hash)
                        return resolve(hash);
                    }
                
            });
        })
        
    }

    static async comparePassword(password:{plainPassword:string, encryptPassword:string}): Promise<any>{
        return new Promise(async (resolve, reject) => {
            Bcrypt.compare(password.plainPassword, password.encryptPassword, ((err, isSame)=> {
                if(err){
                    reject(err);
                }else if(!isSame){
                    reject(new Error('User and Password Does not match'));
                }else {
                    resolve(true);
                }
            }))
        })
    }

}