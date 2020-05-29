var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET users listing. */
// if the HTTP verb is GET and the full url path is /users/
// (which is the same as /users after the domain)
// then use the included callback controller
router.get('/auth/google',
    passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  })
);

router.get('/oauth2callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/'
  })
);

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
