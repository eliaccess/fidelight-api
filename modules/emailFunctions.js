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
});

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
	let html = `<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, shrink-to-fit=no">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta name="x-apple-disable-message-reformatting">
	        <meta name="format-detection" content="telephone=no">
			<meta name="format-detection" content="date=no">
			<meta name="format-detection" content="address=no">
			<meta name="format-detection" content="email=no">
			<meta name="color-scheme" content="only">
			<title> </title>
			<style>
				body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;} 
				table {border-collapse:collapse;}
				table, td{mso-table-lspace: 0pt; mso-table-rspace: 0pt;}
				img{-ms-interpolation-mode: bicubic;}
				img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;}
				table{border-collapse: collapse !important;}
				body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}
				a[x-apple-data-detectors] {
					color: inherit !important;
					text-decoration: none !important;
					font-size: inherit !important;
					font-family: inherit !important;
					font-weight: inherit !important;
					line-height: inherit !important;
				  }
				@media only screen and (max-width: 450px){
					.break{
						width: 100%!important; 
						text-align: center!important;
						display: block!important;
					}
				}
				@media only screen and (max-width: 600px){
					.full_width{
						width: 100%!important; 
					}
				}
			</style>
		</head>
		<body style="margin: 0px; padding: 0px; font-family: arial; background: #e5e5e5; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" bgcolor="#e5e5e5">
			<table class="full_width" cellspacing="0" cellpadding="0" border="0" width="100%" bgcolor="#e5e5e5" style="width: 100%; background: #e5e5e5; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
				<tr>
					<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<center>
							<table class="full_width" cellspacing="0" cellpadding="0" border="0" width="600" bgcolor="#e5e5e5" align="center" style="margin: 0 auto; width: 600px; background: #e5e5e5; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
								<tr>
									<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
										<table class="full_width" cellspacing="0" cellpadding="0" border="0" width="600" bgcolor="#e5e5e5" style="width: 600px; background: #e5e5e5; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
											<tr>
												<td style="background: #e5e5e5; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" bgcolor="#e5e5e5">
													<table class="full_width" cellspacing="0" cellpadding="0" border="0" width="600" bgcolor="#e5e5e5" style="width: 600px; background: #e5e5e5; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
															<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																<table class="full_width" cellspacing="0" cellpadding="0" border="0" width="600" bgcolor="#e5e5e5" style="width: 600px; background: #e5e5e5; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; border-radius:5px; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td style="height: 20px; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																			<center>
																				<a href="https://Fidelight.com">
																					<img src="https://storage.googleapis.com/fidelight-api/email/img/logo.png" alt="" style="width: 40px; max-width: 40px;  -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" width="40">
																				</a>
																			</center>
																		</td>
																	</tr>
																	<tr>
																		<td style="height: 10px; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="10">&nbsp;</td>
																	</tr>
																	<tr>
																		<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																			<center>
																				<a href="https://Fidelight.com">
																					<img src="https://storage.googleapis.com/fidelight-api/email/img/name.png" alt="" style="width: 100px; max-width: 100px;  -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" width="100">
																				</a>
																			</center>
																		</td>
																	</tr>
																	<tr>
																		<td style="height: 20px; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																			<center>
																				<p style="margin: 0px; font-size: 25px; text-align: center; color: #333; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;">Email Confirmation</p>
																			</center>
																		</td>
																	</tr>
																	<tr>
																		<td style="height: 10px; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="10">&nbsp;</td>
																	</tr>
																	<tr>
																		<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																			<center>
																				<p style="margin: 0px; font-size: 16px; text-align: center; color: #333; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;">Welcome ${company}. Please confirm your email by clicking on the following link:</p>
																			</center>
																		</td>
																	</tr>
																	<tr>
																		<td style="height: 20px; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="20">&nbsp;</td>
																	</tr>
																</table>
															</td>
															<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr>
												<td style="background: #e5e5e5; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" bgcolor="#e5e5e5">
													<table class="full_width" cellspacing="0" cellpadding="0" border="0" width="600" bgcolor="#e5e5e5" style="width: 600px; background: #e5e5e5; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
															<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																<table class="full_width" cellspacing="0" cellpadding="0" border="0" width="560" bgcolor="#fff" style="width: 560px; background: #fff; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; border-radius:10px; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td colspan="3" style="height: 20px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																		<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
																			
																			<p style="margin: 0px; font-size: 26px; text-align: center; color: #333; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;"><a href="${confirmationURL}" style="text-decoration: none;">Click Here!</a></p>
																		</td>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td colspan="3" style="height: 10px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="10">&nbsp;</td>
																	</tr>
																	<tr>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																		<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
																			<center>
																				<table cellspacing="0" cellpadding="0" border="0" width="80" bgcolor="#fff" style="width: 80px; background: #fff; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																					<tr>
																						<td style="height: 20px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 2px solid #c3c3c3;" height="20">&nbsp;</td>
																					</tr>
																				</table>
																			</center>
																		</td>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																		<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																			<center>
																				<p style="margin: 0px; font-size: 25px; text-align: center; color: #333; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;">Get the Fidelight app!</p>
																			</center>
																		</td>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td colspan="3" style="height: 10px; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="10">&nbsp;</td>
																	</tr>
																	<tr>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																		<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																			<center>
																				<p style="margin: 0px; font-size: 16px; text-align: center; color: #333; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;">Get the most of Fidelight by installing the mobile app. You can log in by using your existing emails address and password. </p>
																			</center>
																		</td>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td colspan="3" style="height: 20px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																		<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
																			<center>
																				<table cellspacing="0" cellpadding="0" border="0" bgcolor="#fff" style="background: #fff; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																					<tr>
																						<td width="120" style="width: 120px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
																							<a href="https://Fidelight.com">
																								<img src="https://storage.googleapis.com/fidelight-api/email/img/download_apple.png" alt="" style="width: 120px; max-width: 120px;  -ms-interpolation-mode: bicubic; border: 0; height: 40px; line-height: 100%; outline: none; text-decoration: none; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" width="120" height="40">
																							</a>
																						</td>
																						<td style="width: 15px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="15">&nbsp;</td>
																						<td width="120" style="width: 120px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
																							<a href="https://Fidelight.com">
																								<img src="https://storage.googleapis.com/fidelight-api/email/img/download_android.png" alt="" style="width: 120px; max-width: 120px;  -ms-interpolation-mode: bicubic; border: 0; height: 40px; line-height: 100%; outline: none; text-decoration: none; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" width="120" height="40">
																							</a>
																						</td>
																					</tr>
																				</table>
																			</center>
																		</td>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td colspan="3" style="height: 20px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																		<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
																			<center>
																				<table cellspacing="0" cellpadding="0" align="center" border="0" bgcolor="#fff" style="margin: 0 auto; background: #fff; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																					<tr>
																						<td style="width: 25px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="25">
																							<a href="http://twitter.com/"><img src="https://storage.googleapis.com/fidelight-api/email/img/twitter_logo.png" alt="" style="width: 25px; -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;" width="25" border="0"></a>
																						</td>
																						<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																						<td style="width: 25px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="25">
																							<a href="http://facebook.com/"><img src="https://storage.googleapis.com/fidelight-api/email/img/facebook_logo.png" alt="" style="width: 25px; -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;" width="25" border="0"></a>
																						</td>
																						<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																						<td style="width: 25px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="25">
																							<a href="http://linkedin.com/"><img src="https://storage.googleapis.com/fidelight-api/email/img/linkedin_logo.png" alt="" style="width: 25px; -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;" width="25" border="0"></a>
																						</td>
																					</tr>
																				</table>
																			</center>
																		</td>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td colspan="3" style="height: 10px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="10">&nbsp;</td>
																	</tr>
																	<tr>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																		<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																			<center>
																				<a href="https://Fidelight.com">
																					<img src="https://storage.googleapis.com/fidelight-api/email/img/name.png" alt="" style="width: 80px; max-width: 80px;  -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" width="80">
																				</a>
																			</center>
																		</td>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td colspan="3" style="height: 10px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="10">&nbsp;</td>
																	</tr>
																	<tr>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																		<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
																			<p style="margin: 0px; font-size: 13px; text-align: center; color: #a6a6a6; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height: 1.5;">Copyright &copy; 2021 Fidelight.co</p>
																		</td>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td colspan="3" style="height: 20px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="20">&nbsp;</td>
																	</tr>
																</table>
															</td>
															<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
														</tr>
													</table>
													<table class="full_width" cellspacing="0" cellpadding="0" border="0" width="600" bgcolor="#e5e5e5" align="center" style="margin: 0 auto; width: 600px; background: #e5e5e5; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td style="height: 20px; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="20"></td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</center>
					</td>
				</tr>
			</table>
		</body>
	</html>`;	
	return html;
}

async function generateConfirmationEmailUser(name, surname, confirmationURL){
	let html = `<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, shrink-to-fit=no">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta name="x-apple-disable-message-reformatting">
	        <meta name="format-detection" content="telephone=no">
			<meta name="format-detection" content="date=no">
			<meta name="format-detection" content="address=no">
			<meta name="format-detection" content="email=no">
			<meta name="color-scheme" content="only">
			<title> </title>
			<style>
				body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;} 
				table {border-collapse:collapse;}
				table, td{mso-table-lspace: 0pt; mso-table-rspace: 0pt;}
				img{-ms-interpolation-mode: bicubic;}
				img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;}
				table{border-collapse: collapse !important;}
				body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}
				a[x-apple-data-detectors] {
					color: inherit !important;
					text-decoration: none !important;
					font-size: inherit !important;
					font-family: inherit !important;
					font-weight: inherit !important;
					line-height: inherit !important;
				  }
				@media only screen and (max-width: 450px){
					.break{
						width: 100%!important; 
						text-align: center!important;
						display: block!important;
					}
				}
				@media only screen and (max-width: 600px){
					.full_width{
						width: 100%!important; 
					}
				}
			</style>
		</head>
		<body style="margin: 0px; padding: 0px; font-family: arial; background: #e5e5e5; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" bgcolor="#e5e5e5">
			<table class="full_width" cellspacing="0" cellpadding="0" border="0" width="100%" bgcolor="#e5e5e5" style="width: 100%; background: #e5e5e5; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
				<tr>
					<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<center>
							<table class="full_width" cellspacing="0" cellpadding="0" border="0" width="600" bgcolor="#e5e5e5" align="center" style="margin: 0 auto; width: 600px; background: #e5e5e5; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
								<tr>
									<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
										<table class="full_width" cellspacing="0" cellpadding="0" border="0" width="600" bgcolor="#e5e5e5" style="width: 600px; background: #e5e5e5; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
											<tr>
												<td style="background: #e5e5e5; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" bgcolor="#e5e5e5">
													<table class="full_width" cellspacing="0" cellpadding="0" border="0" width="600" bgcolor="#e5e5e5" style="width: 600px; background: #e5e5e5; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
															<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																<table class="full_width" cellspacing="0" cellpadding="0" border="0" width="600" bgcolor="#e5e5e5" style="width: 600px; background: #e5e5e5; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; border-radius:5px; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td style="height: 20px; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																			<center>
																				<a href="https://Fidelight.com">
																					<img src="https://storage.googleapis.com/fidelight-api/email/img/logo.png" alt="" style="width: 40px; max-width: 40px;  -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" width="40">
																				</a>
																			</center>
																		</td>
																	</tr>
																	<tr>
																		<td style="height: 10px; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="10">&nbsp;</td>
																	</tr>
																	<tr>
																		<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																			<center>
																				<a href="https://Fidelight.com">
																					<img src="https://storage.googleapis.com/fidelight-api/email/img/name.png" alt="" style="width: 100px; max-width: 100px;  -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" width="100">
																				</a>
																			</center>
																		</td>
																	</tr>
																	<tr>
																		<td style="height: 20px; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																			<center>
																				<p style="margin: 0px; font-size: 25px; text-align: center; color: #333; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;">Email Confirmation</p>
																			</center>
																		</td>
																	</tr>
																	<tr>
																		<td style="height: 10px; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="10">&nbsp;</td>
																	</tr>
																	<tr>
																		<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																			<center>
																				<p style="margin: 0px; font-size: 16px; text-align: center; color: #333; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;">Welcome ${surname} ${name}! Please confirm your email by clicking on the following link:</p>
																			</center>
																		</td>
																	</tr>
																	<tr>
																		<td style="height: 20px; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="20">&nbsp;</td>
																	</tr>
																</table>
															</td>
															<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr>
												<td style="background: #e5e5e5; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" bgcolor="#e5e5e5">
													<table class="full_width" cellspacing="0" cellpadding="0" border="0" width="600" bgcolor="#e5e5e5" style="width: 600px; background: #e5e5e5; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
															<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																<table class="full_width" cellspacing="0" cellpadding="0" border="0" width="560" bgcolor="#fff" style="width: 560px; background: #fff; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; border-radius:10px; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td colspan="3" style="height: 20px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																		<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
																			
																			<p style="margin: 0px; font-size: 26px; text-align: center; color: #333; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;"><a href="${confirmationURL}" style="text-decoration: none;">Click Here!</a></p>
																		</td>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td colspan="3" style="height: 10px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="10">&nbsp;</td>
																	</tr>
																	<tr>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																		<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
																			<center>
																				<table cellspacing="0" cellpadding="0" border="0" width="80" bgcolor="#fff" style="width: 80px; background: #fff; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																					<tr>
																						<td style="height: 20px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 2px solid #c3c3c3;" height="20">&nbsp;</td>
																					</tr>
																				</table>
																			</center>
																		</td>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																		<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																			<center>
																				<p style="margin: 0px; font-size: 25px; text-align: center; color: #333; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;">Get the Fidelight app!</p>
																			</center>
																		</td>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td colspan="3" style="height: 10px; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="10">&nbsp;</td>
																	</tr>
																	<tr>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																		<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																			<center>
																				<p style="margin: 0px; font-size: 16px; text-align: center; color: #333; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;">Get the most of Fidelight by installing the mobile app. You can log in by using your existing emails address and password. </p>
																			</center>
																		</td>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td colspan="3" style="height: 20px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																		<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
																			<center>
																				<table cellspacing="0" cellpadding="0" border="0" bgcolor="#fff" style="background: #fff; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																					<tr>
																						<td width="120" style="width: 120px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
																							<a href="https://Fidelight.com">
																								<img src="https://storage.googleapis.com/fidelight-api/email/img/download_apple.png" alt="" style="width: 120px; max-width: 120px;  -ms-interpolation-mode: bicubic; border: 0; height: 40px; line-height: 100%; outline: none; text-decoration: none; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" width="120" height="40">
																							</a>
																						</td>
																						<td style="width: 15px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="15">&nbsp;</td>
																						<td width="120" style="width: 120px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
																							<a href="https://Fidelight.com">
																								<img src="https://storage.googleapis.com/fidelight-api/email/img/download_android.png" alt="" style="width: 120px; max-width: 120px;  -ms-interpolation-mode: bicubic; border: 0; height: 40px; line-height: 100%; outline: none; text-decoration: none; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" width="120" height="40">
																							</a>
																						</td>
																					</tr>
																				</table>
																			</center>
																		</td>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td colspan="3" style="height: 20px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																		<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
																			<center>
																				<table cellspacing="0" cellpadding="0" align="center" border="0" bgcolor="#fff" style="margin: 0 auto; background: #fff; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																					<tr>
																						<td style="width: 25px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="25">
																							<a href="http://twitter.com/"><img src="https://storage.googleapis.com/fidelight-api/email/img/twitter_logo.png" alt="" style="width: 25px; -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;" width="25" border="0"></a>
																						</td>
																						<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																						<td style="width: 25px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="25">
																							<a href="http://facebook.com/"><img src="https://storage.googleapis.com/fidelight-api/email/img/facebook_logo.png" alt="" style="width: 25px; -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;" width="25" border="0"></a>
																						</td>
																						<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																						<td style="width: 25px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="25">
																							<a href="http://linkedin.com/"><img src="https://storage.googleapis.com/fidelight-api/email/img/linkedin_logo.png" alt="" style="width: 25px; -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;" width="25" border="0"></a>
																						</td>
																					</tr>
																				</table>
																			</center>
																		</td>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td colspan="3" style="height: 10px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="10">&nbsp;</td>
																	</tr>
																	<tr>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																		<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																			<center>
																				<a href="https://Fidelight.com">
																					<img src="https://storage.googleapis.com/fidelight-api/email/img/name.png" alt="" style="width: 80px; max-width: 80px;  -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" width="80">
																				</a>
																			</center>
																		</td>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td colspan="3" style="height: 10px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="10">&nbsp;</td>
																	</tr>
																	<tr>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																		<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
																			<p style="margin: 0px; font-size: 13px; text-align: center; color: #a6a6a6; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height: 1.5;">Copyright &copy; 2021 Fidelight.co</p>
																		</td>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td colspan="3" style="height: 20px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="20">&nbsp;</td>
																	</tr>
																</table>
															</td>
															<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
														</tr>
													</table>
													<table class="full_width" cellspacing="0" cellpadding="0" border="0" width="600" bgcolor="#e5e5e5" align="center" style="margin: 0 auto; width: 600px; background: #e5e5e5; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td style="height: 20px; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="20"></td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</center>
					</td>
				</tr>
			</table>
		</body>
	</html>`;	
	return html;
}

async function generateLinkedSocialAccountEmail(provider){
	let html = `<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, shrink-to-fit=no">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta name="x-apple-disable-message-reformatting">
			<meta name="format-detection" content="telephone=no">
			<meta name="format-detection" content="date=no">
			<meta name="format-detection" content="address=no">
			<meta name="format-detection" content="email=no">
			<meta name="color-scheme" content="only">
			<title> </title>
			<style>
				body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;} 
				table {border-collapse:collapse;}
				table, td{mso-table-lspace: 0pt; mso-table-rspace: 0pt;}
				img{-ms-interpolation-mode: bicubic;}
				img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;}
				table{border-collapse: collapse !important;}
				body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}
				a[x-apple-data-detectors] {
					color: inherit !important;
					text-decoration: none !important;
					font-size: inherit !important;
					font-family: inherit !important;
					font-weight: inherit !important;
					line-height: inherit !important;
				  }
				@media only screen and (max-width: 450px){
					.break{
						width: 100%!important; 
						text-align: center!important;
						display: block!important;
					}
				}
				@media only screen and (max-width: 600px){
					.full_width{
						width: 100%!important; 
					}
				}
			</style>
		</head>
		<body style="margin: 0px; padding: 0px; font-family: arial; background: #e5e5e5; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" bgcolor="#e5e5e5">
			<table class="full_width" cellspacing="0" cellpadding="0" border="0" width="100%" bgcolor="#e5e5e5" style="width: 100%; background: #e5e5e5; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
				<tr>
					<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<center>
							<table class="full_width" cellspacing="0" cellpadding="0" border="0" width="600" bgcolor="#e5e5e5" align="center" style="margin: 0 auto; width: 600px; background: #e5e5e5; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
								<tr>
									<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
										<table class="full_width" cellspacing="0" cellpadding="0" border="0" width="600" bgcolor="#e5e5e5" style="width: 600px; background: #e5e5e5; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
											<tr>
												<td style="background: #e5e5e5; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" bgcolor="#e5e5e5">
													<table class="full_width" cellspacing="0" cellpadding="0" border="0" width="600" bgcolor="#e5e5e5" style="width: 600px; background: #e5e5e5; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
															<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																<table class="full_width" cellspacing="0" cellpadding="0" border="0" width="560" bgcolor="#e5e5e5" style="width: 560px; background: #e5e5e5; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td style="height: 20px; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																			<center>
																				<a href="https://Fidelight.com">
																					<img src="https://storage.googleapis.com/fidelight-api/email/img/logo.png" alt="" style="width: 40px; max-width: 40px;  -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" width="40">
																				</a>
																			</center>
																		</td>
																	</tr>
																	<tr>
																		<td style="height: 10px; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="10">&nbsp;</td>
																	</tr>
																	<tr>
																		<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																			<center>
																				<a href="https://Fidelight.com">
																					<img src="https://storage.googleapis.com/fidelight-api/email/img/name.png" alt="" style="width: 100px; max-width: 100px;  -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" width="100">
																				</a>
																			</center>
																		</td>
																	</tr>
																	<tr>
																		<td style="height: 20px; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																			<center>
																				<p style="margin: 0px; font-size: 25px; text-align: center; color: #333; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;">${provider} account linked</p>
																			</center>
																		</td>
																	</tr>
																	<tr>
																		<td style="height: 10px; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="10">&nbsp;</td>
																	</tr>
																	<tr>
																		<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																			<center>
																				<p style="margin: 0px; font-size: 16px; text-align: center; color: #333; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;">Your ${provider} account has been linked to a Fidelight account!</p>
																			</center>
																		</td>
																	</tr>
																	<tr>
																		<td style="height: 20px; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="20">&nbsp;</td>
																	</tr>
																</table>
															</td>
															<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr>
												<td style="background: #e5e5e5; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" bgcolor="#e5e5e5">
													<table class="full_width" cellspacing="0" cellpadding="0" border="0" width="600" bgcolor="#e5e5e5" style="width: 600px; background: #e5e5e5; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
															<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																<table class="full_width" cellspacing="0" cellpadding="0" border="0" width="560" bgcolor="#fff" style="width: 560px; background: #fff; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; border-radius:5px; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td colspan="3" style="height: 20px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																		<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																			<center>
																				<p style="margin: 0px; font-size: 25px; text-align: center; color: #333; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;">Get the Fidelight app!</p>
																			</center>
																		</td>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td colspan="3" style="height: 10px; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="10">&nbsp;</td>
																	</tr>
																	<tr>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																		<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																			<center>
																				<p style="margin: 0px; font-size: 16px; text-align: center; color: #333; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;">Get the most of Fidelight by installing the mobile app. You can log in by using your existing emails address and password. </p>
																			</center>
																		</td>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td colspan="3" style="height: 20px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																		<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
																			<center>
																				<table cellspacing="0" cellpadding="0" border="0" bgcolor="#fff" style="background: #fff; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																					<tr>
																						<td width="120" style="width: 120px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
																							<a href="https://Fidelight.com">
																								<img src="https://storage.googleapis.com/fidelight-api/email/img/download_apple.png" alt="" style="width: 120px; max-width: 120px;  -ms-interpolation-mode: bicubic; border: 0; height: 40px; line-height: 100%; outline: none; text-decoration: none; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" width="120" height="40">
																							</a>
																						</td>
																						<td style="width: 15px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="15">&nbsp;</td>
																						<td width="120" style="width: 120px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
																							<a href="https://Fidelight.com">
																								<img src="https://storage.googleapis.com/fidelight-api/email/img/download_android.png" alt="" style="width: 120px; max-width: 120px;  -ms-interpolation-mode: bicubic; border: 0; height: 40px; line-height: 100%; outline: none; text-decoration: none; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" width="120" height="40">
																							</a>
																						</td>
																					</tr>
																				</table>
																			</center>
																		</td>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td colspan="3" style="height: 20px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																		<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
																			<center>
																				<table cellspacing="0" cellpadding="0" align="center" border="0" bgcolor="#fff" style="margin: 0 auto; background: #fff; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																					<tr>
																						<td style="width: 25px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="25">
																							<a href="http://twitter.com/"><img src="https://storage.googleapis.com/fidelight-api/email/img/twitter_logo.png" alt="" style="width: 25px; -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;" width="25" border="0"></a>
																						</td>
																						<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																						<td style="width: 25px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="25">
																							<a href="http://facebook.com/"><img src="https://storage.googleapis.com/fidelight-api/email/img/facebook_logo.png" alt="" style="width: 25px; -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;" width="25" border="0"></a>
																						</td>
																						<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																						<td style="width: 25px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="25">
																							<a href="http://linkedin.com/"><img src="https://storage.googleapis.com/fidelight-api/email/img/linkedin_logo.png" alt="" style="width: 25px; -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;" width="25" border="0"></a>
																						</td>
																					</tr>
																				</table>
																			</center>
																		</td>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td colspan="3" style="height: 10px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="10">&nbsp;</td>
																	</tr>
																	<tr>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																		<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																			<center>
																				<a href="https://Fidelight.com">
																					<img src="https://storage.googleapis.com/fidelight-api/email/img/name.png" alt="" style="width: 80px; max-width: 80px;  -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" width="80">
																				</a>
																			</center>
																		</td>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td colspan="3" style="height: 10px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="10">&nbsp;</td>
																	</tr>
																	<tr>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																		<td style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
																			<p style="margin: 0px; font-size: 13px; text-align: center; color: #a6a6a6; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height: 1.5;">Copyright &copy; 2021 Fidelight.co</p>
																		</td>
																		<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
																	</tr>
																	<tr>
																		<td colspan="3" style="height: 20px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="20">&nbsp;</td>
																	</tr>
																</table>
															</td>
															<td style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">&nbsp;</td>
														</tr>
													</table>
													<table class="full_width" cellspacing="0" cellpadding="0" border="0" width="600" bgcolor="#e5e5e5" align="center" style="margin: 0 auto; width: 600px; background: #e5e5e5; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td style="height: 20px; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" height="20"></td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</center>
					</td>
				</tr>
			</table>
		</body>
	</html>`;	
	return html;
}

module.exports = {
	sendEmail,
	generateEmailOptions,
	generateConfirmationEmailCompany,
	generateConfirmationEmailUser
}