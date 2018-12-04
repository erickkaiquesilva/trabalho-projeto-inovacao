/*
    Este Arquivo é responsavel pelo controle de todas as informações que serão exibidas na dashboard
    É responsavel por roda os SQL'S prontos, e quais quer atualizações no recebimento de dados
    deve ser alterado aqui.

    CONSTANTES PADRÕES QUE SERÃO UTILIZADAS.

    db = ira receber um require do SQL e da Conexão com o bando de dados, que esta contida dentro da pasta
    database dentro do arquvio data.js nesta constante db eu estou no require chamando do arquivo data apenas 
    modulo export .Arduino, para entender melhor abra o arquivo e veja dentro dele um MODULO EXPORT ARDUINO.

    express, router = São Bibliotecas do node.js

    CRIADA POR: @ERICKSILVA
*/
const { Arduino } = require("../database/data");

const express = require('express');
const router = express.Router();

/*
    Abaixo uma rota chamada leitura ira tratar de receber as leituras atuais do danco de dados
*/
router.get("/leituraSensorSuperior", (req, res) => {
    /*
        Com o db.selectArduino eu estou fazendo um select padrão dentro do banco de dados e trazendo as informações
        que desejo adquirir do banco.

        OBS: Para entender esse select melhor veja dentro do arquvo data.js

        O then ele retorna um array dos dados que o select executado, e traz as informações dentro deste Array
    */

    Arduino.selectSensorSuperior().then((resultados) => {
        console.log(resultados);
        /* 
            Abaixo eu irei estou criando 3 arrays um que ira ter as temperaturas, outro que ira conter as umidades e outro que ira conter os momentos
            que as temperaturas e umidades são obtidas.
        */

        let tempSensorSuperior = [];
        let umiSensorSuperior = [];

        /*
            Abaixo eu inicio uma estrutura de repetição com o for, dentro deste for eu crio uma váravel contador, que ira rodar
            enquato seu número for menor que o tamanho do array resultados, que esta recebendo as informações do select feito no banco

            Enquanto o loop vai rodando eu irei acessar dentro do array resultados a posição em que o contador esta e dentro desta posição
            existe um objeto e dentro deste objeto existe um indice com o nome temperatura.
        */

        for (var contador = 0; contador < resultados.length; contador++) {
            tempSensorSuperior.push(resultados[contador].Temperatura);
            umiSensorSuperior.push(resultados[contador].Umidade);
        }

        /*
            Abaixo eu irei criar uma váriavel que pega a ultima ocorrencia dentro do array, seja ele tempSensor1 ou outro definido acima
            para eu enviar esta ultima informação diretamente para a dashboard, mostrando a ultima informação que o sensor coletou.
        */


        let tSensorSuperior = tempSensorSuperior.length;

        res.json({
            tempSensorSuperior: tempSensorSuperior
        });

    }).catch(err => console.log(err));
});

router.get("/ultimosDados", (req, res) => {

    Arduino.readUltTempSensorSuperior()

        .then((resultadosSensorSuperior) => {

            Arduino.readUltTempUmiSensorCentro()

                .then((resultadosSensorCentro) => {

                    Arduino.readUltTempSensorInferior().then((resultadosSensorInferior) => {

                        res.json({
                            ultTempSuperior: resultadosSensorSuperior[0].UltTempSensorSuperior,
                            ultTempCentro: resultadosSensorCentro[0].UltTempSensorCentro,
                            ultUmiCentro: resultadosSensorCentro[0].UltUmiSensorCentro,
                            ultTempInferior: resultadosSensorInferior[0].UltTempSensorInferior
                        });

                    });

                });

        }).catch(err => console.log(err));

});

/*
    Abaixo uma rota chamada leitura ira tratar de receber as leituras atuais do danco de dados
*/
router.get("/leituraSensorCentro", (req, res) => {
    /*
        Com o db.selectArduino eu estou fazendo um select padrão dentro do banco de dados e trazendo as informações
        que desejo adquirir do banco.

        OBS: Para entender esse select melhor veja dentro do arquvo data.js

        O then ele retorna um array dos dados que o select executado, e traz as informações dentro deste Array
    */

    Arduino.selectSensorSuperior().then((resultados) => {
        
        /* 
            Abaixo eu irei estou criando 3 arrays um que ira ter as temperaturas, outro que ira conter as umidades e outro que ira conter os momentos
            que as temperaturas e umidades são obtidas.
        */

        let tempSensorCentro = [];
        let umiSensorCentro = [];

        /*
            Abaixo eu inicio uma estrutura de repetição com o for, dentro deste for eu crio uma váravel contador, que ira rodar
            enquato seu número for menor que o tamanho do array resultados, que esta recebendo as informações do select feito no banco

            Enquanto o loop vai rodando eu irei acessar dentro do array resultados a posição em que o contador esta e dentro desta posição
            existe um objeto e dentro deste objeto existe um indice com o nome temperatura.
        */

        for (var contador = 0; contador < resultados.length; contador++) {
            tempSensorCentro.push(resultados[contador].Temperatura);
            umiSensorCentro.push(resultados[contador].Umidade);
        }
        
        
        

        res.json({
            tempSensorCentro: tempSensorCentro,
            umiSensorCentro: umiSensorCentro
        });

    }).catch(err => console.log(err));
});

/*
    Abaixo uma rota chamada leitura ira tratar de receber as leituras atuais do danco de dados
*/
router.get("/leituraSensorInferior", (req, res) => {
    /*
        Com o Arduino.selectArduino eu estou fazendo um select padrão dentro do banco de dados e trazendo as informações
        que desejo adquirir do banco.

        OBS: Para entender esse select melhor veja dentro do arquvo data.js

        O then ele retorna um array dos dados que o select executado, e traz as informações dentro deste Array
    */

    Arduino.selectSensorInferior().then((resultados) => {

        /* 
            Abaixo eu irei estou criando 3 arrays um que ira ter as temperaturas, outro que ira conter as umidades e outro que ira conter os momentos
            que as temperaturas e umidades são obtidas.
        */

        let tempSensorInferior = [];
        let umiSensorInferior = [];

        /*
            Abaixo eu inicio uma estrutura de repetição com o for, dentro deste for eu crio uma váravel contador, que ira rodar
            enquato seu número for menor que o tamanho do array resultados, que esta recebendo as informações do select feito no banco

            Enquanto o loop vai rodando eu irei acessar dentro do array resultados a posição em que o contador esta e dentro desta posição
            existe um objeto e dentro deste objeto existe um indice com o nome temperatura.
        */

        for (var contador = 0; contador < resultados.length; contador++) {
            tempSensorInferior.push(resultados[contador].Temperatura);
            umiSensorInferior.push(resultados[contador].Umidade);
        }

        res.json({
            tempSensorInferior: tempSensorInferior
        });

    }).catch(err => console.log(err));
});

router.get('/ultimasMedicoes', (req, res) => {
    /*
        Retornando a ultima temperatura lida
    */

    Arduino.selectUltimaTempSuperior().then((ultTempSupeior) => {

        res.json({ ultTempSupeior: ultTempSupeior });

    }).then(() => {
        Arduino.selectUltimaTemprCentro().then((ultTempCentro) => {
            res.json({ ultTempCentro: ultTempCentro })
        }).then(() => {
            Arduino.selectUltimaUmiCentro().then((ultUmiCentro) => {

                console.log(ultUmiCentro);
            }).then(() => {
                Arduino.selectUltimaTempInferior().then((ultTempInferior) => {

                    console.log(ultTempInferior);
                })
            });
        });
    }).catch(err => console.log(err));

});


/*
    Abaixo uma rota chamada media, ela ira ser responsavel por toda a media de aquisição de dados do banco.
*/
router.get("/apontaMedia", (req, res) => {
    /*
        Abaixo iremos fazer os apontado
    */
    Arduino.readMediaTemp().then((resultadoMeidaTemp) => {

        Arduino.readMediaUmi().
            then((resultadosMeidaUmi) => {

                res.json({
                    mediaTemp: resultadoMeidaTemp[0].MediaTemp.toFixed(2),
                    mediaUmi: resultadosMeidaUmi[0].MediaUmi.toFixed(2)
                });

            }).catch(err => console.log(err));

    }).catch(err => console.log(err));

});

router.get("/alert", (req, res) => {

    

});

router.get("/Quartil", (req, res) => {
    /*
        
    */
    Arduino.readPrimeiroQuartilTemp()
        .then((pQuartilTemp) => {

            Arduino.readTerceiroQuartilTemp().
                then((tQuartilTemp) => {

                    Arduino.readPrimeiroQuartilUmi().
                        then((pQuartilUmi) => {

                            Arduino.readTerceiroQuartilUmi().
                                then((tQuartilUmi) => {
                                    res.json({
                                        pQuartilTemp: pQuartilTemp[0].PrimeiroQuartilTemp,
                                        tQuartilTemp: tQuartilTemp[0].TerceiroQuartilTemp,
                                        pQuartilUmi: pQuartilUmi[0].PrimeiroQuartilUmi,
                                        tQuartilUmi: tQuartilUmi[0].TerceiroQuartilUmi
                                    });
                                }).catch(err => console.log(err));

                        }).catch(err => console.log(err));

                }).catch(err => console.log(err));

        }).catch(err => console.log(err));

});

router.get("/Semana", (req, res) => {
    /*
        
    */

    let dados = [];

    Arduino.readSemanal().then((dadosSemanal) => {

        for (i = 0; i < dadosSemanal.length; i++) {

            dados.push(dadosSemanal[i].umidade);

        }
    }).then(() => {

        function separa(dados, separacao) {

            var novo = [];

            for (var i = 0; i < dados.length; i = i + (separacao - 1)) {
                novo.push(dados.slice(i, (i + separacao)));
            }
            novo[novo.length - 1].push(dados[0]);

            return novo;

        }

        let novoArrayDadosSemana = separa(dados, 25);

        res.json({
            dayOne: novoArrayDadosSemana[0],
            dayTwo: novoArrayDadosSemana[1],
            dayThree: novoArrayDadosSemana[3],
            dayFor: novoArrayDadosSemana[4],
            dayFive: novoArrayDadosSemana[5]
        });
        

    }).catch(err => console.log(err));

});







module.exports = router;