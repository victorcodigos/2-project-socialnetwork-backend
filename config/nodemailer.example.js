const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'your gmail email',
        pass: 'goolge password generated'
    }
});


module.exports = {transporter}; 