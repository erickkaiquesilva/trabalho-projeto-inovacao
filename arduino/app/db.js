let db = require("mssql");

// aqui você muda pro seu banco
let config = {
    user: "bandtec",
    password: "Grupo0708",
    server: "grupo5.database.windows.net",
    database: "grupo5",
    options: {
        encrypt: true
    }
}

function SQLQuery(queryLine)
{
    if(global.conn)
    {
        return global.conn.request().
        query(queryLine).
        then(results => {
            return results.recordset;
        })
        .catch(err => {
            console.log(err);
        })
    }
    else
    {
        return db.connect(config)
            .then(conn => {
                global.conn = conn;
                return global.conn.request().query(queryLine);
            })
            .then(results => {
                return results.recordset;
            })
            .catch(err =>{
                console.log(err);
            });
    }
}

module.exports.Arduino = {

    insertSensorSuperior: (dados) => 
    {
        // aqui você coloca o insert do jeito que é la no seu banco 
        console.log(dados);       
        return SQLQuery(`insert into eventos (temperatura, momento, idsensor) values(${dados.temp}, CURRENT_TIMESTAMP, '1');`);
    },

    insertSensorCentro: (dados) => 
    {
        // aqui você coloca o insert do jeito que é la no seu banco
        console.log(dados); 
        return SQLQuery(`insert into eventos (temperatura, umidade, momento, idsensor) values(${dados.temp}, ${dados.umi}, CURRENT_TIMESTAMP, '2');`);
    },

    insertSensorInferior: (dados) => 
    {
        // aqui você coloca o insert do jeito que é la no seu banco
        console.log(dados);         
        return SQLQuery(`insert into eventos (temperatura, momento, idsensor) values(${dados.temp}, CURRENT_TIMESTAMP, '3');`);
    }
}
