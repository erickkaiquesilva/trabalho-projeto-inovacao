let database = require("mssql");
let config = {
    user: "bandtec",
    password: "Grupo0708",
    server: "grupo5.database.windows.net",
    database: "grupo5",
    options:{
        encrypt: true
    }
}

let g = false;

function SQLQuery(queryLine){
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
        return SQLQuery(`insert into usuario values('${user.nome}','${user.sobrenome}','${user.rg}','${user.cpf}','${user.email}','${user.usuario}','${user.senha}','${user.date}')`);
    },
    getUser: (user) => {
        return SQLQuery(`select * from usuario where usuario.mailUser = '${user.mailUser}')`);
    }
}