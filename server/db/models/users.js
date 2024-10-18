const mongoose = require('mongoose');

let usersSchema = new mongoose.Schema({
    id : {
        type : String,
    },
    name : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    age : {
        type : Number
    },
    user_type : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user_types"
    }
});

module.exports = mongoose.model("users",usersSchema);