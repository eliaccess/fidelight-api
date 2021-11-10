var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

const transporter = nodemailer.createTransport({
    name: process.env.EMAIL_DOMAIN,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

async function sendEmail(mailOptions){
	let info = transporter.sendMail(mailOptions);
	return info
}

async function generateEmailOptions(email, content){
	return {
	    from: {
	        name: 'no-reply',
	        address: 'no-reply@fidelight.fr'
	    },
	    to: email,
	    subject: 'Subscription confirmation to Fidelight',
	    html: content
	};
}

async function generateConfirmationEmailCompany(company, confirmationURL){
	let html = `<h1>Email Confirmation</h1>
        <h2>Hello ${company},</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=${confirmationURL}> Click here</a>
        </div>`;
	return html;
}

async function generateConfirmationEmailUser(name, surname, confirmationURL){
	let html = `<h1>Email Confirmation</h1>
        <h2>Hello ${surname} ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=${confirmationURL}> Click here</a>
        </div>`;
	return html;
}

module.exports = {
	sendEmail,
	generateEmailOptions,
	generateConfirmationEmailCompany,
	generateConfirmationEmailUser
}