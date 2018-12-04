const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;

class ArduinoDataRead {

    constructor(){
        this.listDataTemperatura = [];
        this.listDataUmidade = [];
    }

    SetConnection(){

        SerialPort.list().then(listSerialDevices => {
            
            let listArduinoSerial = listSerialDevices.filter(serialDevice => {
                return serialDevice.vendorId == 2341 && serialDevice.productId == 43;
            });
            console.log(listArduinoSerial.length);
            
            
            if (listArduinoSerial.length != 1){
                throw new Error("The Arduino was not connected or has many boards connceted");
            }

            console.log("Arduino found in the com %s", listArduinoSerial[0].comName);
             
            return  listArduinoSerial[0].comName;
            
        }).then(arduinoCom => {
            
            let arduino = new SerialPort(arduinoCom, {baudRate: 115200});
            
            const parser = new Readline();
            arduino.pipe(parser);
            
            parser.on('data', (data) => {
                /*
                    Aqui você tem que ver como está mandando a informação la no arduino.
                    Eu mando a temperatura, umidade
                    Assim: 27;70
                    E quebro ele usando o split, criando um array
                    [27, 70]
                    E adiciono esse valor nos array
                    listDataTemperatura e listDataUmidade
                */
                const leitura = data.split(':');
                this.listDataTemperatura.push(parseFloat(leitura[0]));
                this.listDataUmidade.push(parseFloat(leitura[1]));
            });
            
        }).catch(error => console.log(error));
    } 
}

const serial = new ArduinoDataRead();
serial.SetConnection();

module.exports.ArduinoData = {tempData: serial.listDataTemperatura, umiData: serial.listDataUmidade} 