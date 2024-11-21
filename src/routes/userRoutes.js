// File: src/routes/userRoutes.js
const express = require('express');
const router = express.Router();

router.get('/play/Border', (req, res) => {
    res.render('Border', { title: "Player vs Player" });
});
router.get('/play/pvp', (req, res) => {
    const { player1Name, player1NPM, player2Name, player2NPM } = req.query;
  
    // Render halaman PVP dengan data pemain
    res.render('pvp', {
      title: 'Player vs Player',
      player1: { name: player1Name, npm: player1NPM },
      player2: { name: player2Name, npm: player2NPM },
    });
  });
  

module.exports = router;
