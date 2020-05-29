var express = require('express');
var router = express.Router();

/* GET home page. */
// if the HTTP verb is GET and the full url path is /
// (which is the same as nothing after the domain)
// then use the included callback controller
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Library App' });
});

module.exports = router;
