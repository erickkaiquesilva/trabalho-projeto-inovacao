var express = require('express');
var router = express.Router();
// Chamando o arquivos que contem os sqls
let db = require("../database/data").Users;
// Chamando o arquivo que faz a criptográfia da senha
let crypto = require('../Encrypt/encrypt').Encrypto;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('singin', { title: 'Vinecool' });
});


router.post("/", (req, res) => {
  // Váriavel que esta pegando todo os dados contido no formulário
  var dados = req.body; 

  //res.json(req.body);

  //console.log(dados);

  db.getUser(dados)
    .then((resultados) => {
        if(resultados.length == 0)
        {
          // Passo para o artquivo que exportei o meu campo password para assim poder cripitografar a senha do usuário
          dados.senha = crypto.EncryptoPassword(dados.senha);
          // Enviando os dados do usuário para que foi preenchido para o formulário e passando para o comando SQL
          // Que esta feito na pasta database, no arquivo data        
          return db.insertUser(dados);

          console.log(dados);
        }
        else 
        {
           // Caso o usuário ja exista redireciona ele para a página de login.
           res.redirect('/login');  
        }
    })
    .then(() => {
       //res.json({status : "Sucesso"});
       // Caso seja cadastrado o usuário é redirecionado para a página inicial que seria a dashboard
       res.redirect('/dashboard');
    })
    .catch(err => console.log(err));

});

module.exports = router;