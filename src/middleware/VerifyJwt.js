const jwt = require('jsonwebtoken');

const VerifyJwt = (req, res, next) => {
    const token = req.header('authToken');
    if(!token) return res.status(401).json({message: "Access Denied. No Token Found"})
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = verified
        next();
    }
    catch (err) {
        res.status(400).json({message: "Invalid Token"})
    }
}

module.exports = VerifyJwt;