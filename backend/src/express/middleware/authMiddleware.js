const jwt = require('jsonwebtoken');
const JWT_SECRET = 'appeventos1234@';

function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).json({ error: 'No token provided' });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.userId = decoded.id; // Aquí tienes el `id`
        next();
      });
}

module.exports = { authenticateToken };
