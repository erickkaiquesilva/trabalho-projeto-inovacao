let database = require("mssql");
let config = {
    user: "bandtec",
    password: "Grupo0708",
    server: "grupo5.database.windows.net",
    database: "grupo5",
    options: {
        encrypt: true
    }
}

let g = false;

function SQLQuery(queryLine) {
    if (g) {
        return global.conn.request().
            query(queryLine).then(results => {
                return results.recordset;
            }).catch(err => console.log(err, 323232))
    }
    else {
        return database.connect(config)
            .then(conn => {
                global.conn = conn;
                g = true;
                return global.conn.request().query(queryLine);
            })
            .then(results => {
                return results.recordset;
            })
            .catch(err => console.log(err, 232932));
    }
}

module.exports.Users = {
    insertUser: (user) => {
        return SQLQuery(`insert into usuario(nome, email, senha) values ('${user.nome}','${user.usuario}','${user.senha}')`);
    },
    getUser: (user) => {
        return SQLQuery(`select * from usuario where usuario.email = '${user.usuario}'`);
    },
    getLogin: (user) => {
        return SQLQuery(`select * from usuario where usuario.email = '${user.usuario}' and usuario.senha = ${user.senha}`);
    },
    getUserId: (id) => {
        return SQLQuery(`select * from usuario where usuario.idusuario = '${id}'`);
    },
    selectTemAdega: (idUser) => {
        console.log(idUser);

        return SQLQuery(`select * from usuario as u join adega as a on u.idusuario = a.idusuario and u.idusuario = ${idUser}`);
    }
}

module.exports.Adega = {

    insertAdega: (user, idUser) => {
        return SQLQuery(`insert into adega(idadega,umidademax,umidademin,tempmaxima,tempminima,idusuario ) values('${user.idAdega}', '${user.umiminima}','${user.umimaxima}','${user.tempminima}','${user.tempmaxima}','${idUser}');`);
    },

    selectAdega: (idUser) => {
        return SQLQuery(`select * from adega, usuario where adega.idusuario = usuario.idusuario and usuario.idusuario = ${idUser};`);
    }

}

module.exports.Arduino = {

    selectSensorSuperior: () => {
        return SQLQuery(`select * from eventos where idsensor = 1 order by idsensor desc;`);
    },

    selectSensorCentro: () => {
        return SQLQuery(`select * from eventos where idsensor = 2 order by idsensor desc;`);
    },

    selectSensorInferior: () => {
        return SQLQuery(`select * from eventos where idsensor = 3 order by idsensor desc;`);
    },

    /* DEPOIS, FAZER O CORRETO
    Precisa mudar a posicao para centro
    E atribuir uma variavel para o sensor.idAdega
    */

    readUltTempSensorSuperior: () => {

        return SQLQuery(`select Top 1 temperatura as UltTempSensorSuperior from Eventos,Sensor where Sensor.idAdega = 1 and 
        Sensor.idSensor = Eventos.idSensor and Posicao = 'Superior' order by idEventos desc;`);

    },

    readUltTempUmiSensorCentro: () => {

        return SQLQuery(`select Top 1 temperatura as UltTempSensorCentro, umidade as UltUmiSensorCentro from Eventos,Sensor where Sensor.idAdega = 1 and 
        Sensor.idSensor = Eventos.idSensor and Posicao = 'Centro' order by idEventos desc;`);
    },

    readUltTempSensorInferior: () => {

        return SQLQuery(`select Top 1 temperatura as UltTempSensorInferior from Eventos,Sensor where Sensor.idAdega = 1 and 
        Sensor.idSensor = Eventos.idSensor and Posicao = 'Inferior' order by idEventos desc;`);

    },

    selectTempMax: () => {

        return SQLQuery(`select tempMaxima as TempMaxima from Adega where idAdega = 1;`);

    },

    selectTempMin: () => {

        return SQLQuery(`select tempMinima as TempMinima from Adega where idAdega = 1;`);

    },

    selectUmiMax: () => {

        return SQLQuery(`select umidadeMax as UmidadeMaxima from Adega where idAdega = 1;`);

    },


    selectUmiMin: () => {

        return SQLQuery(`select umidadeMin as UmidadeMinima from Adega where idAdega = 1;`);

    },

    selectMedia: () => {

        // Mudar o numero ao lado do top para ter um resultado de média diferente

        return SQLQuery(`select avg(temperatura) as Media from (select Top 1000 temperatura from Eventos,Sensor 
        where Sensor.idAdega = 1 and Sensor.idSensor = Eventos.idSensor and Posicao = 'Superior') as Media;`);

    },

    readMediaTemp: () => {

        return SQLQuery(`select avg(temperatura) as MediaTemp from (select Top 1000 temperatura from Eventos,Sensor 
            where Sensor.idAdega = 1 and Sensor.idSensor = Eventos.idSensor and Posicao = 'Centro') as MediaTemp`);
    },

    readMediaUmi: () => {
        return SQLQuery(`select avg(umidade) as MediaUmi from (select Top 1000 umidade from Eventos,Sensor 
            where Sensor.idAdega = 1 and Sensor.idSensor = Eventos.idSensor and Posicao = 'Centro') as MediaUmi;`);
    },

    readPrimeiroQuartilTemp: () => {

        return SQLQuery(`Select(SELECT top 1 PERCENTILE_cont(0.25) WITHIN GROUP (ORDER BY temperatura)  OVER () Percentile_cont
            FROM Eventos,Sensor where Sensor.idAdega = 1 and Sensor.idSensor = Eventos.idSensor and Posicao = 'Centro' and 
            idEventos > (select top 1 idEventos from Eventos order by IdEventos desc) - 100) as PrimeiroQuartilTemp;  `);

    },

    readTerceiroQuartilTemp: () => {

        return SQLQuery(`Select(SELECT top 1 PERCENTILE_cont(0.25) WITHIN GROUP (ORDER BY temperatura DESC) OVER () Percentile_cont
            FROM Eventos,Sensor where Sensor.idAdega = 1 and Sensor.idSensor = Eventos.idSensor and Posicao = 'Centro' and 
            idEventos > (select top 1 idEventos from Eventos order by IdEventos desc) - 100) as TerceiroQuartilTemp;  `);

    },

    readPrimeiroQuartilUmi: () => {

        return SQLQuery(`Select(SELECT top 1 PERCENTILE_cont(0.25) WITHIN GROUP (ORDER BY umidade)  OVER () Percentile_cont
        FROM Eventos,Sensor where Sensor.idAdega = 1 and Sensor.idSensor = Eventos.idSensor and Posicao = 'Centro' and 
        idEventos > (select top 1 idEventos from Eventos order by IdEventos desc) - 100) as PrimeiroQuartilUmi;`);

    },

    readTerceiroQuartilUmi: () => {

        return SQLQuery(`Select(SELECT top 1 PERCENTILE_cont(0.25) WITHIN GROUP (ORDER BY umidade DESC) OVER () Percentile_cont
        FROM Eventos,Sensor where Sensor.idAdega = 1 and Sensor.idSensor = Eventos.idSensor and Posicao = 'Centro' and 
        idEventos > (select top 1 idEventos from Eventos order by IdEventos desc) - 100) as TerceiroQuartilUmi;`);
    },

    readSemanal: () => {

        // Preciso saber como vai mostrar no grafico, se cada barra será um select...
        // Se for assim, só definir o inicio e o fim de cada select

        return SQLQuery(`select Top 200 umidade from Eventos,Sensor 
        where Sensor.idAdega = 1 and Sensor.idSensor = Eventos.idSensor and Posicao = 'Centro'`);

    },

}




/*

const insertUser = ()=> {
    return module.exports.Arduino.insertArduino;
    return insertArduino()
}

module.exports = {
    Arduino: {
        insertUser
    }
}

*/


