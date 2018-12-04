
var express = require('express');
var router = express.Router();
// Chamando comando sql para fazer consultas no banco de dados
let db = require("../database/data").Users;
// Chamando arquivo que criptografa a senha
let pass = require("passport");

let conect = require("connect-ensure-login");

/* GET home page. */
router.get('/',conect.ensureLoggedOut('/'), function (req, res) {
    res.render('login');
});


router.post("/", pass.authenticate('local', {successRedirect: '/dashboard', failureRedirect: '/login'}) , (req, res) => {

});

module.exports = router;
