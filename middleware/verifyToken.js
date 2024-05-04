const jwt = require('jsonwebtoken');

const verifyToken = async(req, res, next) => {
    if(!req.cookies?.jwt)
        return res.redirect(302, '/admin');
    
    const token = req.cookies.jwt;

    jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        (error, decoded) => {
            if(error)
                return res.redirect(302, '/admin');

            req.email_address = decoded.email_address;
            next();
        }
    );
}

module.exports = { verifyToken };