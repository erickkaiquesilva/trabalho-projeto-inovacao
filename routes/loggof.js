const express = require("express");
const router = express.Router();

router.get("/log", (req, res, next) => {
    // Verificando se existe um usuário ativo
    req.logout();

    res.redirect("/login");
});

module.exports = router;