var express = require('express');
var router = express.Router();
let db = require("../database/data").Arduino;


router.get("/dashboard", (req,res) => {
    if(req.session.user){
      let usuario = req.session.user;

      console.log(usuario);

      
    }
});


 
router.get('/', function(req, res, next) {
  res.render('dashboard', { title: 'Bem vindo - Erick Silva' });
});

router.get('/ultimas', function(req, res, next){
    
});


router.get('/leituras', function (req, res, next) {

  db.selectArduino().then((resultados) => {

    var temp = [];
    var umi = [];
    var date = [];
    
    let somaTemp = 0;
    let somaUmi = 0;
    let mediaTemp = 0;

    for (var i = 0; i < resultados.length; i++) {
      temp.push(resultados[i].temperatura);
      umi.push(resultados[i].umidade);
      date.push(resultados[i].momento);
    }

    for(var i = 0; i < temp.length; i ++){
        somaTemp+= Number(temp[i]);
    }

    for(var u = 0; u < umi.length; u ++){
      somaUmi = Number(umi[u]);
    }
    
    mediaTemp = somaTemp / temp.length;
    mediaUmi = somaUmi / umi.length;


    res.json({
      temp: temp,
      umi: umi,
      mediaTemp: mediaTemp,
      mediaUmi: mediaUmi
    });


  }).catch(err => console.log(err));

});

module.exports = router;
