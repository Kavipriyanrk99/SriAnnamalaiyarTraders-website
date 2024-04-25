const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');


router.route('/')
    .post(enquiryController.addEmail);

module.exports = router;