const mongoose = require('mongoose');
const author   = require("./authors");

// create book schema
const BookSchema = new mongoose.Schema({
    name:{
        type        : String,
        required    : true,
        minlength   : 3,
        maxlength   : 50
    },
    author: author.schema,
    genre:{
        type        : String,
        required    : true,
        minlength   : 3,
        maxlength   : 20
    }

});

module.exports = new mongoose.model('Book', BookSchema);