const LocalStrategy = require('passport-local').Strategy;
let crypto = require('../Encrypt/encrypt').Encrypto;
let db = require('../database/data').Users;

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (usuario, done) {
        db.getUserId(usuario.id)
            .then(user => {
                done(null, user[0]);
            })
            .catch(err => console.log(err));
    });

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
        (username, password, done) => {
            db.getUser({usuario:username})
               .then((resultados) => {
                 if (resultados.length == 0) {

                   return done(null, false);
                 }
                 else {

                   /*
                     Porem caso o contrario ele pega as informações do formulario de login, logo depois eu crio uma LET result
                     que recebe os resultados na posição [0] do array. Depois disso estou criando uma LET isEqual que recebe 
                     a criptografia da senha, a sua função é comparar, repare abaixo que eu passo no crypto.ComparePassword
                     a senha que retornou no select do banco de dados que esta contida no objeto result.senha e tambem a senha
                     que o usuário esta digitando para acessar sua página que esta em req.body.senha, ela por esta função esta sendo
                     descriptografada e sendo comparada logo depois.

                   */
                   let result;
                   //console.log(resultados);
                   

                   result = resultados[0];

                   let isEqual = crypto.ComparePassword(result.Senha, password);

                   /*
                     Caso a isEqual seja diferente eu retorno um req.json e dou uma mensagem no console dizendo que a senha não é valida
                     Caso contrario eu digo que a senha é valida crio uma sessão para este usuário navegar por todo o site e depois redireciono
                     ele para a página da dashboard.
                   */
                   if (!isEqual) {
                     return done(null, false)
                     console.log("Senha não é valida");
                   }
                   else {
                     console.log("Senha valida");

                     // Se for igual
                     // na sessão atual do servidor, crio uma váriavel e passo as informações do usuario
                     return done(null, {id: result.idUsuario, nome: result.Nome});

                    //  db.selectTemAdega(result).then((resultados) => {
                    //     if(resultados.length > 0){

                    //       res.redirect('/dashboard');
                    //       return done(null, {id: result.idUsuario, nome: result.Nome});

                    //     }else{

                    //       res.redirect('/singinAdega');
                    //       return done(null, {id: result.idUsuario, nome: result.Nome});

                    //     }
                    //  }).catch(err => console.log(err));;

                     //console.log(req.session.user);

                   }
                 }
               })// Caso haja algum erro imprimo no console informando o erro
               .catch(err => console.log(err));
        }
    ));
}