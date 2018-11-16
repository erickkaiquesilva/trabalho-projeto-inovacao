var express = require('express');
var router = express.Router();
// Chamando comando sql para fazer consultas no banco de dados
let db = require("../database/data").Users;
// Chamando arquivo que criptografa a senha
let crypto = require('../Encrypt/encrypt').Encrypto;

/* GET home page. */
router.get('/', function (req, res) {
  // verificando se o usuário esta logado
  if(req.session.user){
    // Caso exista ja uma sessão para o usuário, redirecione ele para a página inicial do site
    // enquanto estiver logado
    res.redirect("/");
  }
  else
  {
    // caso não existir um usuário logado
    // redireciono ele para a página de login
    res.render('login');
  }
});


router.post("/", (req, res) => {
  var dadosUser = req.body;

  //res.json(dadosUser);

  db.getUser(dadosUser)
    .then((resultados) => {
      if (resultados.length == 0) {
        res.redirect('/singin');
      }
      else {
        let result;

        result = resultados[0];

        let isEqual = crypto.ComparePassword(result.senha, req.body.senha);
        
        console.log(req.body);

        if (!isEqual) {
          res.json("Não");
          console.log("kdkdkdk");
        }
        else {
          console.log("skdskdskdjskd");

          // Se for igual
          // na sessão atual do servidor, crio uma váriavel e passo as informações do usuario
          
          req.session.user = {id: result.id, nome: result.nome, email: result.email};
          
          //console.log(req.session.user);
          res.redirect("/dashboard");

        }
      }
    })
    .catch(err => console.log(err));


});

module.exports = router;
