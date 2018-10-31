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
        return SQLQuery(`insert into usuario(nmUser, nuUser, sxUser, tpAdega, emUser, passUser) values ('${user.nmUser}','${user.nuUser}','${user.sxUser}','${user.tpAdega}','${user.mailUser}','${user.passUser}')`);
    },
    getUser: (user) => {
        return SQLQuery(`select * from usuario where usuario.emUser = '${user.mailUser}'`);
    }
}