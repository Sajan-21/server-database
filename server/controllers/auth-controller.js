const { error_function, success_function } = require("../utils/response-handler");
const users = require('../db/models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.login = async function(req, res) {
    let body = req.body;
    // console.log("body : ",body);
    let email = body.email;
    // console.log("email : ",email);
    let password = body.password;
    // console.log("password : ",password);
    try {
        let user = await users.findOne({email}).populate("user_type");
        if(user){
            let db_password = user.password;
            let compare_password = bcrypt.compareSync(password, db_password);
            if(compare_password){
                let token = jwt.sign({user_id : user.id},process.env.PRIVATE_KEY, {expiresIn : "10d"});
                let response = success_function({
                    statusCode : 200,
                    message : "login successful. Welcome to UMS application",
                    data : {
                        token,
                        _id : user._id,
                        user_type : user.user_type.user_type
                    }
                });
                res.status(response.statusCode).send(response);
                return;
            }else{
                let response = error_function({
                    statusCode : 400,
                    message : "password isn't matching try again!"
                });
                res.status(response.statusCode).send(response);
                return;
            }
        }else{
            let response = error_function({
                statusCode : 400,
                message : "user not found!"
            });
            res.status(response.statusCode).send(response);
            return;
        }
    } catch (error) {
        console.log("error : ",error);
        let response = error_function({
            statusCode : 400,
            message : error.message ? error.message : "something went wrong"
        });
        res.status(response.statusCode).send(response);
        return;
    }
}