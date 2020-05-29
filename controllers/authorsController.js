// WE'LL NEED THE MODELS IN ORDER TO COMMUNICATE WITH THE DB
// AND TO VALIDATE THE DATA
const Author = require('../models/authorModel');
const Book = require('../models/bookModel');

// WE'LL NEED TO EXPORT OUR CONTROLLERS IN ORDER FOR THE
// ROUTES TO SUCCESSFULLY DELIVER THE REQUESTS HERE
module.exports = {
    getAllAuthors,
    getOneAuthor,
    getNewAuthorForm,
    createNewAuthor,
    deleteOneAuthor,
    getEditAuthorForm,
    updateOneAuthor
}

// WE'LL NEED CONTROLLERS TO HANDLE THE REQUEST, WHICH
// CAN INCLUDE USING MONGOOSE TO COMMUNICATE WITH THE DB ONLY,
// RENDERING A VIEW ONLY, OR RENDERING A VIEW TOGETHER
// WITH DATA FROM THE DB

// Define getAllAuthors (our index route)
function getAllAuthors(req, res) {
    Author.find({}, function(err, allAuthorsFromDb) {
        res.render('authorsViews/index', { 
            allAuthorsReferenceForEJS: allAuthorsFromDb,
            title: 'All Authors'
        })
    })
}

// Define getOneAuthor (our show route)
function getOneAuthor(req, res) {
    Author.findById(req.params.authorId, function(err, foundAuthorFromDb) {
        Book.find({author: foundAuthorFromDb._id}, function(err, allBooksByFoundAuthorFromDb) {
            res.render('authorsViews/show', {
                authorReferenceForEJS: foundAuthorFromDb,
                authorsBooksReferenceForEJS: allBooksByFoundAuthorFromDb,
                title: foundAuthorFromDb.name
            })
        })
    })
}

// Define getNewAuthorForm (our new route)
function getNewAuthorForm(req, res) {
    res.render('authorsViews/new', {
        title: 'Create New Author'
    });
}

// Define createNewAuthor (our create route)
function createNewAuthor(req, res) {
    Author.create(req.body, function(err, newAuthor) {
        res.redirect('/authors');
    })
}

// Define deleteOneAuthor (our delete/destroy route)
function deleteOneAuthor(req, res) {
    Author.findByIdAndRemove(req.params.authorsIdToDelete, function(err, deleteAuthorConfirmation) {
        Book.deleteMany({author: req.params.authorsIdToDelete}, function(err, deleteBooksConfirmation) {
            res.redirect('/authors');
        })
    })
}

// Define getEditAuthorForm (our edit route)
function getEditAuthorForm(req, res) {
    Author.findById(req.params.authorsIdForEditForm, function(err, authorToEditFromDb) {
        res.render('authorsViews/edit', {
            authorToEditReferenceForEJS: authorToEditFromDb,
            title: `Edit ${authorToEditFromDb.name}`
        })
    })
}

// Define updateOneAuthor (our update route)
function updateOneAuthor(req, res) {
    Author.findByIdAndUpdate(req.params.authorsIdToUpdate, req.body, {new: true}, function(err, updatedAuthorFromDb) {
        res.redirect(`/authors/${updatedAuthorFromDb._id}`)
    })
}