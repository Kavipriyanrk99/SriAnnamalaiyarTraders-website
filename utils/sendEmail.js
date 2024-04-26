const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    } 
});

const sendEmail = async(subject, body) => {
    try{
        const info = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: process.env.SMTP_TO_ADDRESS,
            subject: subject,
            html: body
        });

        console.log(`Message sent: ${info.messageId}`);
    } catch(error){
        console.log(error);
    }
}

module.exports = { sendEmail }