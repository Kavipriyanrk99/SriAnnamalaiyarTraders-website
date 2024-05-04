require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async(req, res) => {
    if(!req.body.email_address?.trim() || !req.body.password?.trim())
        return res.status(400).json({ 'message': 'email and password are required!'});

    const email_address = req.body.email_address.trim();
    const password = req.body.password.trim();

    if(email_address !== process.env.ADMIN_EMAIL)
        return res.status(401).json({ 'message': 'unauthorized!'});

    const match = await bcrypt.compare(password, process.env.ADMIN_PASS);
    
    if(match){
        const token = jwt.sign({
            "email_address" : process.env.ADMIN_EMAIL
        }, process.env.TOKEN_SECRET, { expiresIn : '1d'})

        res.cookie('jwt', token, { httpOnly : true, secure : false, sameSite : 'Strict', maxAge : 24 * 60 * 60 * 1000 });
        return res.status(201).json({ 'message': `authorized!`});
    } else{
        return res.status(401).json({ 'message': 'unauthorized!'});
    }
} 

module.exports = { handleLogin };