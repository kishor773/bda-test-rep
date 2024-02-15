const jwt = require('jsonwebtoken');   //jwt token



function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Unauthorized' });
        req.user = decoded;
        next();
    });
}

function generateJWTToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = {verifyToken,generateJWTToken};



