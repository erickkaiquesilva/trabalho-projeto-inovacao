// executar os comandos (pelo git bash ou powershell):
// npm i serialport
// npm i tedious
// npm i events

// leitura dos dados do Arduino
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;

// Acesso ao banco de dados SQL Server
const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES; 

// prevenir problemas com muitos recebimentos de dados do Arduino
require('events').EventEmitter.defaultMaxListeners = 15;

// configurações de acesso ao banco de dados
const cfg = {
    "host": "grupo5.database.windows.net", // server name do banco de dados
    "user": "bandtec", // login ("bandtec")
    "pass": "Grupo0708", // senha do banco de dados
    "db": "grupo5" // nome da base de dados
};

// configurações da conexão com o banco de dados
const config = {
    server: cfg.host,
    userName: cfg.user,
    password: cfg.pass,
    options: {
        debug: {
            packet: true,
            data: true,
            payload: true,
            token: false,
            log: true
        },
        database: cfg.db,
        encrypt: true
    }
};

// Estrutura que vai receber os dados do Arduino 
// e enviar para o banco de dados
class LeitorArduino {
	
    iniciarEscuta() {
		
        SerialPort.list().then(entradasSeriais => {
            
            // este bloco trata a verificação de Arduino conectado (inicio)            
            
            var entradasSeriaisArduino = entradasSeriais.filter(entradaSerial => {
                return entradaSerial.vendorId == 2341 && entradaSerial.productId == 43;
            });
            
            if (entradasSeriaisArduino.length != 1){
                throw new Error("Nenhum Arduino está conectado ou porta USB sem comunicação ou mais de um Arduino conectado");
            }

            console.log("Arduino conectado na COM %s", entradasSeriaisArduino[0].comName);
             
            return  entradasSeriaisArduino[0].comName;

            // este bloco trata a verificação de Arduino conectado (fim)
                        
        }).then(arduinoCom => {
            
             // este bloco trata o recebimento dos dados do Arduino (inicio)
                        
            // o baudRate deve ser igual ao valor em
            // Serial.begin(xxx) do Arduino (ex: 9600 ou 115200)
            var arduino = new SerialPort(arduinoCom, {baudRate: 115200});
            
            const parser = new Readline();
            arduino.pipe(parser);
            
            try {
				conectarBanco();
			} catch (e) {
				throw e;
				return;
			}
            
            console.error('Iniciando escuta do Arduino');
            
            // Tudo dentro desse parser.on(... 
            // é invocado toda vez que chegarem dados novos do Arduino
            parser.on('data', (dados) => {
				console.error(`Recebeu novos dados do Arduino: ${dados}`);
				try {
					// O Arduino deve enviar a temperatura e umidade de uma vez,
					// separadas por ":" (temperatura : umidade)
					const leitura = dados.split(':'); 
					registrarLeitura(Number(leitura[0]), Number(leitura[1]));		
				} catch (e) {
					throw new Error(`Erro ao tratar os dados recebidos do Arduino: ${e}`);
				}

				// este bloco trata o recebimento dos dados do Arduino (fim)
            });
            
        }).catch(error => console.error(`Erro ao receber dados do Arduino ${error}`));
    } 
}

// função que recebe valores de temperatura e umidade 
// e faz um insert no banco de dados
function registrarLeitura(temperatura, umidade) {

	console.log(`temperatura: ${temperatura}`);
	console.log(`umidade: ${umidade}`);
	
	request = new Request(`
	INSERT into leitura (temperatura, umidade, momento) 
	values (@temperatura, @umidade, CURRENT_TIMESTAMP);
	`, function(err, linhas) {  
		 if (err) {  
			console.error(`Erro ao tentar gravar no banco: ${err} `);
		 }  else {
			console.log(`Registro salvo com sucesso. Linhas afetadas: ${linhas}`);
		 } 
		});  
		
	request.addParameter('temperatura', TYPES.Decimal, temperatura);  
	request.addParameter('umidade', TYPES.Decimal , umidade);  
	
	connection.execSql(request);
	
}

// função que solicita a conexão com o banco
function conectarBanco() {
	connection.on('connect', function (err) {
		if (err) { 
			throw new Error(`Erro ao conectar com o banco: ${err}`);
		} else {
			console.log('Conectado ao banco de dados!');
		}
	});
}

// constante de conexão com o banco de dados
const connection = new Connection(config);

// constante de leitura de dados do arduino
const leitor = new LeitorArduino();

// iniciando a "escuta" de dispositivos Arduino
leitor.iniciarEscuta();
