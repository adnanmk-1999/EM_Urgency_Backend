require('dotenv').config();

const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path')

function sendEmail(mailList,subject, message) {
    
    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: 'smtp.gmail.com',
        // secureConnection: false,
        port: 587,
        // tls: {
        //     ciphers: 'SSLv3',
        //     rejectUnauthorized: false
        // },
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

    //var mailList = [['thasnisathar2017@gmail.com'], ['em-urgency@outlook.com'], ['thasnisathar2018@gmail.com'],['adnan.trv17ee003@gecbh.ac.in']]
    
 
    let mailOptions = {
        from: 'emurgency.exp@gmail.com', // TODO: email sender
        //to:['jijo.j@experionglobal.com,adnan.m@experionglobal.com','thasnisathar2017@gmail.com'], // TODO: email receiver
        to: mailList,
        subject: subject,
        template: 'email', // the name of the template file i.e email.handlebars
        context: {
            name: "Employee", // replace {{name}} with Adebola
            message: message
        }
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
