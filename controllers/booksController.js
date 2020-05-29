// WE'LL NEED THE MODELS IN ORDER TO COMMUNICATE WITH THE DB
// AND TO VALIDATE THE DATA
const Book = require('../models/bookModel');
const Author = require('../models/authorModel');

// WE'LL NEED TO EXPORT OUR CONTROLLERS IN ORDER FOR THE
// ROUTES TO SUCCESSFULLY DELIVER THE REQUESTS HERE
module.exports = {
    getAllBooks,
    getOneBook,
    getNewBookForm,
    createNewBook,
    deleteOneBook,
    getEditBookForm,
    updateOneBook
}

// WE'LL NEED CONTROLLERS TO HANDLE THE REQUEST, WHICH
// CAN INCLUDE USING MONGOOSE TO COMMUNICATE WITH THE DB ONLY,
// RENDERING A VIEW ONLY, OR RENDERING A VIEW TOGETHER
// WITH DATA FROM THE DB

// Define getAllBooks (our index route)
function getAllBooks(req, res) {
    Book.find({}, function(err, allBooksFromDb) {
        res.render('booksViews/index', { 
            allBookReferenceForEJS: allBooksFromDb,
            title: 'All Books'
        })
    })
}

// Define getOneBook (our show route)
function getOneBook(req, res) {
    Book.findById(req.params.bookId)
    .populate('author')
    .exec(function(err, foundBookFromDb) {
        console.log(foundBookFromDb)
        res.render('booksViews/show', {
            bookReferenceForEJS: foundBookFromDb,
            title: foundBookFromDb.title
        })
    })
}

// Define getNewBookForm (our new route)
function getNewBookForm(req, res) {
    Author.find({}, function(err, allAuthorsFromDb) {
        res.render('booksViews/new', {
            allAuthorsReferenceForEJS: allAuthorsFromDb,
            title: 'Create New Book'
        });
    })
}

// Define createNewBook (our create route)
function createNewBook(req, res) {
    Book.create(req.body, function(err, newBook) {
        res.redirect('/books');
    })
}

// Define deleteOneBook (our delete/destroy route)
function deleteOneBook(req, res) {
    Book.findByIdAndRemove(req.params.booksIdToDelete, function(err, deleteConfirmation) {
        res.redirect('/books');
    })
}

// Define getEditBookForm (our edit route)
function getEditBookForm(req, res) {
    Book.findById(req.params.booksIdForEditForm, function(err, bookToEditFromDb) {
        Author.find({}, function(err, allAuthorsFromDb) {
            res.render('booksViews/edit', {
                bookToEditReferenceForEJS: bookToEditFromDb,
                allAuthorsReferenceForEJS: allAuthorsFromDb,
                title: `Edit ${bookToEditFromDb.title}`
            })
        })
    })
}

// Define updateOneBook (our update route)
function updateOneBook(req, res) {
    Book.findByIdAndUpdate(req.params.booksIdToUpdate, req.body, {new: true}, function(err, updatedBookFromDb) {
        res.redirect(`/books/${updatedBookFromDb._id}`)
    })
}