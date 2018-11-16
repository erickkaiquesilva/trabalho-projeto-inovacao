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
    if(g)
    {
        return global.conn.request().
        query(queryLine).then(results => {
            return results.recordset;
        }).catch(err => console.log(err, 323232))
    }
    else
    {
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
        return SQLQuery(`insert into usuario(nome, email, senha) values ('${user.nome}','${user.email}','${user.senha}')`);
    },
    getUser: (user) => {
        return SQLQuery(`select * from usuario where usuario.email = '${user.email}'`);
    },
    getLogin: (user) => {
        return SQLQuery(`select * from usuario where usuario.email = '${user.email}' and usuario.senha = ${user.senha}`);
    }
}

module.exports.Arduino = {

    insertArduino: (dados) => {
        return SQLQuery(`insert into leitura(temperatura, umidade, momento) values('${dados.temp}', '${dados.umi}', ${dados.data}
);`);
    },

    selectArduino: () => {
        return SQLQuery(`select * from leitura order by momento`);
    }
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
