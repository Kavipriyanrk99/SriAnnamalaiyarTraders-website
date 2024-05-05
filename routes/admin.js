const express = require('express');
const router = express.Router();
const path = require('path');
const enquiryController = require('../controllers/enquiryController');
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/verifyToken');

router.route('/inbox')
    .get(verifyToken, (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'views', 'build', 'inbox.html'));
    });

router.route('/auth')
    .post(authController.handleLogin);

router.route('/inbox/:id')
    .get(verifyToken, (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'views', 'build', 'emailView.html'));
    });

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'build', 'login.html'));
});

module.exports = router;