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
	let html = `<html lang='en'>
		    <head>
		        <meta charset='utf-8'>
		      
		        <title>Confirmation email fidelight</title>
		        <meta name='description' content='Figma Confirmation Email'>
		        <meta name='author' content='fidelight'>
		        <link rel='stylesheet' href='https://storage.googleapis.com/fidelight-api/email/style/bootstrap.css'>
		        <link href='https://fonts.googleapis.com/css?family=Inter&display=swap' rel='stylesheet'>
		        <link rel='stylesheet' href='https://storage.googleapis.com/fidelight-api/email/style/styles.css'>
		  
		    </head>
		  
		    <body>
		        <div class='content'>
		        	<div class='header'>
		        		<div class='logo'>
		        			<img src='https://storage.googleapis.com/fidelight-api/email/img/logo.png' class='logo_image' alt='Logo Fidelight'>
		        		</div>
		                <div class='brand_name'>
		                    <img src='https://storage.googleapis.com/fidelight-api/email/img/name.png' class='brand_name_image' alt='Name Fidelight'>
		                </div>
		                <div  class='title'>Email Confirmation</div>
		        	</div>
		        	<div class='box_mail'>
		                <div  class='thank_you_message'>Thank you for subscribing ${company}. Please confirm your email by clicking on the following button:</div>
		        		<div  class='confirmation_link'>
		                    <a href='${confirmationURL}'>Click here !</a>
		                </div>
		                <div  class='separatorDiv'>
		                    <img src='https://storage.googleapis.com/fidelight-api/email/img/separator.png' class='separator' alt='Name Fidelight'>
		                </div>
		        		<div  class='get_app_msg'>Get the Fidelight app!</div>
		        		<div  class='get_app_detail'>Get the most of Fidelight by installing the mobile app. You can log in by using your email address and password.</div>
		        		<div class='download'>
		                    <div class='download_left'>
		                        <img src='https://storage.googleapis.com/fidelight-api/email/img/download_apple.png' alt='Download Fidelight for iOS' class='download_logo'>
		                    </div>
		                    <div class='download_right'>
		                        <img src='https://storage.googleapis.com/fidelight-api/email/img/download_android.png' alt='Download Fidelight for Android' class='download_logo'>
		                    </div>
		                </div>
		                <div class='social_links'>
		                    <div class='social_logo'>
		                        <img src='https://storage.googleapis.com/fidelight-api/email/img/twitter_logo.png' class='social_img' alt='Fidelight on Twitter'>
		                    </div>
		                    <div class='social_logo'>
		                        <img src='https://storage.googleapis.com/fidelight-api/email/img/facebook_logo.png' class='social_img' alt='Fidelight on Facebook'>
		                    </div>
		                    <div class='social_logo'>
		                        <img src='https://storage.googleapis.com/fidelight-api/email/img/linkedin_logo.png' class='social_img' alt='Fidelight on Linkedin'>
		                    </div>
		                </div>
		                <div class='brand_name'>
		                    <img src='https://storage.googleapis.com/fidelight-api/email/img/name.png' class='brand_name_image' alt='Logo Fidelight'>
		                </div>
		                <span class='footer'>Copyright © 2021 Fidelight</span>
		            </div>
		        </div>
		    </body>
		</html>`;	
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