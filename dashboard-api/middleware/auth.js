const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.ceo_token;

    if (!token) {
        return res.status(401).json({ error: 'Brak dostępu. Zaloguj się.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Nieprawidłowa lub wygasła sesja.' });
    }
};

module.exports = { requireAuth };
