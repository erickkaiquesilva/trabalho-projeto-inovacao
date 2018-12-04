// As constantes express, router são bibliotecas do node
const express = require('express');
const router = express.Router();
// A constante auth é uma biblioteca node que faz controle de seção
const auth = require('connect-ensure-login');

router.get('/', (req, res) => {
    res.render("login-adm", {title: "Olá"});
});

router.post("/", (req, res) => {
    let dados = req.body;

    console.log(dados);
    res.json(dados);
});

module.exports = router;