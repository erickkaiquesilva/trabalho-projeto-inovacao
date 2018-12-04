const express = require('express');
const router = express.Router();

const auth = require('connect-ensure-login');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('faq', {title: 'TESTE'});
});

module.exports = router;
