const express = require('express');
const router = express.Router();

const auth = require('connect-ensure-login');

/* GET home page. */
router.get('/', auth.ensureLoggedOut('/login'), function(req, res, next) {
  res.render('index',{title:'teste'});
});

module.exports = router;
