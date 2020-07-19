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

// get all books
router.get('/', (req, res) => {
    Book.find().then((books) => res.send(books)).catch((error) => {
        res.status(500).send("can't get the books");
    });
});

// get book by id
router.get('/:bookId', (req,res) => {
    Book.findById(req.params.bookId).then((book) => {
        if(book) res.send(book);
        res.status(404).send("not found");
    }).catch((error) => {
        res.status(404).send("not found");
    });
});

// update book by id
router.put('/:bookId', (req,res) => {
    Book.findByIdAndUpdate(req.params.bookId, {
        name     : req.body.bookName,
        author   : {
            name : req.body.authorName,
            age  : req.body.authorAge
        },
        genre    : req.body.bookGenre
    }, {new: true}).then((updatedBook) => {
        if(updatedBook) res.send(updatedBook);
        res.status(404).send("not found")
    }).catch((error) => {
        res.status(404).send("not found")
    });

//    const updatedBook = await Book.findByIdAndUpdate(req.params.bookId, {
//        name     : req.body.bookName,
//        author   : {
//            name : req.body.authorName,
//            age  : req.body.authorAge
//        },
//        genre    : req.body.bookGenre
//    }, {new: true});

//    if(!updatedBook) res.status(404).send("book not found");
//    res.send(updatedBook);
});

// delete book by id
router.delete('/:bookId', (req,res) => {
    Book.findByIdAndRemove(req.params.bookId).then((book) => {
        if(book) res.send(book);
        res.status(404).send("not found");
    }).catch((error) => {
        res.status(404).send("not found");
    });
});


module.exports = router;