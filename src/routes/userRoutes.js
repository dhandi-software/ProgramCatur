// File: src/routes/userRoutes.js
const express = require('express');
const router = express.Router();

router.get('/play/pvp', (req, res) => {
    res.render('pvp', { title: "Player vs Player" });
});

module.exports = router;
