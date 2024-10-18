const mongoose = require('mongoose');

let user_typesSchema = new mongoose.Schema({
    user_type : {
        type : String
    }
});

module.exports = mongoose.model('user_types',user_typesSchema);