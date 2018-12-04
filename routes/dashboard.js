// As constantes express, router são bibliotecas do node
const express = require('express');
const router = express.Router();
// A constante auth é uma biblioteca node que faz controle de seção
const auth = require('connect-ensure-login');
const db = require('../database/data').Users;

// Na get /dashboard o auth.ensureLoggedIn esta fazendo uma checagem se o usuário esta logado ou não. Caso esteja
// acessa a dashboard, caso contrario vai direto para a página de login
router.get("/", auth.ensureLoggedIn("/login"), (req, res, next) => {
    let user = req.session.passport.user;
    db.selectTemAdega(user.id)
      .then(resultado => {
        if(resultado.length != 0)
        {
          res.render("dashboard", {
              teste: "oi",
              user: {
                name: user.nome,
                url: "/users/" + user.id,
                tempMin: resultado[0].TempMinima,
                tempMax: resultado[0].TempMaxima,
                UmiMin: resultado[0].UmidadeMin,
                UmiMax: resultado[0].UmidadeMax
              }
            });
        }
        else
        {
          res.redirect('/singinAdega');
        }
      })

    // console.log('Seja Bem Vindo', user);
    // res.render("dashboard", {
    //   teste: "oi",
    //   user: {
    //     name: user.nome,
    //     url: "/users/" + user.id
    //   }
    // });
    //res.render("dashboard", { title: 'teste' });
  });

module.exports = router;
