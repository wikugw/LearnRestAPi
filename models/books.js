const mongoose  = require('mongoose');
const author    = require("./authors");
const yup       = require("yup");

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

const validateBook  = book => {
    const schema    = yup.object().shape({
        bookName    : yup.string().required().min(3).max(50),
        authorName  : yup.string().required().min(3).max(40),
        authorAge   : yup.number().required().min(10, 'author\'s age must be greater than 10' ).max(100),
        bookGenre   : yup.string().required().min(3).max(20)
    });

    return schema.validate(book).then((book) => book).catch((error) => {
        return {
            message : error.message
        }
    });
}

exports.Book            = new mongoose.model('Book', BookSchema);
exports.validateBook    = validateBook;