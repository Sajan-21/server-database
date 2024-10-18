'use strict';
const user_types = require('../../db/models/user-types');
const mongoose = require('mongoose');


module.exports = {
  up: (models, mongoose) => {
      return models.user_types.insertMany([
        {
          _id : "6712646c2152af16cb20acbf",
          user_type : "Admin"
        },
        {
          _id : "671264852152af16cb20acc0",
          user_type : "Employee"
        }
      ]).then(res => {
      // Prints "1"
      console.log(res.insertedCount);
    });
  },

  down: (models, mongoose) => {
      return models.user_types.deleteMany({
        $in : {
          id : [
            "6712646c2152af16cb20acbf",
            "671264852152af16cb20acc0"
          ]
        }
      }).then(res => {
      // Prints "1"
      console.log(res.deletedCount);
      });
  }
};
