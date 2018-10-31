const express = require('express');

const router = express.Router();

let db = require("../database/date").Users;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cadastro', { title: 'Cadastre-se Vinecool' });
});

router.post("/", (req, res) => {
  var dados = req.body;

  /* res.json(dados); === Devolve um Json com o objeto que contem os conteudos do formulário de cadastro */

  
  db.getUser(dados)
    .then((resultados) => {
        if(resultados.length == 0)
        {
           return db.insertUser(dados);
        }
        else 
        {
           res.redirect('/login');  
        }
    })
    .then(() => {
       res.json({status : "Sucesso"});
    })
    .catch(err => console.log(err));

});

module.exports = router;
