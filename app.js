// app.js
const express = require('express');
const path = require('path');
const app = express();

// Import userRoutes dengan path yang benar
const userRoutes = require('./src/routes/userRoutes');


// Set lokasi views ke src/views
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Middleware untuk folder public
app.use(express.static(path.join(__dirname, 'public')));

// Routes utama
app.get('/', (req, res) => {
    res.render('home', { title: "Master Chess" });
});

app.get('/game', (req, res) => {
    res.render('game', { title: "Permainan Catur" });
});

app.get('/info', (req, res) => {
    res.render('info', { title: "Tentang Developer" });
});

// Gunakan userRoutes untuk menangani route PvP
app.use('/', userRoutes);

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
