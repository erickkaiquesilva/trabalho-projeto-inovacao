var express = require('express');
var router = express.Router();
// Chamando o arquivos que contem os sqls para cadastro no banco de dados 
let db = require("../database/data").Users;
// Chamando o arquivo que faz a criptográfia da senha
let crypto = require('../Encrypt/encrypt').Encrypto;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('singin', { title: 'Vinecool' });
});

// Este router ela pega via post as informações 
router.post("/", (req, res) => {
  // Váriavel que esta pegando todo os dados contido no formulário
  var dados = req.body;

  //res.json(req.body);

  console.log(dados);


  /*
     Nesta parte estou chamando um SQL getUser que esta contido na pasta database no arquivo data.js
     como parametro eu envio um Objeto com o nome de dados, neste objeto é contido o retorno dos resultados
     do formulário de cadastro.
  */
  db.getUser(dados)
    .then((resultados) => {
      /*
        O then seria mais o menos a lógica de um IF, ele porem ira insistir para executar tudo o que contem dentro dele

        Neste then estou recebendo os resultados do select que foi feito no banco de dados, com isso eu fiz um IF que diz
        que no array resultados no tamanho dele caso exista um número == 0 que em termos curtos seria dizer que não retornou
        nenhum resultados eu farei os seguintes passos.

        na posição do objeto dados irei acessar dados.senha que seria pegar a senha que usuário digitou e irei enviar 
        para o arquivo crypto que busquei em um require, ele é uma LET, verificando no inicio do documento vc ira ver todos os requires
        e vera que essa LET crypto esta recebendo um require. Então com a crypto eu chamo uma Função EncryptoPassword e mando como parametro
        minha senha. Nisso ela esta sendo criptografada

        logo depois eu dou um Insert no banco de dados passando todo meu objeto que contem todas as informações do meu formulário de cadastro
      */
      if (resultados.length == 0) {
        // Passo para o artquivo que exportei o meu campo password para assim poder cripitografar a senha do usuário
        dados.senha = crypto.EncryptoPassword(dados.senha);
        // Enviando os dados do usuário para que foi preenchido para o formulário e passando para o comando SQL
        // Que esta feito na pasta database, no arquivo data 

        console.log(dados);


        return db.insertUser(dados);

        // Passo chamo no console para ver se realmente esta chegando as informações, estou debugando o código para ver seu funcionamento
        //console.log(dados);
      }
      else {
        /*
           Porem caso o select feito no banco de dados seja diferente de 0, então eu redireciono o usuário para a página de login.
           pois isso me indica que o usuário que esta tentandos ser cadastrado, ja existe
        */
        res.redirect('/login');
      }
    })
    .then(() => {
      /*
        Este then ele tem a função de quando o usuário for cadastrado e inserido no banco de dados, ja sera redirecionado para 
        sua página de dashboard para ver as informações da suas Adegas
      */
      //res.json({status : "Sucesso"});
      // Caso seja cadastrado o usuário é redirecionado para a página inicial que seria a dashboard
      res.redirect('/singinAdega');
    }) // Neste caso aqui, caso o primeiro Then falhe ele ira dizer o erro pelo qual ele esta falhando, apresentando no node.
    .catch(err => console.log(err));

});

module.exports = router;