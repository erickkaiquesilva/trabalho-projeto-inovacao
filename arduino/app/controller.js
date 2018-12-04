const express = require('express');
const { ArduinoData } = require('./serial');
const router = express.Router();
const db = require('./db').Arduino;


setInterval(() => {
    // aqui faz o comando para inserir no banco;
    //console.log(ArduinoData);

    let tempSensorInferior = ArduinoData.tempData[ArduinoData.tempData.length - 1] - 17 + Math.floor(Math.random() * 7);
    let umiSensorInferior = ArduinoData.umiData[ArduinoData.umiData.length - 1] + 10 + Math.floor(Math.random() * 7);

    let tempSensorCentro = ArduinoData.tempData[ArduinoData.tempData.length - 1] - 10 + Math.floor(Math.random() * 3);
    let umiSensorCentro = ArduinoData.umiData[ArduinoData.umiData.length - 1] + 12 + Math.floor(Math.random() * 15);

    let tempSensorSuperior = ArduinoData.tempData[ArduinoData.tempData.length - 1] - 15 + Math.floor(Math.random() * 15);
    let umiSensorSuperior = ArduinoData.umiData[ArduinoData.umiData.length - 1] + Math.floor(Math.random() * 15);

    
 
    db.insertSensorSuperior({temp: tempSensorSuperior, umi: umiSensorSuperior}).then(() => {
        db.insertSensorCentro({temp: tempSensorCentro, umi: umiSensorCentro}).then(() => {
            db.insertSensorInferior({temp: tempSensorInferior, umi: umiSensorInferior});
        });    
    });
    
}, 500);

router.get('/', (request, response, next) => {
    db.getAllMeasurement()
        .then(results => response.json(results))
        .catch(err => response.json(err));
});

module.exports = router;