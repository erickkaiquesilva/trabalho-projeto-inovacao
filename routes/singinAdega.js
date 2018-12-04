// As constantes express, router são bibliotecas do node
const express = require('express');
const router = express.Router();
// A constante auth é uma biblioteca node que faz controle de seção
const auth = require('connect-ensure-login');

const db = require('../database/data').Adega;

router.get('/', auth.ensureLoggedIn("/login"), (req, res) => {
    console.log(req.session);
    if (req.session.passport && req.session.passport.user) {
        let user = req.session.passport.user;
        console.log('Seja Bem Vindo', user);
        res.render("singinAdega", {
            teste: "oi",
            user: {
                name: user.nome,
                url: "/users/" + user.id,
                id: user.id
            }
        });

    } else {
        next();
    }
});

router.post('/', auth.ensureLoggedIn("/login"), (req, res) => {
    
    let dados = req.body;
    let idUser = req.session.passport.user;

    
    db.insertAdega(dados, idUser.id).then(() => {
        res.redirect('/dashboard');

    }).catch(err => console.log(err));

});



module.exports = router;