const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');
const { verifyToken } = require('../middleware/verifyToken');


router.route('/')
    .get(verifyToken, enquiryController.getEmails)
    .post(enquiryController.addEmail);

module.exports = router;