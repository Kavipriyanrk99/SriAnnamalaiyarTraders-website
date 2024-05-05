const { getPool } = require('../config/dbConnection');
const { isValidEmail, isValidPhoneNumber } = require('../utils/fieldValidation');
const { sendEmail } = require('../utils/sendEmail');

const addEmail = async(req, res) => {
    if(!req.body.full_name?.trim() || !req.body.phone_number?.trim() || !req.body.company_name?.trim() || !req.body.email_address?.trim() || !req.body.email_subject?.trim() || !req.body.email_message?.trim() || !req.body.newsletter_check?.trim()){
        return res.status(400).json({ 'message': 'name, phone number, company name, email address, email subject, email message and newsletter checkbox are required!'});
    }

    const full_name = req.body.full_name.trim();
    const phone_number = req.body.phone_number.trim();
    const company_name = req.body.company_name.trim();
    const email_address = req.body.email_address.trim();
    const email_subject = req.body.email_subject.trim();
    const email_message = req.body.email_message.trim();
    const newsletter_check = req.body.newsletter_check.trim() === "on" ? 1 : 0;

    if(!isValidEmail(email_address)){
        return res.status(400).json({ 'message': 'invalid email address!'});
    }

    if(!isValidPhoneNumber(phone_number)){
        return res.status(400).json({ 'message': 'invalid phone number!'});
    }

    try {
        const pool = await getPool();
        const connection = await pool.getConnection();

        const query = 'INSERT INTO `enquiry_email`(`email_address`, `full_name`, `phone_number`, `company_name`, `email_subject`, `email_message`, `newsletter_check`) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [email_address, full_name, phone_number, company_name, email_subject, email_message, newsletter_check];

        await connection.execute(query, values);
        connection.release();

        const message = `<h1><b>Enquiry from client</b></h1>

                        <h3>Client Name:</h3>
                        <p>${full_name}</p>

                        <h3>Email Address:</h3>
                        <a href="mailto:${email_address}">${email_address}</a>
                         
                        <h3>Phone Number:</h3>
                        <a href="tel:${phone_number}">${phone_number}</a>


                        <h3>Company Name:</h3>
                        <p>${company_name}</p>

                        <hr/>
                        
                        <h3>Subject:</h3>
                        <p>${email_subject}</p>
                        
                        <h3>Message:</h3>
                        <p>${email_message}</p>
                        
                        <h4>${new Date()}</h4>`;

        sendEmail(email_subject, message);
      
        res.status(201).json({ 'message': `enquiry message sent!`});
    } catch (error) {
        res.status(500).json({ 'message': error.message});
    }
}

const getEmails = async(req, res) => {
    try {
        const pool = await getPool();
        const connection = await pool.getConnection();

        const query = 'SELECT `id`,`email_address`, `email_subject`, `email_message` FROM `enquiry_email`';

        const [rows, fields] = await connection.execute(query);
        connection.release();

        res.status(201).json(rows);
    } catch (error) {
        res.status(500).json({ 'message': error.message});
    }
}

const getEmail = async(req, res) => {
    if(!req.params?.id){
        return res.status(400).json({ 'message': 'invalid id!'});
    }

    const id = req.params.id;

    try {
        const pool = await getPool();
        const connection = await pool.getConnection();

        const query = 'SELECT * FROM `enquiry_email` WHERE `id` = ?';

        const [rows, fields] = await connection.execute(query, [id]);
        connection.release();

        if(rows.length == 0)
            return res.status(400).json({ 'message': `id ${id} not found!`});

        return res.status(201).json(rows);
    } catch (error) {
        res.status(500).json({ 'message': error.message});
    }
}

module.exports = { addEmail, getEmails, getEmail};