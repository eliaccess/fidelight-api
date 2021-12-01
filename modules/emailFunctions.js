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
				<style>
					body {
						width:100%;
						align-content: center;
						justify-content: center;
						background: #E5E5E5;
						display: flex;
					}
					a{
						text-decoration: none;
					}
					.separator{
						width: 30%;
					}
					.social_img{
						width: 24px;
					}
					.logo_image{
						width: 30px;
					}
					.brand_name_image{
						width: 100px;
					}
					.separatorDiv{
						display: flex; 
						width:100%;
						align-content: center;
						justify-content: center;
						position:relative;
						margin-top: 20px;
						margin-bottom: 20px;
					}
					.content {
						display: flex; 
						width:100%;
						flex-wrap:wrap;
						flex-direction: column;
						max-width:580px;
						min-width:400px;
						align-content: center;
						justify-content: center;
						position:relative;
					}
					.header {
						display:flex;
						flex-wrap:wrap;
						flex-direction:column;
						justify-content: center;
						align-content: center;
						width:100%;
						position:relative;
					}
					.title { 
						display:flex;
						justify-content: center;
						color:rgba(0, 0, 0, 1);
						width:100%;
						position:relative;
						font-family:Inter;
						text-align:center;
						font-size:24px;
						letter-spacing:0;
					}
					.logo {
						display: flex;
						justify-content:center;
						width:100%;
						margin-top: 20px;
						position:relative;
					}
					.thank_you_message { 
						display: flex;
						color:rgba(50, 50, 50, 1);
						width:100%;
						position:relative;
						font-family:Inter;
						text-align:center;
						margin-bottom:10px;
						font-size:16px;
						letter-spacing:0;
					}
					.box_mail { 
						display: flex;
						flex-wrap: wrap;
						flex-direction: column;
						background-color:rgba(255, 255, 255, 1);
						width:100%;
						position:relative;
						align-content:center;
						justify-content:center;
						padding:20px;
						margin-top:30px;
						border-top-left-radius:10px;
						border-top-right-radius:10px;
						border-bottom-left-radius:10px;
						border-bottom-right-radius:10px;
					}
					.confirmation_link {
						display: flex; 
						color:rgba(35, 50, 250, 1);
						width:100%;
						text-align: center;
						justify-content: center;
						position:relative;
						font-family:Inter;
						text-align:center;
						font-size:24px;
						letter-spacing:0;
					}
					.get_app_msg { 
						display: flex;
						color:rgba(0, 0, 0, 1);
						width:100%;
						justify-content:center;
						position:relative;
						font-family:Inter;
						text-align:center;
						font-size:24px;
						letter-spacing:0;
						margin-bottom: 10px;
					}
					.get_app_detail { 
						display: flex; 
						color:rgba(100, 100, 100, 1);
						width:100%;
						justify-content: center;
						position:relative;
						font-family:Inter;
						text-align:center;
						font-size:16px;
						letter-spacing:0;
						margin-bottom: 15px;
					}
					.download { 
						display: flex;
						width:100%;
						position:relative;
						flex-wrap: wrap;
						flex-direction: row;
						align-content: center;
						justify-content: center;
						margin-bottom: 15px;
					}
					.download_left { 
						display: flex;
						justify-content: right;
						width:50%;
						height: 55px;
						padding-right:10px;
						position:relative;
					}
					.download_right { 
						display: flex;
						justify-content: left;
						width:50%;
						height: 55px;
						padding-left:10px;
						position:relative;
					}
					.download_logo { 
						display: flex;
						justify-content: center;
						height: 55px;
						margin-right:10px;
						margin-left:10px;
						position:relative;
					}
					.social_links {
						display: flex;
						flex-wrap: wrap;
						justify-content: center;
						flex-direction: row;
						width:100%;
						min-width:120px;
						position:relative;
					}
					.social_logo { 
						width:24px;
						height:24px;
						margin-left: 12px;
						margin-right: 12px; 
						position:relative;
					}
					.brand_name { 
						display: flex;
						justify-content: center;
						margin-top: 15px;
						margin-bottom: 20px;
						width:100%;
						position:relative;
					}
					.footer { 
						display: flex;
						justify-content: center;
						color:rgba(150, 150, 150, 1);
						width:100%;
						position:relative;
						font-family:Inter;
						text-align:center;
						font-size:12px;
						letter-spacing:0;
					}
				</style>
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