/* 
    BIBLIOTECAS DO NODE ADD ABAIXO
    E MODULO DE CONEXÃO COM O BANCO DE DADOS ADD ABAIXO
*/
const { Arduino } = require("../database/data");
const { Users } = require("../database/data");
const auth = require('connect-ensure-login');
const express = require('express');
const router = express.Router();



router.get('/', function (req, res, next) {
    res.render('alert', { title: 'Bem vindo - Erick Silva' });
});

router.get('/alertUser', auth.ensureLoggedIn("/login"), (req, res) => {

    let user = req.session.passport.user;

    let recebeTempMin = 0;
    let recebeUmiMin = 0;
    let recebeTempMax = 0;
    let recebeUmiMax = 0;

    let msgTempMin;
    let msgUmiMin;
    let msgTempMax;
    let msgUmiMax;

    Users.selectTemAdega(user.id)
        .then((resultadosAdega) => {

            Arduino.readUltTempUmiSensorCentro().then((resultadosSensorCentro) => {

                let tempMinUser = resultadosAdega[0].TempMinima;
                let tempMaxUser = resultadosAdega[0].TempMaxima;
                let umiMinUser = resultadosAdega[0].UmidadeMin;
                let umiMaxUser = resultadosAdega[0].UmidadeMax;

                

                let dadosTemp = [];
                let dadosUmi = [];
                

                for(i = tempMinUser; i < tempMaxUser; i++){
                    dadosTemp.push(i);
                }

                for(a = umiMinUser; a < umiMaxUser; a++){
                    dadosUmi.push(a);
                }

                let quartil = {
                    tempPq: parseInt(dadosTemp.length / 4),
                    tempTq: parseInt(dadosTemp.length * 0.75)-1,
                    umiPq: parseInt(dadosUmi.length / 4),
                    umiTq: parseInt(dadosUmi.length * 0.75)-1,
                }
                

                res.json({
                    alertMinTemp: dadosTemp[quartil.tempPq],
                    alertMaxTemp: dadosTemp[quartil.tempTq],
                    alertMinUmi: dadosUmi[quartil.umiPq],
                    alertMaxUmi: dadosUmi[quartil.umiTq]
                });
                
                

            });
        });


});


module.exports = router;