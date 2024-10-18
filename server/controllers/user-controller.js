const users = require('../db/models/users');
const {success_function, error_function} = require('../utils/response-handler');
const bcrypt = require('bcryptjs');
const fileUpload = require('../utils/file-upload').fileUpload;
const user_types = require('../db/models/user-types');
const { dataUpload } = require('../utils/file-upload');
const fs = require('fs');
const path = require('path');
const { stringify } = require('querystring');
const getServerDatabase = require('../utils/file-upload').getServerDatabase;

exports.getUsers = async function(req, res) {
    try {
        let allUsers = await users.find().populate("user_type");
        // console.log("allUsers : ",allUsers);
        let response = success_function({
            statusCode : 200,
            data : allUsers
        });
        res.status(response.statusCode).send(response);
        return;
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

exports.createUser = async function(req, res) {
    let body = req.body;
    // console.log("body : ",body);
    let name = body.name;
    let email = body.email;
    let age = body.age;
    // let user_type = body.user_type;

    try {
        let user_type_collection = await user_types.findOne({user_type : "Employee"});
        console.log("user_type_collection : ",user_type_collection);
        let user_type_id = user_type_collection._id;
        console.log("user_type_id : ",user_type_id);

        function generateRandomPassword(length) {
            let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            let password = "";
            
            for(var i = 0; i < length; i++) {
                var randomIndex = Math.floor(Math.random()*charset.length);
                password += charset.charAt(randomIndex);
            }
            return password;
        }

        var randomPassword = generateRandomPassword(12);
        console.log("random password : ",randomPassword);

        // let email_template = await email_Template(name, email, randomPassword);
        // await sendEmail(email, "password created", email_template);

        const salt = bcrypt.genSaltSync(10);
        let hashed_password = bcrypt.hashSync(randomPassword,salt);

        if(body.image) {
            let b64image = body.image;
            let image = await fileUpload(b64image, "users-img");
            console.log("image : ",image);

            body = {
                name,
                email,
                password : hashed_password,
                user_type : user_type_id,
                image,
                age,
            }
        }else{
            body = {
                name,
                email,
                password : hashed_password,
                user_type : user_type_id,
                age,
            }
        }
        console.log(body);

        let datas = await getServerDatabase();
        console.log("data : ",datas);

        let parsed_datas = JSON.parse(datas);
        console.log("parsed_datas : ",parsed_datas);

        let new_id = parsed_datas.length+1;
        console.log("new_id : ",new_id,typeof(new_id));

        body.id = new_id;
        console.log("body : ",body);

        parsed_datas.push(body);
        console.log("parsed_datas : ",parsed_datas);

        // let stringified_datas = JSON.stringify(parsed_datas);

        await dataUpload(parsed_datas, "datas");

        // await users.create(body);
        
        let response = success_function({
            statusCode : 200,
            message : "user added successfully"
        });
        res.status(response.statusCode).send(response);
        return;
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