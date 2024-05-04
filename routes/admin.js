const express = require('express');
const router = express.Router();
const path = require('path');
const enquiryController = require('../controllers/enquiryController');
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/verifyToken');

router.route('/inbox')
    .get(verifyToken, (req, res) => {
        res.send('<p>successful redirection</p>')
    });

router.route('/auth')
    .post(authController.handleLogin);

router.route('/inbox/:email_address')
    .get();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'build', 'login.html'));
});

module.exports = router;