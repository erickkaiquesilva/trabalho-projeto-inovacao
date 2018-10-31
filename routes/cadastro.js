const express = require('express');

const router = express.Router();

let db = require("../database/date").Users;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cadastro', { title: 'Cadastre-se Vinecool' });
});

router.post("/", (req, res) => {
  var dados = req.body;

  console.log(dados);
  


});

module.exports = router;
