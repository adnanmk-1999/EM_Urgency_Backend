require('dotenv').config();

const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path')

function sendEmail(mailList, subject, message) {

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.MAILPASSWORD
        }
    });

    // point to the template folder
    const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('./views/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./views/'),
    };
    transporter.use('compile', hbs(handlebarOptions))


    let mailOptions = {
        from: `"EM-Urgency" <${process.env.EMAIL}>`,
        to: mailList,
        subject,
        template: 'email',
        context: {
            name: 'Employee',
            message
        },
        attachments: [
            {
                filename: 'logo.png',
                path: path.join(__dirname, '../assets/logo.png'),
                cid: 'logo@emurgency'
            },
            {
                filename: 'logo-footer.png',
                path: path.join(__dirname, '../assets/logo.png'),
                cid: 'logoFooter@emurgency'
            }
        ]
    };

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log('Error occurs', err);
        } else {
            console.log('Email sent!!!');
        }
    });

}
module.exports = sendEmail;
