const express               = require("express");
const router                = express.Router();
const {Book, validateBook}  = require("../models/books");

// create a new book
router.post('/', async (req,res) => {
    const error   = await validateBook(req.body);
    if(error.message) res.status(400).send(error.message);

    book            = new Book ({
        name    : req.body.bookName,
        author  : {
            name    : req.body.authorName,
            age     : req.body.authorAge
        },
        genre   : req.body.bookGenre
    });

    book.save().then(book => {
        res.send(book);
    }).catch((error) => {
        res.status(500).send("an error occured while storing book data");
    });
});

module.exports = router;