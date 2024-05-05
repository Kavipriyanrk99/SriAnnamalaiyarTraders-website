const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');
const { verifyToken } = require('../middleware/verifyToken');


router.route('/')
    .get(verifyToken, enquiryController.getEmails)
    .post(enquiryController.addEmail);

router.route('/:id')
    .get(verifyToken, enquiryController.getEmail)

module.exports = router;