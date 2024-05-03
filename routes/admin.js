const express = require('express');
const router = express.Router();
const path = require('path');
const enquiryController = require('../controllers/enquiryController');
const authController = require('../controllers/authController');


router.route('^(/)$')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '..','views', 'build', 'login.html'));
    });

router.route('/auth')
    .post(authController.handleLogin);

router.route('/email')
    .get();

router.route('/email:email')
    .get();

module.exports = router;