const express = require('express');
const jwt = require('jsonwebtoken');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/login', (req, res) => {
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ error: 'Hasło jest wymagane' });
    }

    if (password === process.env.CEO_PASSWORD) {
        // Create a token that expires in 24 hours
        const token = jwt.sign({ role: 'ceo' }, process.env.JWT_SECRET, { expiresIn: '24h' });

        // Set token in an HttpOnly cookie so it can't be read by frontend JS
        res.cookie('ceo_token', token, {
            httpOnly: true,
            secure: process.env.SECURE_COOKIES === 'true', 
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        return res.json({ success: true, message: 'Zalogowano pomyślnie' });
    } else {
        return res.status(401).json({ error: 'Nieprawidłowe hasło' });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('ceo_token');
    res.json({ success: true, message: 'Wylogowano' });
});

router.get('/check', requireAuth, (req, res) => {
    res.json({ authenticated: true });
});

module.exports = router;
