const express = require('express');
const router = express.Router();
// WE NEED ACCESS TO THE CONTROLLERS IN ORDER TO DELIVER
// REQUESTS TO THEM
const authorsController = require('../controllers/authorsController');

// if the HTTP verb is GET and the request url is
// exactly /authors, use the getAllAuthors controller
router.get('/', authorsController.getAllAuthors);
// if the HTTP verb is GET and the request url is 
// exactly /authors/new, use the getNewAuthorForm controller
router.get('/new', isLoggedIn, authorsController.getNewAuthorForm);
// if the HTTP verb is GET and the request url starts
// with exactly /authors and follows with anything,
// save the url parameter value as req.params.authorId
// and use the getOneAuthor controller
router.get('/:authorId', isLoggedIn, authorsController.getOneAuthor);
// if the HTTP verb is POST and the request url is
// exactly /authors, use the createNewAuthor controller
router.post('/', isLoggedIn, authorsController.createNewAuthor);
// if the HTTP verb is DELETE and the request url starts 
// with exactly /authors and follows with anything,
// save the url parameter value as req.params.authorsIdToDelete
// and use the deleteOneAuthor controller
router.delete('/:authorsIdToDelete', isLoggedIn, authorsController.deleteOneAuthor);
// if the HTTP verb is GET and the request url starts
// with exactly /authors, follows with anything, and concludes
// with exactly /edit, save the url parameter value as
// req.params.authorsIdForEditForm and  use the
// getAllAuthors controller
router.get('/:authorsIdForEditForm/edit', isLoggedIn, authorsController.getEditAuthorForm);
// if the HTTP verb is PUT and the request url starts
// with exactly /authors and follows with anything,
// save the url parameter value as req.params.authorsIdToUpdate
// and use the updateOneAuthor controller
router.put('/:authorsIdToUpdate', isLoggedIn, authorsController.updateOneAuthor);


function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

// IN ORDER TO USE THESE ROUTES, WE MUST EXPORT THEM
module.exports = router;