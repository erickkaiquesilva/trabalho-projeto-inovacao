const express = require("express");
const router = express.Router();

router.get("/log", (req, res, next) => {
    // Verificando se existe um usuário ativo
    if(req.session.user)
    {
        // Se tiver um usuário ativo
        // Destruo a session dele
        
    }

    res.redirect("/login");
});

module.exports = router;