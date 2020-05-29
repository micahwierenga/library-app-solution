const express = require('express');
const router = express.Router();
// WE NEED ACCESS TO THE CONTROLLERS IN ORDER TO DELIVER
// REQUESTS TO THEM
const booksController = require('../controllers/booksController');

// if the HTTP verb is GET and the request url is
// exactly /books, use the getAllBooks controller
router.get('/', booksController.getAllBooks);
// if the HTTP verb is GET and the request url is 
// exactly /books/new, use the getNewBookForm controller
router.get('/new', isLoggedIn, booksController.getNewBookForm);
// if the HTTP verb is GET and the request url starts
// with exactly /books and follows with anything,
// save the url parameter value as req.params.bookId
// and use the getOneBook controller
router.get('/:bookId', isLoggedIn, booksController.getOneBook);
// if the HTTP verb is POST and the request url is
// exactly /books, use the createNewBook controller
router.post('/', isLoggedIn, booksController.createNewBook);
// if the HTTP verb is DELETE and the request url starts 
// with exactly /books and follows with anything,
// save the url parameter value as req.params.booksIdToDelete
// and use the deleteOneBook controller
router.delete('/:booksIdToDelete', isLoggedIn, booksController.deleteOneBook);
// if the HTTP verb is GET and the request url starts
// with exactly /books, follows with anything, and concludes
// with exactly /edit, save the url parameter value as
// req.params.booksIdForEditForm and  use the
// getAllBooks controller
router.get('/:booksIdForEditForm/edit', isLoggedIn, booksController.getEditBookForm);
// if the HTTP verb is PUT and the request url starts
// with exactly /books and follows with anything,
// save the url parameter value as req.params.booksIdToUpdate
// and use the updateOneBook controller
router.put('/:booksIdToUpdate', isLoggedIn, booksController.updateOneBook);


function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

// IN ORDER TO USE THESE ROUTES, WE MUST EXPORT THEM
module.exports = router;