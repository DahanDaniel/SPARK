require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
const dataRoutes = require('./routes/data');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173', 'https://ceo.twojadomena.pl'], // Zmień to przy wdrożeniu na Seohost
    credentials: true, // Wymagane dla ciasteczek (JWT)
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);

// Healthcheck
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'API is running', time: new Date() });
});

app.listen(PORT, () => {
    console.log(`🚀 API Server running on port ${PORT}`);
});
