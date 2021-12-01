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
	let html = `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
	<html lang="en" style='--bs-blue: #0d6efd; --bs-indigo: #6610f2; --bs-purple: #6f42c1; --bs-pink: #d63384; --bs-red: #dc3545; --bs-orange: #fd7e14; --bs-yellow: #ffc107; --bs-green: #198754; --bs-teal: #20c997; --bs-cyan: #0dcaf0; --bs-white: #fff; --bs-gray: #6c757d; --bs-gray-dark: #343a40; --bs-primary: #0d6efd; --bs-secondary: #6c757d; --bs-success: #198754; --bs-info: #0dcaf0; --bs-warning: #ffc107; --bs-danger: #dc3545; --bs-light: #f8f9fa; --bs-dark: #212529; --bs-font-sans-serif: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; --bs-font-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; --bs-gradient: linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0)); box-sizing: border-box;'>
				<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
					<meta charset="utf-8">
				  
					<title>Confirmation email fidelight</title>
					<meta name="description" content="Figma Confirmation Email">
					<meta name="author" content="fidelight">
					
					
					
					
				<style>*::before {
	box-sizing: border-box;
	}
	*::after {
	box-sizing: border-box;
	}
	body {
	margin: 0; font-family: var(--bs-font-sans-serif); font-size: 1rem; font-weight: 400; line-height: 1.5; color: #212529; background-color: #fff; -webkit-text-size-adjust: 100%; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}
	a:hover {
	color: #0a58ca;
	}
	a:not([href]):not([class]):hover {
	color: inherit; text-decoration: none;
	}
	img {
	vertical-align: middle;
	}
	button:focus:not(:focus-visible) {
	outline: 0;
	}
	.blockquote-footer::before {
	content: "— ";
	}
	.table-hover > tbody > tr:hover {
	--bs-table-accent-bg: var(--bs-table-hover-bg); color: var(--bs-table-hover-color);
	}
	.form-control:focus {
	color: #212529; background-color: #fff; border-color: #86b7fe; outline: 0; box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
	}
	.form-control:hover:not(:disabled):not([readonly])::file-selector-button {
	background-color: #dde0e3;
	}
	.form-control:hover:not(:disabled):not([readonly])::-webkit-file-upload-button {
	background-color: #dde0e3;
	}
	.form-select:focus {
	border-color: #86b7fe; outline: 0; box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
	}
	.form-check-input:active {
	filter: brightness(90%);
	}
	.form-check-input:focus {
	border-color: #86b7fe; outline: 0; box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
	}
	.form-switch .form-check-input:focus {
	background-image: url('data:image/svg+xml,%3csvg xmlns=http://www.w3.org/2000/svg viewBox=-4 -4 8 8%3e%3ccircle r=3 fill=%2386b7fe/%3e%3c/svg%3e');
	}
	.form-range:focus {
	outline: 0;
	}
	.form-range:focus::-webkit-slider-thumb {
	box-shadow: 0 0 0 1px #fff, 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
	}
	.form-range:focus::-moz-range-thumb {
	box-shadow: 0 0 0 1px #fff, 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
	}
	.form-range::-webkit-slider-thumb:active {
	background-color: #b6d4fe;
	}
	.form-range::-moz-range-thumb:active {
	background-color: #b6d4fe;
	}
	.form-floating > .form-control:focus {
	padding-top: 1.625rem; padding-bottom: 0.625rem;
	}
	.form-floating > .form-control:focus ~ label {
	opacity: 0.65; transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
	}
	.input-group > .form-control:focus {
	z-index: 3;
	}
	.input-group > .form-select:focus {
	z-index: 3;
	}
	.input-group .btn:focus {
	z-index: 3;
	}
	.was-validated .form-control:valid:focus {
	border-color: #198754; box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
	}
	.form-control.is-valid:focus {
	border-color: #198754; box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
	}
	.was-validated .form-select:valid:focus {
	border-color: #198754; box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
	}
	.form-select.is-valid:focus {
	border-color: #198754; box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
	}
	.was-validated .form-check-input:valid:focus {
	box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
	}
	.form-check-input.is-valid:focus {
	box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
	}
	.was-validated .input-group .form-control:valid:focus {
	z-index: 3;
	}
	.input-group .form-control.is-valid:focus {
	z-index: 3;
	}
	.was-validated .input-group .form-select:valid:focus {
	z-index: 3;
	}
	.input-group .form-select.is-valid:focus {
	z-index: 3;
	}
	.was-validated .form-control:invalid:focus {
	border-color: #dc3545; box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
	}
	.form-control.is-invalid:focus {
	border-color: #dc3545; box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
	}
	.was-validated .form-select:invalid:focus {
	border-color: #dc3545; box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
	}
	.form-select.is-invalid:focus {
	border-color: #dc3545; box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
	}
	.was-validated .form-check-input:invalid:focus {
	box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
	}
	.form-check-input.is-invalid:focus {
	box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
	}
	.was-validated .input-group .form-control:invalid:focus {
	z-index: 3;
	}
	.input-group .form-control.is-invalid:focus {
	z-index: 3;
	}
	.was-validated .input-group .form-select:invalid:focus {
	z-index: 3;
	}
	.input-group .form-select.is-invalid:focus {
	z-index: 3;
	}
	.btn:hover {
	color: #212529;
	}
	.btn-check:focus + .btn {
	outline: 0; box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
	}
	.btn:focus {
	outline: 0; box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
	}
	.btn-primary:hover {
	color: #fff; background-color: #0b5ed7; border-color: #0a58ca;
	}
	.btn-check:focus + .btn-primary {
	color: #fff; background-color: #0b5ed7; border-color: #0a58ca; box-shadow: 0 0 0 0.25rem rgba(49, 132, 253, 0.5);
	}
	.btn-primary:focus {
	color: #fff; background-color: #0b5ed7; border-color: #0a58ca; box-shadow: 0 0 0 0.25rem rgba(49, 132, 253, 0.5);
	}
	.btn-check:active + .btn-primary {
	color: #fff; background-color: #0a58ca; border-color: #0a53be;
	}
	.btn-primary:active {
	color: #fff; background-color: #0a58ca; border-color: #0a53be;
	}
	.btn-check:checked + .btn-primary:focus {
	box-shadow: 0 0 0 0.25rem rgba(49, 132, 253, 0.5);
	}
	.btn-check:active + .btn-primary:focus {
	box-shadow: 0 0 0 0.25rem rgba(49, 132, 253, 0.5);
	}
	.btn-primary:active:focus {
	box-shadow: 0 0 0 0.25rem rgba(49, 132, 253, 0.5);
	}
	.btn-primary.active:focus {
	box-shadow: 0 0 0 0.25rem rgba(49, 132, 253, 0.5);
	}
	.show > .btn-primary.dropdown-toggle:focus {
	box-shadow: 0 0 0 0.25rem rgba(49, 132, 253, 0.5);
	}
	.btn-secondary:hover {
	color: #fff; background-color: #5c636a; border-color: #565e64;
	}
	.btn-check:focus + .btn-secondary {
	color: #fff; background-color: #5c636a; border-color: #565e64; box-shadow: 0 0 0 0.25rem rgba(130, 138, 145, 0.5);
	}
	.btn-secondary:focus {
	color: #fff; background-color: #5c636a; border-color: #565e64; box-shadow: 0 0 0 0.25rem rgba(130, 138, 145, 0.5);
	}
	.btn-check:active + .btn-secondary {
	color: #fff; background-color: #565e64; border-color: #51585e;
	}
	.btn-secondary:active {
	color: #fff; background-color: #565e64; border-color: #51585e;
	}
	.btn-check:checked + .btn-secondary:focus {
	box-shadow: 0 0 0 0.25rem rgba(130, 138, 145, 0.5);
	}
	.btn-check:active + .btn-secondary:focus {
	box-shadow: 0 0 0 0.25rem rgba(130, 138, 145, 0.5);
	}
	.btn-secondary:active:focus {
	box-shadow: 0 0 0 0.25rem rgba(130, 138, 145, 0.5);
	}
	.btn-secondary.active:focus {
	box-shadow: 0 0 0 0.25rem rgba(130, 138, 145, 0.5);
	}
	.show > .btn-secondary.dropdown-toggle:focus {
	box-shadow: 0 0 0 0.25rem rgba(130, 138, 145, 0.5);
	}
	.btn-success:hover {
	color: #fff; background-color: #157347; border-color: #146c43;
	}
	.btn-check:focus + .btn-success {
	color: #fff; background-color: #157347; border-color: #146c43; box-shadow: 0 0 0 0.25rem rgba(60, 153, 110, 0.5);
	}
	.btn-success:focus {
	color: #fff; background-color: #157347; border-color: #146c43; box-shadow: 0 0 0 0.25rem rgba(60, 153, 110, 0.5);
	}
	.btn-check:active + .btn-success {
	color: #fff; background-color: #146c43; border-color: #13653f;
	}
	.btn-success:active {
	color: #fff; background-color: #146c43; border-color: #13653f;
	}
	.btn-check:checked + .btn-success:focus {
	box-shadow: 0 0 0 0.25rem rgba(60, 153, 110, 0.5);
	}
	.btn-check:active + .btn-success:focus {
	box-shadow: 0 0 0 0.25rem rgba(60, 153, 110, 0.5);
	}
	.btn-success:active:focus {
	box-shadow: 0 0 0 0.25rem rgba(60, 153, 110, 0.5);
	}
	.btn-success.active:focus {
	box-shadow: 0 0 0 0.25rem rgba(60, 153, 110, 0.5);
	}
	.show > .btn-success.dropdown-toggle:focus {
	box-shadow: 0 0 0 0.25rem rgba(60, 153, 110, 0.5);
	}
	.btn-info:hover {
	color: #000; background-color: #31d2f2; border-color: #25cff2;
	}
	.btn-check:focus + .btn-info {
	color: #000; background-color: #31d2f2; border-color: #25cff2; box-shadow: 0 0 0 0.25rem rgba(11, 172, 204, 0.5);
	}
	.btn-info:focus {
	color: #000; background-color: #31d2f2; border-color: #25cff2; box-shadow: 0 0 0 0.25rem rgba(11, 172, 204, 0.5);
	}
	.btn-check:active + .btn-info {
	color: #000; background-color: #3dd5f3; border-color: #25cff2;
	}
	.btn-info:active {
	color: #000; background-color: #3dd5f3; border-color: #25cff2;
	}
	.btn-check:checked + .btn-info:focus {
	box-shadow: 0 0 0 0.25rem rgba(11, 172, 204, 0.5);
	}
	.btn-check:active + .btn-info:focus {
	box-shadow: 0 0 0 0.25rem rgba(11, 172, 204, 0.5);
	}
	.btn-info:active:focus {
	box-shadow: 0 0 0 0.25rem rgba(11, 172, 204, 0.5);
	}
	.btn-info.active:focus {
	box-shadow: 0 0 0 0.25rem rgba(11, 172, 204, 0.5);
	}
	.show > .btn-info.dropdown-toggle:focus {
	box-shadow: 0 0 0 0.25rem rgba(11, 172, 204, 0.5);
	}
	.btn-warning:hover {
	color: #000; background-color: #ffca2c; border-color: #ffc720;
	}
	.btn-check:focus + .btn-warning {
	color: #000; background-color: #ffca2c; border-color: #ffc720; box-shadow: 0 0 0 0.25rem rgba(217, 164, 6, 0.5);
	}
	.btn-warning:focus {
	color: #000; background-color: #ffca2c; border-color: #ffc720; box-shadow: 0 0 0 0.25rem rgba(217, 164, 6, 0.5);
	}
	.btn-check:active + .btn-warning {
	color: #000; background-color: #ffcd39; border-color: #ffc720;
	}
	.btn-warning:active {
	color: #000; background-color: #ffcd39; border-color: #ffc720;
	}
	.btn-check:checked + .btn-warning:focus {
	box-shadow: 0 0 0 0.25rem rgba(217, 164, 6, 0.5);
	}
	.btn-check:active + .btn-warning:focus {
	box-shadow: 0 0 0 0.25rem rgba(217, 164, 6, 0.5);
	}
	.btn-warning:active:focus {
	box-shadow: 0 0 0 0.25rem rgba(217, 164, 6, 0.5);
	}
	.btn-warning.active:focus {
	box-shadow: 0 0 0 0.25rem rgba(217, 164, 6, 0.5);
	}
	.show > .btn-warning.dropdown-toggle:focus {
	box-shadow: 0 0 0 0.25rem rgba(217, 164, 6, 0.5);
	}
	.btn-danger:hover {
	color: #fff; background-color: #bb2d3b; border-color: #b02a37;
	}
	.btn-check:focus + .btn-danger {
	color: #fff; background-color: #bb2d3b; border-color: #b02a37; box-shadow: 0 0 0 0.25rem rgba(225, 83, 97, 0.5);
	}
	.btn-danger:focus {
	color: #fff; background-color: #bb2d3b; border-color: #b02a37; box-shadow: 0 0 0 0.25rem rgba(225, 83, 97, 0.5);
	}
	.btn-check:active + .btn-danger {
	color: #fff; background-color: #b02a37; border-color: #a52834;
	}
	.btn-danger:active {
	color: #fff; background-color: #b02a37; border-color: #a52834;
	}
	.btn-check:checked + .btn-danger:focus {
	box-shadow: 0 0 0 0.25rem rgba(225, 83, 97, 0.5);
	}
	.btn-check:active + .btn-danger:focus {
	box-shadow: 0 0 0 0.25rem rgba(225, 83, 97, 0.5);
	}
	.btn-danger:active:focus {
	box-shadow: 0 0 0 0.25rem rgba(225, 83, 97, 0.5);
	}
	.btn-danger.active:focus {
	box-shadow: 0 0 0 0.25rem rgba(225, 83, 97, 0.5);
	}
	.show > .btn-danger.dropdown-toggle:focus {
	box-shadow: 0 0 0 0.25rem rgba(225, 83, 97, 0.5);
	}
	.btn-light:hover {
	color: #000; background-color: #f9fafb; border-color: #f9fafb;
	}
	.btn-check:focus + .btn-light {
	color: #000; background-color: #f9fafb; border-color: #f9fafb; box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
	}
	.btn-light:focus {
	color: #000; background-color: #f9fafb; border-color: #f9fafb; box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
	}
	.btn-check:active + .btn-light {
	color: #000; background-color: #f9fafb; border-color: #f9fafb;
	}
	.btn-light:active {
	color: #000; background-color: #f9fafb; border-color: #f9fafb;
	}
	.btn-check:checked + .btn-light:focus {
	box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
	}
	.btn-check:active + .btn-light:focus {
	box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
	}
	.btn-light:active:focus {
	box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
	}
	.btn-light.active:focus {
	box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
	}
	.show > .btn-light.dropdown-toggle:focus {
	box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
	}
	.btn-dark:hover {
	color: #fff; background-color: #1c1f23; border-color: #1a1e21;
	}
	.btn-check:focus + .btn-dark {
	color: #fff; background-color: #1c1f23; border-color: #1a1e21; box-shadow: 0 0 0 0.25rem rgba(66, 70, 73, 0.5);
	}
	.btn-dark:focus {
	color: #fff; background-color: #1c1f23; border-color: #1a1e21; box-shadow: 0 0 0 0.25rem rgba(66, 70, 73, 0.5);
	}
	.btn-check:active + .btn-dark {
	color: #fff; background-color: #1a1e21; border-color: #191c1f;
	}
	.btn-dark:active {
	color: #fff; background-color: #1a1e21; border-color: #191c1f;
	}
	.btn-check:checked + .btn-dark:focus {
	box-shadow: 0 0 0 0.25rem rgba(66, 70, 73, 0.5);
	}
	.btn-check:active + .btn-dark:focus {
	box-shadow: 0 0 0 0.25rem rgba(66, 70, 73, 0.5);
	}
	.btn-dark:active:focus {
	box-shadow: 0 0 0 0.25rem rgba(66, 70, 73, 0.5);
	}
	.btn-dark.active:focus {
	box-shadow: 0 0 0 0.25rem rgba(66, 70, 73, 0.5);
	}
	.show > .btn-dark.dropdown-toggle:focus {
	box-shadow: 0 0 0 0.25rem rgba(66, 70, 73, 0.5);
	}
	.btn-outline-primary:hover {
	color: #fff; background-color: #0d6efd; border-color: #0d6efd;
	}
	.btn-check:focus + .btn-outline-primary {
	box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.5);
	}
	.btn-outline-primary:focus {
	box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.5);
	}
	.btn-check:active + .btn-outline-primary {
	color: #fff; background-color: #0d6efd; border-color: #0d6efd;
	}
	.btn-outline-primary:active {
	color: #fff; background-color: #0d6efd; border-color: #0d6efd;
	}
	.btn-check:checked + .btn-outline-primary:focus {
	box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.5);
	}
	.btn-check:active + .btn-outline-primary:focus {
	box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.5);
	}
	.btn-outline-primary:active:focus {
	box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.5);
	}
	.btn-outline-primary.active:focus {
	box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.5);
	}
	.btn-outline-primary.dropdown-toggle.show:focus {
	box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.5);
	}
	.btn-outline-secondary:hover {
	color: #fff; background-color: #6c757d; border-color: #6c757d;
	}
	.btn-check:focus + .btn-outline-secondary {
	box-shadow: 0 0 0 0.25rem rgba(108, 117, 125, 0.5);
	}
	.btn-outline-secondary:focus {
	box-shadow: 0 0 0 0.25rem rgba(108, 117, 125, 0.5);
	}
	.btn-check:active + .btn-outline-secondary {
	color: #fff; background-color: #6c757d; border-color: #6c757d;
	}
	.btn-outline-secondary:active {
	color: #fff; background-color: #6c757d; border-color: #6c757d;
	}
	.btn-check:checked + .btn-outline-secondary:focus {
	box-shadow: 0 0 0 0.25rem rgba(108, 117, 125, 0.5);
	}
	.btn-check:active + .btn-outline-secondary:focus {
	box-shadow: 0 0 0 0.25rem rgba(108, 117, 125, 0.5);
	}
	.btn-outline-secondary:active:focus {
	box-shadow: 0 0 0 0.25rem rgba(108, 117, 125, 0.5);
	}
	.btn-outline-secondary.active:focus {
	box-shadow: 0 0 0 0.25rem rgba(108, 117, 125, 0.5);
	}
	.btn-outline-secondary.dropdown-toggle.show:focus {
	box-shadow: 0 0 0 0.25rem rgba(108, 117, 125, 0.5);
	}
	.btn-outline-success:hover {
	color: #fff; background-color: #198754; border-color: #198754;
	}
	.btn-check:focus + .btn-outline-success {
	box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.5);
	}
	.btn-outline-success:focus {
	box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.5);
	}
	.btn-check:active + .btn-outline-success {
	color: #fff; background-color: #198754; border-color: #198754;
	}
	.btn-outline-success:active {
	color: #fff; background-color: #198754; border-color: #198754;
	}
	.btn-check:checked + .btn-outline-success:focus {
	box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.5);
	}
	.btn-check:active + .btn-outline-success:focus {
	box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.5);
	}
	.btn-outline-success:active:focus {
	box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.5);
	}
	.btn-outline-success.active:focus {
	box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.5);
	}
	.btn-outline-success.dropdown-toggle.show:focus {
	box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.5);
	}
	.btn-outline-info:hover {
	color: #000; background-color: #0dcaf0; border-color: #0dcaf0;
	}
	.btn-check:focus + .btn-outline-info {
	box-shadow: 0 0 0 0.25rem rgba(13, 202, 240, 0.5);
	}
	.btn-outline-info:focus {
	box-shadow: 0 0 0 0.25rem rgba(13, 202, 240, 0.5);
	}
	.btn-check:active + .btn-outline-info {
	color: #000; background-color: #0dcaf0; border-color: #0dcaf0;
	}
	.btn-outline-info:active {
	color: #000; background-color: #0dcaf0; border-color: #0dcaf0;
	}
	.btn-check:checked + .btn-outline-info:focus {
	box-shadow: 0 0 0 0.25rem rgba(13, 202, 240, 0.5);
	}
	.btn-check:active + .btn-outline-info:focus {
	box-shadow: 0 0 0 0.25rem rgba(13, 202, 240, 0.5);
	}
	.btn-outline-info:active:focus {
	box-shadow: 0 0 0 0.25rem rgba(13, 202, 240, 0.5);
	}
	.btn-outline-info.active:focus {
	box-shadow: 0 0 0 0.25rem rgba(13, 202, 240, 0.5);
	}
	.btn-outline-info.dropdown-toggle.show:focus {
	box-shadow: 0 0 0 0.25rem rgba(13, 202, 240, 0.5);
	}
	.btn-outline-warning:hover {
	color: #000; background-color: #ffc107; border-color: #ffc107;
	}
	.btn-check:focus + .btn-outline-warning {
	box-shadow: 0 0 0 0.25rem rgba(255, 193, 7, 0.5);
	}
	.btn-outline-warning:focus {
	box-shadow: 0 0 0 0.25rem rgba(255, 193, 7, 0.5);
	}
	.btn-check:active + .btn-outline-warning {
	color: #000; background-color: #ffc107; border-color: #ffc107;
	}
	.btn-outline-warning:active {
	color: #000; background-color: #ffc107; border-color: #ffc107;
	}
	.btn-check:checked + .btn-outline-warning:focus {
	box-shadow: 0 0 0 0.25rem rgba(255, 193, 7, 0.5);
	}
	.btn-check:active + .btn-outline-warning:focus {
	box-shadow: 0 0 0 0.25rem rgba(255, 193, 7, 0.5);
	}
	.btn-outline-warning:active:focus {
	box-shadow: 0 0 0 0.25rem rgba(255, 193, 7, 0.5);
	}
	.btn-outline-warning.active:focus {
	box-shadow: 0 0 0 0.25rem rgba(255, 193, 7, 0.5);
	}
	.btn-outline-warning.dropdown-toggle.show:focus {
	box-shadow: 0 0 0 0.25rem rgba(255, 193, 7, 0.5);
	}
	.btn-outline-danger:hover {
	color: #fff; background-color: #dc3545; border-color: #dc3545;
	}
	.btn-check:focus + .btn-outline-danger {
	box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.5);
	}
	.btn-outline-danger:focus {
	box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.5);
	}
	.btn-check:active + .btn-outline-danger {
	color: #fff; background-color: #dc3545; border-color: #dc3545;
	}
	.btn-outline-danger:active {
	color: #fff; background-color: #dc3545; border-color: #dc3545;
	}
	.btn-check:checked + .btn-outline-danger:focus {
	box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.5);
	}
	.btn-check:active + .btn-outline-danger:focus {
	box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.5);
	}
	.btn-outline-danger:active:focus {
	box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.5);
	}
	.btn-outline-danger.active:focus {
	box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.5);
	}
	.btn-outline-danger.dropdown-toggle.show:focus {
	box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.5);
	}
	.btn-outline-light:hover {
	color: #000; background-color: #f8f9fa; border-color: #f8f9fa;
	}
	.btn-check:focus + .btn-outline-light {
	box-shadow: 0 0 0 0.25rem rgba(248, 249, 250, 0.5);
	}
	.btn-outline-light:focus {
	box-shadow: 0 0 0 0.25rem rgba(248, 249, 250, 0.5);
	}
	.btn-check:active + .btn-outline-light {
	color: #000; background-color: #f8f9fa; border-color: #f8f9fa;
	}
	.btn-outline-light:active {
	color: #000; background-color: #f8f9fa; border-color: #f8f9fa;
	}
	.btn-check:checked + .btn-outline-light:focus {
	box-shadow: 0 0 0 0.25rem rgba(248, 249, 250, 0.5);
	}
	.btn-check:active + .btn-outline-light:focus {
	box-shadow: 0 0 0 0.25rem rgba(248, 249, 250, 0.5);
	}
	.btn-outline-light:active:focus {
	box-shadow: 0 0 0 0.25rem rgba(248, 249, 250, 0.5);
	}
	.btn-outline-light.active:focus {
	box-shadow: 0 0 0 0.25rem rgba(248, 249, 250, 0.5);
	}
	.btn-outline-light.dropdown-toggle.show:focus {
	box-shadow: 0 0 0 0.25rem rgba(248, 249, 250, 0.5);
	}
	.btn-outline-dark:hover {
	color: #fff; background-color: #212529; border-color: #212529;
	}
	.btn-check:focus + .btn-outline-dark {
	box-shadow: 0 0 0 0.25rem rgba(33, 37, 41, 0.5);
	}
	.btn-outline-dark:focus {
	box-shadow: 0 0 0 0.25rem rgba(33, 37, 41, 0.5);
	}
	.btn-check:active + .btn-outline-dark {
	color: #fff; background-color: #212529; border-color: #212529;
	}
	.btn-outline-dark:active {
	color: #fff; background-color: #212529; border-color: #212529;
	}
	.btn-check:checked + .btn-outline-dark:focus {
	box-shadow: 0 0 0 0.25rem rgba(33, 37, 41, 0.5);
	}
	.btn-check:active + .btn-outline-dark:focus {
	box-shadow: 0 0 0 0.25rem rgba(33, 37, 41, 0.5);
	}
	.btn-outline-dark:active:focus {
	box-shadow: 0 0 0 0.25rem rgba(33, 37, 41, 0.5);
	}
	.btn-outline-dark.active:focus {
	box-shadow: 0 0 0 0.25rem rgba(33, 37, 41, 0.5);
	}
	.btn-outline-dark.dropdown-toggle.show:focus {
	box-shadow: 0 0 0 0.25rem rgba(33, 37, 41, 0.5);
	}
	.btn-link:hover {
	color: #0a58ca;
	}
	.dropdown-toggle::after {
	display: inline-block; margin-left: 0.255em; vertical-align: 0.255em; content: ""; border-top: 0.3em solid; border-right: 0.3em solid transparent; border-bottom: 0; border-left: 0.3em solid transparent;
	}
	.dropdown-toggle:empty::after {
	margin-left: 0;
	}
	.dropup .dropdown-toggle::after {
	display: inline-block; margin-left: 0.255em; vertical-align: 0.255em; content: ""; border-top: 0; border-right: 0.3em solid transparent; border-bottom: 0.3em solid; border-left: 0.3em solid transparent;
	}
	.dropup .dropdown-toggle:empty::after {
	margin-left: 0;
	}
	.dropend .dropdown-toggle::after {
	display: inline-block; margin-left: 0.255em; vertical-align: 0.255em; content: ""; border-top: 0.3em solid transparent; border-right: 0; border-bottom: 0.3em solid transparent; border-left: 0.3em solid;
	}
	.dropend .dropdown-toggle:empty::after {
	margin-left: 0;
	}
	.dropend .dropdown-toggle::after {
	vertical-align: 0;
	}
	.dropstart .dropdown-toggle::after {
	display: inline-block; margin-left: 0.255em; vertical-align: 0.255em; content: "";
	}
	.dropstart .dropdown-toggle::after {
	display: none;
	}
	.dropstart .dropdown-toggle::before {
	display: inline-block; margin-right: 0.255em; vertical-align: 0.255em; content: ""; border-top: 0.3em solid transparent; border-right: 0.3em solid; border-bottom: 0.3em solid transparent;
	}
	.dropstart .dropdown-toggle:empty::after {
	margin-left: 0;
	}
	.dropstart .dropdown-toggle::before {
	vertical-align: 0;
	}
	.dropdown-item:hover {
	color: #1e2125; background-color: #e9ecef;
	}
	.dropdown-item:focus {
	color: #1e2125; background-color: #e9ecef;
	}
	.dropdown-item:active {
	color: #fff; text-decoration: none; background-color: #0d6efd;
	}
	.dropdown-menu-dark .dropdown-item:hover {
	color: #fff; background-color: rgba(255, 255, 255, 0.15);
	}
	.dropdown-menu-dark .dropdown-item:focus {
	color: #fff; background-color: rgba(255, 255, 255, 0.15);
	}
	.dropdown-menu-dark .dropdown-item:active {
	color: #fff; background-color: #0d6efd;
	}
	.btn-group > .btn-check:focus + .btn {
	z-index: 1;
	}
	.btn-group > .btn:hover {
	z-index: 1;
	}
	.btn-group > .btn:focus {
	z-index: 1;
	}
	.btn-group > .btn:active {
	z-index: 1;
	}
	.btn-group-vertical > .btn-check:focus + .btn {
	z-index: 1;
	}
	.btn-group-vertical > .btn:hover {
	z-index: 1;
	}
	.btn-group-vertical > .btn:focus {
	z-index: 1;
	}
	.btn-group-vertical > .btn:active {
	z-index: 1;
	}
	.dropdown-toggle-split::after {
	margin-left: 0;
	}
	.dropup .dropdown-toggle-split::after {
	margin-left: 0;
	}
	.dropend .dropdown-toggle-split::after {
	margin-left: 0;
	}
	.dropstart .dropdown-toggle-split::before {
	margin-right: 0;
	}
	.nav-link:hover {
	color: #0a58ca;
	}
	.nav-link:focus {
	color: #0a58ca;
	}
	.nav-tabs .nav-link:hover {
	border-color: #e9ecef #e9ecef #dee2e6; isolation: isolate;
	}
	.nav-tabs .nav-link:focus {
	border-color: #e9ecef #e9ecef #dee2e6; isolation: isolate;
	}
	.navbar-toggler:hover {
	text-decoration: none;
	}
	.navbar-toggler:focus {
	text-decoration: none; outline: 0; box-shadow: 0 0 0 0.25rem;
	}
	.navbar-light .navbar-brand:hover {
	color: rgba(0, 0, 0, 0.9);
	}
	.navbar-light .navbar-brand:focus {
	color: rgba(0, 0, 0, 0.9);
	}
	.navbar-light .navbar-nav .nav-link:hover {
	color: rgba(0, 0, 0, 0.7);
	}
	.navbar-light .navbar-nav .nav-link:focus {
	color: rgba(0, 0, 0, 0.7);
	}
	.navbar-light .navbar-text a:hover {
	color: rgba(0, 0, 0, 0.9);
	}
	.navbar-light .navbar-text a:focus {
	color: rgba(0, 0, 0, 0.9);
	}
	.navbar-dark .navbar-brand:hover {
	color: #fff;
	}
	.navbar-dark .navbar-brand:focus {
	color: #fff;
	}
	.navbar-dark .navbar-nav .nav-link:hover {
	color: rgba(255, 255, 255, 0.75);
	}
	.navbar-dark .navbar-nav .nav-link:focus {
	color: rgba(255, 255, 255, 0.75);
	}
	.navbar-dark .navbar-text a:hover {
	color: #fff;
	}
	.navbar-dark .navbar-text a:focus {
	color: #fff;
	}
	.card-link:hover {
	text-decoration: none;
	}
	.accordion-button:not(.collapsed)::after {
	background-image: url('data:image/svg+xml,%3csvg xmlns=http://www.w3.org/2000/svg viewBox=0 0 16 16 fill=%230c63e4%3e%3cpath fill-rule=evenodd d=M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z/%3e%3c/svg%3e'); transform: rotate(-180deg);
	}
	.accordion-button::after {
	flex-shrink: 0; width: 1.25rem; height: 1.25rem; margin-left: auto; content: ""; background-image: url('data:image/svg+xml,%3csvg xmlns=http://www.w3.org/2000/svg viewBox=0 0 16 16 fill=%23212529%3e%3cpath fill-rule=evenodd d=M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z/%3e%3c/svg%3e'); background-repeat: no-repeat; background-size: 1.25rem; transition: transform 0.2s ease-in-out;
	}
	.accordion-button:hover {
	z-index: 2;
	}
	.accordion-button:focus {
	z-index: 3; border-color: #86b7fe; outline: 0; box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
	}
	.breadcrumb-item + .breadcrumb-item::before {
	float: left; padding-right: 0.5rem; color: #6c757d; content: var(--bs-breadcrumb-divider, "/");
	}
	.page-link:hover {
	z-index: 2; color: #0a58ca; background-color: #e9ecef; border-color: #dee2e6;
	}
	.page-link:focus {
	z-index: 3; color: #0a58ca; background-color: #e9ecef; outline: 0; box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
	}
	@-webkit-keyframes progress-bar-stripes {
	
	}
	@keyframes progress-bar-stripes {
	
	}
	.list-group-numbered > li::before {
	content: counters(section, ".") ". "; counter-increment: section;
	}
	.list-group-item-action:hover {
	z-index: 1; color: #495057; text-decoration: none; background-color: #f8f9fa;
	}
	.list-group-item-action:focus {
	z-index: 1; color: #495057; text-decoration: none; background-color: #f8f9fa;
	}
	.list-group-item-action:active {
	color: #212529; background-color: #e9ecef;
	}
	.list-group-item-primary.list-group-item-action:hover {
	color: #084298; background-color: #bacbe6;
	}
	.list-group-item-primary.list-group-item-action:focus {
	color: #084298; background-color: #bacbe6;
	}
	.list-group-item-secondary.list-group-item-action:hover {
	color: #41464b; background-color: #cbccce;
	}
	.list-group-item-secondary.list-group-item-action:focus {
	color: #41464b; background-color: #cbccce;
	}
	.list-group-item-success.list-group-item-action:hover {
	color: #0f5132; background-color: #bcd0c7;
	}
	.list-group-item-success.list-group-item-action:focus {
	color: #0f5132; background-color: #bcd0c7;
	}
	.list-group-item-info.list-group-item-action:hover {
	color: #055160; background-color: #badce3;
	}
	.list-group-item-info.list-group-item-action:focus {
	color: #055160; background-color: #badce3;
	}
	.list-group-item-warning.list-group-item-action:hover {
	color: #664d03; background-color: #e6dbb9;
	}
	.list-group-item-warning.list-group-item-action:focus {
	color: #664d03; background-color: #e6dbb9;
	}
	.list-group-item-danger.list-group-item-action:hover {
	color: #842029; background-color: #dfc2c4;
	}
	.list-group-item-danger.list-group-item-action:focus {
	color: #842029; background-color: #dfc2c4;
	}
	.list-group-item-light.list-group-item-action:hover {
	color: #636464; background-color: #e5e5e5;
	}
	.list-group-item-light.list-group-item-action:focus {
	color: #636464; background-color: #e5e5e5;
	}
	.list-group-item-dark.list-group-item-action:hover {
	color: #141619; background-color: #bebebf;
	}
	.list-group-item-dark.list-group-item-action:focus {
	color: #141619; background-color: #bebebf;
	}
	.btn-close:hover {
	color: #000; text-decoration: none; opacity: 0.75;
	}
	.btn-close:focus {
	outline: 0; box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25); opacity: 1;
	}
	.tooltip .tooltip-arrow::before {
	position: absolute; content: ""; border-color: transparent; border-style: solid;
	}
	.bs-tooltip-top .tooltip-arrow::before {
	top: -1px; border-width: 0.4rem 0.4rem 0; border-top-color: #000;
	}
	.bs-tooltip-auto[data-popper-placement^=top] .tooltip-arrow::before {
	top: -1px; border-width: 0.4rem 0.4rem 0; border-top-color: #000;
	}
	.bs-tooltip-end .tooltip-arrow::before {
	right: -1px; border-width: 0.4rem 0.4rem 0.4rem 0; border-right-color: #000;
	}
	.bs-tooltip-auto[data-popper-placement^=right] .tooltip-arrow::before {
	right: -1px; border-width: 0.4rem 0.4rem 0.4rem 0; border-right-color: #000;
	}
	.bs-tooltip-bottom .tooltip-arrow::before {
	bottom: -1px; border-width: 0 0.4rem 0.4rem; border-bottom-color: #000;
	}
	.bs-tooltip-auto[data-popper-placement^=bottom] .tooltip-arrow::before {
	bottom: -1px; border-width: 0 0.4rem 0.4rem; border-bottom-color: #000;
	}
	.bs-tooltip-start .tooltip-arrow::before {
	left: -1px; border-width: 0.4rem 0 0.4rem 0.4rem; border-left-color: #000;
	}
	.bs-tooltip-auto[data-popper-placement^=left] .tooltip-arrow::before {
	left: -1px; border-width: 0.4rem 0 0.4rem 0.4rem; border-left-color: #000;
	}
	.popover .popover-arrow::before {
	position: absolute; display: block; content: ""; border-color: transparent; border-style: solid;
	}
	.popover .popover-arrow::after {
	position: absolute; display: block; content: ""; border-color: transparent; border-style: solid;
	}
	.bs-popover-top > .popover-arrow::before {
	bottom: 0; border-width: 0.5rem 0.5rem 0; border-top-color: rgba(0, 0, 0, 0.25);
	}
	.bs-popover-auto[data-popper-placement^=top] > .popover-arrow::before {
	bottom: 0; border-width: 0.5rem 0.5rem 0; border-top-color: rgba(0, 0, 0, 0.25);
	}
	.bs-popover-top > .popover-arrow::after {
	bottom: 1px; border-width: 0.5rem 0.5rem 0; border-top-color: #fff;
	}
	.bs-popover-auto[data-popper-placement^=top] > .popover-arrow::after {
	bottom: 1px; border-width: 0.5rem 0.5rem 0; border-top-color: #fff;
	}
	.bs-popover-end > .popover-arrow::before {
	left: 0; border-width: 0.5rem 0.5rem 0.5rem 0; border-right-color: rgba(0, 0, 0, 0.25);
	}
	.bs-popover-auto[data-popper-placement^=right] > .popover-arrow::before {
	left: 0; border-width: 0.5rem 0.5rem 0.5rem 0; border-right-color: rgba(0, 0, 0, 0.25);
	}
	.bs-popover-end > .popover-arrow::after {
	left: 1px; border-width: 0.5rem 0.5rem 0.5rem 0; border-right-color: #fff;
	}
	.bs-popover-auto[data-popper-placement^=right] > .popover-arrow::after {
	left: 1px; border-width: 0.5rem 0.5rem 0.5rem 0; border-right-color: #fff;
	}
	.bs-popover-bottom > .popover-arrow::before {
	top: 0; border-width: 0 0.5rem 0.5rem 0.5rem; border-bottom-color: rgba(0, 0, 0, 0.25);
	}
	.bs-popover-auto[data-popper-placement^=bottom] > .popover-arrow::before {
	top: 0; border-width: 0 0.5rem 0.5rem 0.5rem; border-bottom-color: rgba(0, 0, 0, 0.25);
	}
	.bs-popover-bottom > .popover-arrow::after {
	top: 1px; border-width: 0 0.5rem 0.5rem 0.5rem; border-bottom-color: #fff;
	}
	.bs-popover-auto[data-popper-placement^=bottom] > .popover-arrow::after {
	top: 1px; border-width: 0 0.5rem 0.5rem 0.5rem; border-bottom-color: #fff;
	}
	.bs-popover-bottom .popover-header::before {
	position: absolute; top: 0; left: 50%; display: block; width: 1rem; margin-left: -0.5rem; content: ""; border-bottom: 1px solid #f0f0f0;
	}
	.bs-popover-auto[data-popper-placement^=bottom] .popover-header::before {
	position: absolute; top: 0; left: 50%; display: block; width: 1rem; margin-left: -0.5rem; content: ""; border-bottom: 1px solid #f0f0f0;
	}
	.bs-popover-start > .popover-arrow::before {
	right: 0; border-width: 0.5rem 0 0.5rem 0.5rem; border-left-color: rgba(0, 0, 0, 0.25);
	}
	.bs-popover-auto[data-popper-placement^=left] > .popover-arrow::before {
	right: 0; border-width: 0.5rem 0 0.5rem 0.5rem; border-left-color: rgba(0, 0, 0, 0.25);
	}
	.bs-popover-start > .popover-arrow::after {
	right: 1px; border-width: 0.5rem 0 0.5rem 0.5rem; border-left-color: #fff;
	}
	.bs-popover-auto[data-popper-placement^=left] > .popover-arrow::after {
	right: 1px; border-width: 0.5rem 0 0.5rem 0.5rem; border-left-color: #fff;
	}
	.carousel-inner::after {
	display: block; clear: both; content: "";
	}
	.carousel-control-prev:hover {
	color: #fff; text-decoration: none; outline: 0; opacity: 0.9;
	}
	.carousel-control-prev:focus {
	color: #fff; text-decoration: none; outline: 0; opacity: 0.9;
	}
	.carousel-control-next:hover {
	color: #fff; text-decoration: none; outline: 0; opacity: 0.9;
	}
	.carousel-control-next:focus {
	color: #fff; text-decoration: none; outline: 0; opacity: 0.9;
	}
	@-webkit-keyframes spinner-border {
	
	}
	@keyframes spinner-border {
	
	}
	@-webkit-keyframes spinner-grow {
	
	}
	@keyframes spinner-grow {
	
	}
	.clearfix::after {
	display: block; clear: both; content: "";
	}
	.link-primary:hover {
	color: #0a58ca;
	}
	.link-primary:focus {
	color: #0a58ca;
	}
	.link-secondary:hover {
	color: #565e64;
	}
	.link-secondary:focus {
	color: #565e64;
	}
	.link-success:hover {
	color: #146c43;
	}
	.link-success:focus {
	color: #146c43;
	}
	.link-info:hover {
	color: #3dd5f3;
	}
	.link-info:focus {
	color: #3dd5f3;
	}
	.link-warning:hover {
	color: #ffcd39;
	}
	.link-warning:focus {
	color: #ffcd39;
	}
	.link-danger:hover {
	color: #b02a37;
	}
	.link-danger:focus {
	color: #b02a37;
	}
	.link-light:hover {
	color: #f9fafb;
	}
	.link-light:focus {
	color: #f9fafb;
	}
	.link-dark:hover {
	color: #1a1e21;
	}
	.link-dark:focus {
	color: #1a1e21;
	}
	.ratio::before {
	display: block; padding-top: var(--bs-aspect-ratio); content: "";
	}
	.visually-hidden-focusable:not(:focus):not(:focus-within) {
	position: absolute !important; width: 1px !important; height: 1px !important; padding: 0 !important; margin: -1px !important; overflow: hidden !important; clip: rect(0, 0, 0, 0) !important; white-space: nowrap !important; border: 0 !important;
	}
	.stretched-link::after {
	position: absolute; top: 0; right: 0; bottom: 0; left: 0; z-index: 1; content: "";
	}
	@font-face {
	font-family: 'Inter'; font-style: normal; font-weight: 400; font-display: swap; src: url('https://fonts.gstatic.com/s/inter/v7/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjQ.ttf') format('truetype');
	}
	body {
	width: 100%; align-content: center; justify-content: center; background: #E5E5E5; display: flex;
	}
	body {
	width: 100%; align-content: center; justify-content: center; background: #E5E5E5; display: flex;
	}
	@media (prefers-reduced-motion: no-preference) {
	  :root {
		scroll-behavior: smooth;
	  }
	}
	@media (min-width: 1200px) {
	  h1 {
		font-size: 2.5rem;
	  }
	  .h1 {
		font-size: 2.5rem;
	  }
	  h2 {
		font-size: 2rem;
	  }
	  .h2 {
		font-size: 2rem;
	  }
	  h3 {
		font-size: 1.75rem;
	  }
	  .h3 {
		font-size: 1.75rem;
	  }
	  h4 {
		font-size: 1.5rem;
	  }
	  .h4 {
		font-size: 1.5rem;
	  }
	  legend {
		font-size: 1.5rem;
	  }
	  .display-1 {
		font-size: 5rem;
	  }
	  .display-2 {
		font-size: 4.5rem;
	  }
	  .display-3 {
		font-size: 4rem;
	  }
	  .display-4 {
		font-size: 3.5rem;
	  }
	  .display-5 {
		font-size: 3rem;
	  }
	  .display-6 {
		font-size: 2.5rem;
	  }
	  .container-xl {
		max-width: 1140px;
	  }
	  .container-lg {
		max-width: 1140px;
	  }
	  .container-md {
		max-width: 1140px;
	  }
	  .container-sm {
		max-width: 1140px;
	  }
	  .container {
		max-width: 1140px;
	  }
	  .col-xl {
		flex: 1 0 0%;
	  }
	  .row-cols-xl-auto > * {
		flex: 0 0 auto; width: auto;
	  }
	  .row-cols-xl-1 > * {
		flex: 0 0 auto; width: 100%;
	  }
	  .row-cols-xl-2 > * {
		flex: 0 0 auto; width: 50%;
	  }
	  .row-cols-xl-3 > * {
		flex: 0 0 auto; width: 33.3333333333%;
	  }
	  .row-cols-xl-4 > * {
		flex: 0 0 auto; width: 25%;
	  }
	  .row-cols-xl-5 > * {
		flex: 0 0 auto; width: 20%;
	  }
	  .row-cols-xl-6 > * {
		flex: 0 0 auto; width: 16.6666666667%;
	  }
	  .col-xl-auto {
		flex: 0 0 auto; width: auto;
	  }
	  .col-xl-1 {
		flex: 0 0 auto; width: 8.33333333%;
	  }
	  .col-xl-2 {
		flex: 0 0 auto; width: 16.66666667%;
	  }
	  .col-xl-3 {
		flex: 0 0 auto; width: 25%;
	  }
	  .col-xl-4 {
		flex: 0 0 auto; width: 33.33333333%;
	  }
	  .col-xl-5 {
		flex: 0 0 auto; width: 41.66666667%;
	  }
	  .col-xl-6 {
		flex: 0 0 auto; width: 50%;
	  }
	  .col-xl-7 {
		flex: 0 0 auto; width: 58.33333333%;
	  }
	  .col-xl-8 {
		flex: 0 0 auto; width: 66.66666667%;
	  }
	  .col-xl-9 {
		flex: 0 0 auto; width: 75%;
	  }
	  .col-xl-10 {
		flex: 0 0 auto; width: 83.33333333%;
	  }
	  .col-xl-11 {
		flex: 0 0 auto; width: 91.66666667%;
	  }
	  .col-xl-12 {
		flex: 0 0 auto; width: 100%;
	  }
	  .offset-xl-0 {
		margin-left: 0;
	  }
	  .offset-xl-1 {
		margin-left: 8.33333333%;
	  }
	  .offset-xl-2 {
		margin-left: 16.66666667%;
	  }
	  .offset-xl-3 {
		margin-left: 25%;
	  }
	  .offset-xl-4 {
		margin-left: 33.33333333%;
	  }
	  .offset-xl-5 {
		margin-left: 41.66666667%;
	  }
	  .offset-xl-6 {
		margin-left: 50%;
	  }
	  .offset-xl-7 {
		margin-left: 58.33333333%;
	  }
	  .offset-xl-8 {
		margin-left: 66.66666667%;
	  }
	  .offset-xl-9 {
		margin-left: 75%;
	  }
	  .offset-xl-10 {
		margin-left: 83.33333333%;
	  }
	  .offset-xl-11 {
		margin-left: 91.66666667%;
	  }
	  .g-xl-0 {
		--bs-gutter-x: 0;
	  }
	  .gx-xl-0 {
		--bs-gutter-x: 0;
	  }
	  .g-xl-0 {
		--bs-gutter-y: 0;
	  }
	  .gy-xl-0 {
		--bs-gutter-y: 0;
	  }
	  .g-xl-1 {
		--bs-gutter-x: 0.25rem;
	  }
	  .gx-xl-1 {
		--bs-gutter-x: 0.25rem;
	  }
	  .g-xl-1 {
		--bs-gutter-y: 0.25rem;
	  }
	  .gy-xl-1 {
		--bs-gutter-y: 0.25rem;
	  }
	  .g-xl-2 {
		--bs-gutter-x: 0.5rem;
	  }
	  .gx-xl-2 {
		--bs-gutter-x: 0.5rem;
	  }
	  .g-xl-2 {
		--bs-gutter-y: 0.5rem;
	  }
	  .gy-xl-2 {
		--bs-gutter-y: 0.5rem;
	  }
	  .g-xl-3 {
		--bs-gutter-x: 1rem;
	  }
	  .gx-xl-3 {
		--bs-gutter-x: 1rem;
	  }
	  .g-xl-3 {
		--bs-gutter-y: 1rem;
	  }
	  .gy-xl-3 {
		--bs-gutter-y: 1rem;
	  }
	  .g-xl-4 {
		--bs-gutter-x: 1.5rem;
	  }
	  .gx-xl-4 {
		--bs-gutter-x: 1.5rem;
	  }
	  .g-xl-4 {
		--bs-gutter-y: 1.5rem;
	  }
	  .gy-xl-4 {
		--bs-gutter-y: 1.5rem;
	  }
	  .g-xl-5 {
		--bs-gutter-x: 3rem;
	  }
	  .gx-xl-5 {
		--bs-gutter-x: 3rem;
	  }
	  .g-xl-5 {
		--bs-gutter-y: 3rem;
	  }
	  .gy-xl-5 {
		--bs-gutter-y: 3rem;
	  }
	  .dropdown-menu-xl-start {
		--bs-position: start;
	  }
	  .dropdown-menu-xl-start[data-bs-popper] {
		right: auto; left: 0;
	  }
	  .dropdown-menu-xl-end {
		--bs-position: end;
	  }
	  .dropdown-menu-xl-end[data-bs-popper] {
		right: 0; left: auto;
	  }
	  .navbar-expand-xl {
		flex-wrap: nowrap; justify-content: flex-start;
	  }
	  .navbar-expand-xl .navbar-nav {
		flex-direction: row;
	  }
	  .navbar-expand-xl .navbar-nav .dropdown-menu {
		position: absolute;
	  }
	  .navbar-expand-xl .navbar-nav .nav-link {
		padding-right: 0.5rem; padding-left: 0.5rem;
	  }
	  .navbar-expand-xl .navbar-nav-scroll {
		overflow: visible;
	  }
	  .navbar-expand-xl .navbar-collapse {
		display: flex !important; flex-basis: auto;
	  }
	  .navbar-expand-xl .navbar-toggler {
		display: none;
	  }
	  .list-group-horizontal-xl {
		flex-direction: row;
	  }
	  .list-group-horizontal-xl > .list-group-item:first-child {
		border-bottom-left-radius: 0.25rem; border-top-right-radius: 0;
	  }
	  .list-group-horizontal-xl > .list-group-item:last-child {
		border-top-right-radius: 0.25rem; border-bottom-left-radius: 0;
	  }
	  .list-group-horizontal-xl > .list-group-item.active {
		margin-top: 0;
	  }
	  .list-group-horizontal-xl > .list-group-item + .list-group-item {
		border-top-width: 1px; border-left-width: 0;
	  }
	  .list-group-horizontal-xl > .list-group-item + .list-group-item.active {
		margin-left: -1px; border-left-width: 1px;
	  }
	  .modal-xl {
		max-width: 1140px;
	  }
	  .sticky-xl-top {
		position: sticky; top: 0; z-index: 1020;
	  }
	  .float-xl-start {
		float: left !important;
	  }
	  .float-xl-end {
		float: right !important;
	  }
	  .float-xl-none {
		float: none !important;
	  }
	  .d-xl-inline {
		display: inline !important;
	  }
	  .d-xl-inline-block {
		display: inline-block !important;
	  }
	  .d-xl-block {
		display: block !important;
	  }
	  .d-xl-grid {
		display: grid !important;
	  }
	  .d-xl-table {
		display: table !important;
	  }
	  .d-xl-table-row {
		display: table-row !important;
	  }
	  .d-xl-table-cell {
		display: table-cell !important;
	  }
	  .d-xl-flex {
		display: flex !important;
	  }
	  .d-xl-inline-flex {
		display: inline-flex !important;
	  }
	  .d-xl-none {
		display: none !important;
	  }
	  .flex-xl-fill {
		flex: 1 1 auto !important;
	  }
	  .flex-xl-row {
		flex-direction: row !important;
	  }
	  .flex-xl-column {
		flex-direction: column !important;
	  }
	  .flex-xl-row-reverse {
		flex-direction: row-reverse !important;
	  }
	  .flex-xl-column-reverse {
		flex-direction: column-reverse !important;
	  }
	  .flex-xl-grow-0 {
		flex-grow: 0 !important;
	  }
	  .flex-xl-grow-1 {
		flex-grow: 1 !important;
	  }
	  .flex-xl-shrink-0 {
		flex-shrink: 0 !important;
	  }
	  .flex-xl-shrink-1 {
		flex-shrink: 1 !important;
	  }
	  .flex-xl-wrap {
		flex-wrap: wrap !important;
	  }
	  .flex-xl-nowrap {
		flex-wrap: nowrap !important;
	  }
	  .flex-xl-wrap-reverse {
		flex-wrap: wrap-reverse !important;
	  }
	  .gap-xl-0 {
		gap: 0 !important;
	  }
	  .gap-xl-1 {
		gap: 0.25rem !important;
	  }
	  .gap-xl-2 {
		gap: 0.5rem !important;
	  }
	  .gap-xl-3 {
		gap: 1rem !important;
	  }
	  .gap-xl-4 {
		gap: 1.5rem !important;
	  }
	  .gap-xl-5 {
		gap: 3rem !important;
	  }
	  .justify-content-xl-start {
		justify-content: flex-start !important;
	  }
	  .justify-content-xl-end {
		justify-content: flex-end !important;
	  }
	  .justify-content-xl-center {
		justify-content: center !important;
	  }
	  .justify-content-xl-between {
		justify-content: space-between !important;
	  }
	  .justify-content-xl-around {
		justify-content: space-around !important;
	  }
	  .justify-content-xl-evenly {
		justify-content: space-evenly !important;
	  }
	  .align-items-xl-start {
		align-items: flex-start !important;
	  }
	  .align-items-xl-end {
		align-items: flex-end !important;
	  }
	  .align-items-xl-center {
		align-items: center !important;
	  }
	  .align-items-xl-baseline {
		align-items: baseline !important;
	  }
	  .align-items-xl-stretch {
		align-items: stretch !important;
	  }
	  .align-content-xl-start {
		align-content: flex-start !important;
	  }
	  .align-content-xl-end {
		align-content: flex-end !important;
	  }
	  .align-content-xl-center {
		align-content: center !important;
	  }
	  .align-content-xl-between {
		align-content: space-between !important;
	  }
	  .align-content-xl-around {
		align-content: space-around !important;
	  }
	  .align-content-xl-stretch {
		align-content: stretch !important;
	  }
	  .align-self-xl-auto {
		align-self: auto !important;
	  }
	  .align-self-xl-start {
		align-self: flex-start !important;
	  }
	  .align-self-xl-end {
		align-self: flex-end !important;
	  }
	  .align-self-xl-center {
		align-self: center !important;
	  }
	  .align-self-xl-baseline {
		align-self: baseline !important;
	  }
	  .align-self-xl-stretch {
		align-self: stretch !important;
	  }
	  .order-xl-first {
		order: -1 !important;
	  }
	  .order-xl-0 {
		order: 0 !important;
	  }
	  .order-xl-1 {
		order: 1 !important;
	  }
	  .order-xl-2 {
		order: 2 !important;
	  }
	  .order-xl-3 {
		order: 3 !important;
	  }
	  .order-xl-4 {
		order: 4 !important;
	  }
	  .order-xl-5 {
		order: 5 !important;
	  }
	  .order-xl-last {
		order: 6 !important;
	  }
	  .m-xl-0 {
		margin: 0 !important;
	  }
	  .m-xl-1 {
		margin: 0.25rem !important;
	  }
	  .m-xl-2 {
		margin: 0.5rem !important;
	  }
	  .m-xl-3 {
		margin: 1rem !important;
	  }
	  .m-xl-4 {
		margin: 1.5rem !important;
	  }
	  .m-xl-5 {
		margin: 3rem !important;
	  }
	  .m-xl-auto {
		margin: auto !important;
	  }
	  .mx-xl-0 {
		margin-right: 0 !important; margin-left: 0 !important;
	  }
	  .mx-xl-1 {
		margin-right: 0.25rem !important; margin-left: 0.25rem !important;
	  }
	  .mx-xl-2 {
		margin-right: 0.5rem !important; margin-left: 0.5rem !important;
	  }
	  .mx-xl-3 {
		margin-right: 1rem !important; margin-left: 1rem !important;
	  }
	  .mx-xl-4 {
		margin-right: 1.5rem !important; margin-left: 1.5rem !important;
	  }
	  .mx-xl-5 {
		margin-right: 3rem !important; margin-left: 3rem !important;
	  }
	  .mx-xl-auto {
		margin-right: auto !important; margin-left: auto !important;
	  }
	  .my-xl-0 {
		margin-top: 0 !important; margin-bottom: 0 !important;
	  }
	  .my-xl-1 {
		margin-top: 0.25rem !important; margin-bottom: 0.25rem !important;
	  }
	  .my-xl-2 {
		margin-top: 0.5rem !important; margin-bottom: 0.5rem !important;
	  }
	  .my-xl-3 {
		margin-top: 1rem !important; margin-bottom: 1rem !important;
	  }
	  .my-xl-4 {
		margin-top: 1.5rem !important; margin-bottom: 1.5rem !important;
	  }
	  .my-xl-5 {
		margin-top: 3rem !important; margin-bottom: 3rem !important;
	  }
	  .my-xl-auto {
		margin-top: auto !important; margin-bottom: auto !important;
	  }
	  .mt-xl-0 {
		margin-top: 0 !important;
	  }
	  .mt-xl-1 {
		margin-top: 0.25rem !important;
	  }
	  .mt-xl-2 {
		margin-top: 0.5rem !important;
	  }
	  .mt-xl-3 {
		margin-top: 1rem !important;
	  }
	  .mt-xl-4 {
		margin-top: 1.5rem !important;
	  }
	  .mt-xl-5 {
		margin-top: 3rem !important;
	  }
	  .mt-xl-auto {
		margin-top: auto !important;
	  }
	  .me-xl-0 {
		margin-right: 0 !important;
	  }
	  .me-xl-1 {
		margin-right: 0.25rem !important;
	  }
	  .me-xl-2 {
		margin-right: 0.5rem !important;
	  }
	  .me-xl-3 {
		margin-right: 1rem !important;
	  }
	  .me-xl-4 {
		margin-right: 1.5rem !important;
	  }
	  .me-xl-5 {
		margin-right: 3rem !important;
	  }
	  .me-xl-auto {
		margin-right: auto !important;
	  }
	  .mb-xl-0 {
		margin-bottom: 0 !important;
	  }
	  .mb-xl-1 {
		margin-bottom: 0.25rem !important;
	  }
	  .mb-xl-2 {
		margin-bottom: 0.5rem !important;
	  }
	  .mb-xl-3 {
		margin-bottom: 1rem !important;
	  }
	  .mb-xl-4 {
		margin-bottom: 1.5rem !important;
	  }
	  .mb-xl-5 {
		margin-bottom: 3rem !important;
	  }
	  .mb-xl-auto {
		margin-bottom: auto !important;
	  }
	  .ms-xl-0 {
		margin-left: 0 !important;
	  }
	  .ms-xl-1 {
		margin-left: 0.25rem !important;
	  }
	  .ms-xl-2 {
		margin-left: 0.5rem !important;
	  }
	  .ms-xl-3 {
		margin-left: 1rem !important;
	  }
	  .ms-xl-4 {
		margin-left: 1.5rem !important;
	  }
	  .ms-xl-5 {
		margin-left: 3rem !important;
	  }
	  .ms-xl-auto {
		margin-left: auto !important;
	  }
	  .p-xl-0 {
		padding: 0 !important;
	  }
	  .p-xl-1 {
		padding: 0.25rem !important;
	  }
	  .p-xl-2 {
		padding: 0.5rem !important;
	  }
	  .p-xl-3 {
		padding: 1rem !important;
	  }
	  .p-xl-4 {
		padding: 1.5rem !important;
	  }
	  .p-xl-5 {
		padding: 3rem !important;
	  }
	  .px-xl-0 {
		padding-right: 0 !important; padding-left: 0 !important;
	  }
	  .px-xl-1 {
		padding-right: 0.25rem !important; padding-left: 0.25rem !important;
	  }
	  .px-xl-2 {
		padding-right: 0.5rem !important; padding-left: 0.5rem !important;
	  }
	  .px-xl-3 {
		padding-right: 1rem !important; padding-left: 1rem !important;
	  }
	  .px-xl-4 {
		padding-right: 1.5rem !important; padding-left: 1.5rem !important;
	  }
	  .px-xl-5 {
		padding-right: 3rem !important; padding-left: 3rem !important;
	  }
	  .py-xl-0 {
		padding-top: 0 !important; padding-bottom: 0 !important;
	  }
	  .py-xl-1 {
		padding-top: 0.25rem !important; padding-bottom: 0.25rem !important;
	  }
	  .py-xl-2 {
		padding-top: 0.5rem !important; padding-bottom: 0.5rem !important;
	  }
	  .py-xl-3 {
		padding-top: 1rem !important; padding-bottom: 1rem !important;
	  }
	  .py-xl-4 {
		padding-top: 1.5rem !important; padding-bottom: 1.5rem !important;
	  }
	  .py-xl-5 {
		padding-top: 3rem !important; padding-bottom: 3rem !important;
	  }
	  .pt-xl-0 {
		padding-top: 0 !important;
	  }
	  .pt-xl-1 {
		padding-top: 0.25rem !important;
	  }
	  .pt-xl-2 {
		padding-top: 0.5rem !important;
	  }
	  .pt-xl-3 {
		padding-top: 1rem !important;
	  }
	  .pt-xl-4 {
		padding-top: 1.5rem !important;
	  }
	  .pt-xl-5 {
		padding-top: 3rem !important;
	  }
	  .pe-xl-0 {
		padding-right: 0 !important;
	  }
	  .pe-xl-1 {
		padding-right: 0.25rem !important;
	  }
	  .pe-xl-2 {
		padding-right: 0.5rem !important;
	  }
	  .pe-xl-3 {
		padding-right: 1rem !important;
	  }
	  .pe-xl-4 {
		padding-right: 1.5rem !important;
	  }
	  .pe-xl-5 {
		padding-right: 3rem !important;
	  }
	  .pb-xl-0 {
		padding-bottom: 0 !important;
	  }
	  .pb-xl-1 {
		padding-bottom: 0.25rem !important;
	  }
	  .pb-xl-2 {
		padding-bottom: 0.5rem !important;
	  }
	  .pb-xl-3 {
		padding-bottom: 1rem !important;
	  }
	  .pb-xl-4 {
		padding-bottom: 1.5rem !important;
	  }
	  .pb-xl-5 {
		padding-bottom: 3rem !important;
	  }
	  .ps-xl-0 {
		padding-left: 0 !important;
	  }
	  .ps-xl-1 {
		padding-left: 0.25rem !important;
	  }
	  .ps-xl-2 {
		padding-left: 0.5rem !important;
	  }
	  .ps-xl-3 {
		padding-left: 1rem !important;
	  }
	  .ps-xl-4 {
		padding-left: 1.5rem !important;
	  }
	  .ps-xl-5 {
		padding-left: 3rem !important;
	  }
	  .text-xl-start {
		text-align: left !important;
	  }
	  .text-xl-end {
		text-align: right !important;
	  }
	  .text-xl-center {
		text-align: center !important;
	  }
	  .fs-1 {
		font-size: 2.5rem !important;
	  }
	  .fs-2 {
		font-size: 2rem !important;
	  }
	  .fs-3 {
		font-size: 1.75rem !important;
	  }
	  .fs-4 {
		font-size: 1.5rem !important;
	  }
	}
	@media (min-width: 576px) {
	  .container-sm {
		max-width: 540px;
	  }
	  .container {
		max-width: 540px;
	  }
	  .col-sm {
		flex: 1 0 0%;
	  }
	  .row-cols-sm-auto > * {
		flex: 0 0 auto; width: auto;
	  }
	  .row-cols-sm-1 > * {
		flex: 0 0 auto; width: 100%;
	  }
	  .row-cols-sm-2 > * {
		flex: 0 0 auto; width: 50%;
	  }
	  .row-cols-sm-3 > * {
		flex: 0 0 auto; width: 33.3333333333%;
	  }
	  .row-cols-sm-4 > * {
		flex: 0 0 auto; width: 25%;
	  }
	  .row-cols-sm-5 > * {
		flex: 0 0 auto; width: 20%;
	  }
	  .row-cols-sm-6 > * {
		flex: 0 0 auto; width: 16.6666666667%;
	  }
	  .col-sm-auto {
		flex: 0 0 auto; width: auto;
	  }
	  .col-sm-1 {
		flex: 0 0 auto; width: 8.33333333%;
	  }
	  .col-sm-2 {
		flex: 0 0 auto; width: 16.66666667%;
	  }
	  .col-sm-3 {
		flex: 0 0 auto; width: 25%;
	  }
	  .col-sm-4 {
		flex: 0 0 auto; width: 33.33333333%;
	  }
	  .col-sm-5 {
		flex: 0 0 auto; width: 41.66666667%;
	  }
	  .col-sm-6 {
		flex: 0 0 auto; width: 50%;
	  }
	  .col-sm-7 {
		flex: 0 0 auto; width: 58.33333333%;
	  }
	  .col-sm-8 {
		flex: 0 0 auto; width: 66.66666667%;
	  }
	  .col-sm-9 {
		flex: 0 0 auto; width: 75%;
	  }
	  .col-sm-10 {
		flex: 0 0 auto; width: 83.33333333%;
	  }
	  .col-sm-11 {
		flex: 0 0 auto; width: 91.66666667%;
	  }
	  .col-sm-12 {
		flex: 0 0 auto; width: 100%;
	  }
	  .offset-sm-0 {
		margin-left: 0;
	  }
	  .offset-sm-1 {
		margin-left: 8.33333333%;
	  }
	  .offset-sm-2 {
		margin-left: 16.66666667%;
	  }
	  .offset-sm-3 {
		margin-left: 25%;
	  }
	  .offset-sm-4 {
		margin-left: 33.33333333%;
	  }
	  .offset-sm-5 {
		margin-left: 41.66666667%;
	  }
	  .offset-sm-6 {
		margin-left: 50%;
	  }
	  .offset-sm-7 {
		margin-left: 58.33333333%;
	  }
	  .offset-sm-8 {
		margin-left: 66.66666667%;
	  }
	  .offset-sm-9 {
		margin-left: 75%;
	  }
	  .offset-sm-10 {
		margin-left: 83.33333333%;
	  }
	  .offset-sm-11 {
		margin-left: 91.66666667%;
	  }
	  .g-sm-0 {
		--bs-gutter-x: 0;
	  }
	  .gx-sm-0 {
		--bs-gutter-x: 0;
	  }
	  .g-sm-0 {
		--bs-gutter-y: 0;
	  }
	  .gy-sm-0 {
		--bs-gutter-y: 0;
	  }
	  .g-sm-1 {
		--bs-gutter-x: 0.25rem;
	  }
	  .gx-sm-1 {
		--bs-gutter-x: 0.25rem;
	  }
	  .g-sm-1 {
		--bs-gutter-y: 0.25rem;
	  }
	  .gy-sm-1 {
		--bs-gutter-y: 0.25rem;
	  }
	  .g-sm-2 {
		--bs-gutter-x: 0.5rem;
	  }
	  .gx-sm-2 {
		--bs-gutter-x: 0.5rem;
	  }
	  .g-sm-2 {
		--bs-gutter-y: 0.5rem;
	  }
	  .gy-sm-2 {
		--bs-gutter-y: 0.5rem;
	  }
	  .g-sm-3 {
		--bs-gutter-x: 1rem;
	  }
	  .gx-sm-3 {
		--bs-gutter-x: 1rem;
	  }
	  .g-sm-3 {
		--bs-gutter-y: 1rem;
	  }
	  .gy-sm-3 {
		--bs-gutter-y: 1rem;
	  }
	  .g-sm-4 {
		--bs-gutter-x: 1.5rem;
	  }
	  .gx-sm-4 {
		--bs-gutter-x: 1.5rem;
	  }
	  .g-sm-4 {
		--bs-gutter-y: 1.5rem;
	  }
	  .gy-sm-4 {
		--bs-gutter-y: 1.5rem;
	  }
	  .g-sm-5 {
		--bs-gutter-x: 3rem;
	  }
	  .gx-sm-5 {
		--bs-gutter-x: 3rem;
	  }
	  .g-sm-5 {
		--bs-gutter-y: 3rem;
	  }
	  .gy-sm-5 {
		--bs-gutter-y: 3rem;
	  }
	  .dropdown-menu-sm-start {
		--bs-position: start;
	  }
	  .dropdown-menu-sm-start[data-bs-popper] {
		right: auto; left: 0;
	  }
	  .dropdown-menu-sm-end {
		--bs-position: end;
	  }
	  .dropdown-menu-sm-end[data-bs-popper] {
		right: 0; left: auto;
	  }
	  .navbar-expand-sm {
		flex-wrap: nowrap; justify-content: flex-start;
	  }
	  .navbar-expand-sm .navbar-nav {
		flex-direction: row;
	  }
	  .navbar-expand-sm .navbar-nav .dropdown-menu {
		position: absolute;
	  }
	  .navbar-expand-sm .navbar-nav .nav-link {
		padding-right: 0.5rem; padding-left: 0.5rem;
	  }
	  .navbar-expand-sm .navbar-nav-scroll {
		overflow: visible;
	  }
	  .navbar-expand-sm .navbar-collapse {
		display: flex !important; flex-basis: auto;
	  }
	  .navbar-expand-sm .navbar-toggler {
		display: none;
	  }
	  .card-group {
		display: flex; flex-flow: row wrap;
	  }
	  .card-group > .card {
		flex: 1 0 0%; margin-bottom: 0;
	  }
	  .card-group > .card + .card {
		margin-left: 0; border-left: 0;
	  }
	  .card-group > .card:not(:last-child) {
		border-top-right-radius: 0; border-bottom-right-radius: 0;
	  }
	  .card-group > .card:not(:last-child) .card-img-top {
		border-top-right-radius: 0;
	  }
	  .card-group > .card:not(:last-child) .card-header {
		border-top-right-radius: 0;
	  }
	  .card-group > .card:not(:last-child) .card-img-bottom {
		border-bottom-right-radius: 0;
	  }
	  .card-group > .card:not(:last-child) .card-footer {
		border-bottom-right-radius: 0;
	  }
	  .card-group > .card:not(:first-child) {
		border-top-left-radius: 0; border-bottom-left-radius: 0;
	  }
	  .card-group > .card:not(:first-child) .card-img-top {
		border-top-left-radius: 0;
	  }
	  .card-group > .card:not(:first-child) .card-header {
		border-top-left-radius: 0;
	  }
	  .card-group > .card:not(:first-child) .card-img-bottom {
		border-bottom-left-radius: 0;
	  }
	  .card-group > .card:not(:first-child) .card-footer {
		border-bottom-left-radius: 0;
	  }
	  .list-group-horizontal-sm {
		flex-direction: row;
	  }
	  .list-group-horizontal-sm > .list-group-item:first-child {
		border-bottom-left-radius: 0.25rem; border-top-right-radius: 0;
	  }
	  .list-group-horizontal-sm > .list-group-item:last-child {
		border-top-right-radius: 0.25rem; border-bottom-left-radius: 0;
	  }
	  .list-group-horizontal-sm > .list-group-item.active {
		margin-top: 0;
	  }
	  .list-group-horizontal-sm > .list-group-item + .list-group-item {
		border-top-width: 1px; border-left-width: 0;
	  }
	  .list-group-horizontal-sm > .list-group-item + .list-group-item.active {
		margin-left: -1px; border-left-width: 1px;
	  }
	  .modal-dialog {
		max-width: 500px; margin: 1.75rem auto;
	  }
	  .modal-dialog-scrollable {
		height: calc(100% - 3.5rem);
	  }
	  .modal-dialog-centered {
		min-height: calc(100% - 3.5rem);
	  }
	  .modal-sm {
		max-width: 300px;
	  }
	  .sticky-sm-top {
		position: sticky; top: 0; z-index: 1020;
	  }
	  .float-sm-start {
		float: left !important;
	  }
	  .float-sm-end {
		float: right !important;
	  }
	  .float-sm-none {
		float: none !important;
	  }
	  .d-sm-inline {
		display: inline !important;
	  }
	  .d-sm-inline-block {
		display: inline-block !important;
	  }
	  .d-sm-block {
		display: block !important;
	  }
	  .d-sm-grid {
		display: grid !important;
	  }
	  .d-sm-table {
		display: table !important;
	  }
	  .d-sm-table-row {
		display: table-row !important;
	  }
	  .d-sm-table-cell {
		display: table-cell !important;
	  }
	  .d-sm-flex {
		display: flex !important;
	  }
	  .d-sm-inline-flex {
		display: inline-flex !important;
	  }
	  .d-sm-none {
		display: none !important;
	  }
	  .flex-sm-fill {
		flex: 1 1 auto !important;
	  }
	  .flex-sm-row {
		flex-direction: row !important;
	  }
	  .flex-sm-column {
		flex-direction: column !important;
	  }
	  .flex-sm-row-reverse {
		flex-direction: row-reverse !important;
	  }
	  .flex-sm-column-reverse {
		flex-direction: column-reverse !important;
	  }
	  .flex-sm-grow-0 {
		flex-grow: 0 !important;
	  }
	  .flex-sm-grow-1 {
		flex-grow: 1 !important;
	  }
	  .flex-sm-shrink-0 {
		flex-shrink: 0 !important;
	  }
	  .flex-sm-shrink-1 {
		flex-shrink: 1 !important;
	  }
	  .flex-sm-wrap {
		flex-wrap: wrap !important;
	  }
	  .flex-sm-nowrap {
		flex-wrap: nowrap !important;
	  }
	  .flex-sm-wrap-reverse {
		flex-wrap: wrap-reverse !important;
	  }
	  .gap-sm-0 {
		gap: 0 !important;
	  }
	  .gap-sm-1 {
		gap: 0.25rem !important;
	  }
	  .gap-sm-2 {
		gap: 0.5rem !important;
	  }
	  .gap-sm-3 {
		gap: 1rem !important;
	  }
	  .gap-sm-4 {
		gap: 1.5rem !important;
	  }
	  .gap-sm-5 {
		gap: 3rem !important;
	  }
	  .justify-content-sm-start {
		justify-content: flex-start !important;
	  }
	  .justify-content-sm-end {
		justify-content: flex-end !important;
	  }
	  .justify-content-sm-center {
		justify-content: center !important;
	  }
	  .justify-content-sm-between {
		justify-content: space-between !important;
	  }
	  .justify-content-sm-around {
		justify-content: space-around !important;
	  }
	  .justify-content-sm-evenly {
		justify-content: space-evenly !important;
	  }
	  .align-items-sm-start {
		align-items: flex-start !important;
	  }
	  .align-items-sm-end {
		align-items: flex-end !important;
	  }
	  .align-items-sm-center {
		align-items: center !important;
	  }
	  .align-items-sm-baseline {
		align-items: baseline !important;
	  }
	  .align-items-sm-stretch {
		align-items: stretch !important;
	  }
	  .align-content-sm-start {
		align-content: flex-start !important;
	  }
	  .align-content-sm-end {
		align-content: flex-end !important;
	  }
	  .align-content-sm-center {
		align-content: center !important;
	  }
	  .align-content-sm-between {
		align-content: space-between !important;
	  }
	  .align-content-sm-around {
		align-content: space-around !important;
	  }
	  .align-content-sm-stretch {
		align-content: stretch !important;
	  }
	  .align-self-sm-auto {
		align-self: auto !important;
	  }
	  .align-self-sm-start {
		align-self: flex-start !important;
	  }
	  .align-self-sm-end {
		align-self: flex-end !important;
	  }
	  .align-self-sm-center {
		align-self: center !important;
	  }
	  .align-self-sm-baseline {
		align-self: baseline !important;
	  }
	  .align-self-sm-stretch {
		align-self: stretch !important;
	  }
	  .order-sm-first {
		order: -1 !important;
	  }
	  .order-sm-0 {
		order: 0 !important;
	  }
	  .order-sm-1 {
		order: 1 !important;
	  }
	  .order-sm-2 {
		order: 2 !important;
	  }
	  .order-sm-3 {
		order: 3 !important;
	  }
	  .order-sm-4 {
		order: 4 !important;
	  }
	  .order-sm-5 {
		order: 5 !important;
	  }
	  .order-sm-last {
		order: 6 !important;
	  }
	  .m-sm-0 {
		margin: 0 !important;
	  }
	  .m-sm-1 {
		margin: 0.25rem !important;
	  }
	  .m-sm-2 {
		margin: 0.5rem !important;
	  }
	  .m-sm-3 {
		margin: 1rem !important;
	  }
	  .m-sm-4 {
		margin: 1.5rem !important;
	  }
	  .m-sm-5 {
		margin: 3rem !important;
	  }
	  .m-sm-auto {
		margin: auto !important;
	  }
	  .mx-sm-0 {
		margin-right: 0 !important; margin-left: 0 !important;
	  }
	  .mx-sm-1 {
		margin-right: 0.25rem !important; margin-left: 0.25rem !important;
	  }
	  .mx-sm-2 {
		margin-right: 0.5rem !important; margin-left: 0.5rem !important;
	  }
	  .mx-sm-3 {
		margin-right: 1rem !important; margin-left: 1rem !important;
	  }
	  .mx-sm-4 {
		margin-right: 1.5rem !important; margin-left: 1.5rem !important;
	  }
	  .mx-sm-5 {
		margin-right: 3rem !important; margin-left: 3rem !important;
	  }
	  .mx-sm-auto {
		margin-right: auto !important; margin-left: auto !important;
	  }
	  .my-sm-0 {
		margin-top: 0 !important; margin-bottom: 0 !important;
	  }
	  .my-sm-1 {
		margin-top: 0.25rem !important; margin-bottom: 0.25rem !important;
	  }
	  .my-sm-2 {
		margin-top: 0.5rem !important; margin-bottom: 0.5rem !important;
	  }
	  .my-sm-3 {
		margin-top: 1rem !important; margin-bottom: 1rem !important;
	  }
	  .my-sm-4 {
		margin-top: 1.5rem !important; margin-bottom: 1.5rem !important;
	  }
	  .my-sm-5 {
		margin-top: 3rem !important; margin-bottom: 3rem !important;
	  }
	  .my-sm-auto {
		margin-top: auto !important; margin-bottom: auto !important;
	  }
	  .mt-sm-0 {
		margin-top: 0 !important;
	  }
	  .mt-sm-1 {
		margin-top: 0.25rem !important;
	  }
	  .mt-sm-2 {
		margin-top: 0.5rem !important;
	  }
	  .mt-sm-3 {
		margin-top: 1rem !important;
	  }
	  .mt-sm-4 {
		margin-top: 1.5rem !important;
	  }
	  .mt-sm-5 {
		margin-top: 3rem !important;
	  }
	  .mt-sm-auto {
		margin-top: auto !important;
	  }
	  .me-sm-0 {
		margin-right: 0 !important;
	  }
	  .me-sm-1 {
		margin-right: 0.25rem !important;
	  }
	  .me-sm-2 {
		margin-right: 0.5rem !important;
	  }
	  .me-sm-3 {
		margin-right: 1rem !important;
	  }
	  .me-sm-4 {
		margin-right: 1.5rem !important;
	  }
	  .me-sm-5 {
		margin-right: 3rem !important;
	  }
	  .me-sm-auto {
		margin-right: auto !important;
	  }
	  .mb-sm-0 {
		margin-bottom: 0 !important;
	  }
	  .mb-sm-1 {
		margin-bottom: 0.25rem !important;
	  }
	  .mb-sm-2 {
		margin-bottom: 0.5rem !important;
	  }
	  .mb-sm-3 {
		margin-bottom: 1rem !important;
	  }
	  .mb-sm-4 {
		margin-bottom: 1.5rem !important;
	  }
	  .mb-sm-5 {
		margin-bottom: 3rem !important;
	  }
	  .mb-sm-auto {
		margin-bottom: auto !important;
	  }
	  .ms-sm-0 {
		margin-left: 0 !important;
	  }
	  .ms-sm-1 {
		margin-left: 0.25rem !important;
	  }
	  .ms-sm-2 {
		margin-left: 0.5rem !important;
	  }
	  .ms-sm-3 {
		margin-left: 1rem !important;
	  }
	  .ms-sm-4 {
		margin-left: 1.5rem !important;
	  }
	  .ms-sm-5 {
		margin-left: 3rem !important;
	  }
	  .ms-sm-auto {
		margin-left: auto !important;
	  }
	  .p-sm-0 {
		padding: 0 !important;
	  }
	  .p-sm-1 {
		padding: 0.25rem !important;
	  }
	  .p-sm-2 {
		padding: 0.5rem !important;
	  }
	  .p-sm-3 {
		padding: 1rem !important;
	  }
	  .p-sm-4 {
		padding: 1.5rem !important;
	  }
	  .p-sm-5 {
		padding: 3rem !important;
	  }
	  .px-sm-0 {
		padding-right: 0 !important; padding-left: 0 !important;
	  }
	  .px-sm-1 {
		padding-right: 0.25rem !important; padding-left: 0.25rem !important;
	  }
	  .px-sm-2 {
		padding-right: 0.5rem !important; padding-left: 0.5rem !important;
	  }
	  .px-sm-3 {
		padding-right: 1rem !important; padding-left: 1rem !important;
	  }
	  .px-sm-4 {
		padding-right: 1.5rem !important; padding-left: 1.5rem !important;
	  }
	  .px-sm-5 {
		padding-right: 3rem !important; padding-left: 3rem !important;
	  }
	  .py-sm-0 {
		padding-top: 0 !important; padding-bottom: 0 !important;
	  }
	  .py-sm-1 {
		padding-top: 0.25rem !important; padding-bottom: 0.25rem !important;
	  }
	  .py-sm-2 {
		padding-top: 0.5rem !important; padding-bottom: 0.5rem !important;
	  }
	  .py-sm-3 {
		padding-top: 1rem !important; padding-bottom: 1rem !important;
	  }
	  .py-sm-4 {
		padding-top: 1.5rem !important; padding-bottom: 1.5rem !important;
	  }
	  .py-sm-5 {
		padding-top: 3rem !important; padding-bottom: 3rem !important;
	  }
	  .pt-sm-0 {
		padding-top: 0 !important;
	  }
	  .pt-sm-1 {
		padding-top: 0.25rem !important;
	  }
	  .pt-sm-2 {
		padding-top: 0.5rem !important;
	  }
	  .pt-sm-3 {
		padding-top: 1rem !important;
	  }
	  .pt-sm-4 {
		padding-top: 1.5rem !important;
	  }
	  .pt-sm-5 {
		padding-top: 3rem !important;
	  }
	  .pe-sm-0 {
		padding-right: 0 !important;
	  }
	  .pe-sm-1 {
		padding-right: 0.25rem !important;
	  }
	  .pe-sm-2 {
		padding-right: 0.5rem !important;
	  }
	  .pe-sm-3 {
		padding-right: 1rem !important;
	  }
	  .pe-sm-4 {
		padding-right: 1.5rem !important;
	  }
	  .pe-sm-5 {
		padding-right: 3rem !important;
	  }
	  .pb-sm-0 {
		padding-bottom: 0 !important;
	  }
	  .pb-sm-1 {
		padding-bottom: 0.25rem !important;
	  }
	  .pb-sm-2 {
		padding-bottom: 0.5rem !important;
	  }
	  .pb-sm-3 {
		padding-bottom: 1rem !important;
	  }
	  .pb-sm-4 {
		padding-bottom: 1.5rem !important;
	  }
	  .pb-sm-5 {
		padding-bottom: 3rem !important;
	  }
	  .ps-sm-0 {
		padding-left: 0 !important;
	  }
	  .ps-sm-1 {
		padding-left: 0.25rem !important;
	  }
	  .ps-sm-2 {
		padding-left: 0.5rem !important;
	  }
	  .ps-sm-3 {
		padding-left: 1rem !important;
	  }
	  .ps-sm-4 {
		padding-left: 1.5rem !important;
	  }
	  .ps-sm-5 {
		padding-left: 3rem !important;
	  }
	  .text-sm-start {
		text-align: left !important;
	  }
	  .text-sm-end {
		text-align: right !important;
	  }
	  .text-sm-center {
		text-align: center !important;
	  }
	}
	@media (min-width: 768px) {
	  .container-md {
		max-width: 720px;
	  }
	  .container-sm {
		max-width: 720px;
	  }
	  .container {
		max-width: 720px;
	  }
	  .col-md {
		flex: 1 0 0%;
	  }
	  .row-cols-md-auto > * {
		flex: 0 0 auto; width: auto;
	  }
	  .row-cols-md-1 > * {
		flex: 0 0 auto; width: 100%;
	  }
	  .row-cols-md-2 > * {
		flex: 0 0 auto; width: 50%;
	  }
	  .row-cols-md-3 > * {
		flex: 0 0 auto; width: 33.3333333333%;
	  }
	  .row-cols-md-4 > * {
		flex: 0 0 auto; width: 25%;
	  }
	  .row-cols-md-5 > * {
		flex: 0 0 auto; width: 20%;
	  }
	  .row-cols-md-6 > * {
		flex: 0 0 auto; width: 16.6666666667%;
	  }
	  .col-md-auto {
		flex: 0 0 auto; width: auto;
	  }
	  .col-md-1 {
		flex: 0 0 auto; width: 8.33333333%;
	  }
	  .col-md-2 {
		flex: 0 0 auto; width: 16.66666667%;
	  }
	  .col-md-3 {
		flex: 0 0 auto; width: 25%;
	  }
	  .col-md-4 {
		flex: 0 0 auto; width: 33.33333333%;
	  }
	  .col-md-5 {
		flex: 0 0 auto; width: 41.66666667%;
	  }
	  .col-md-6 {
		flex: 0 0 auto; width: 50%;
	  }
	  .col-md-7 {
		flex: 0 0 auto; width: 58.33333333%;
	  }
	  .col-md-8 {
		flex: 0 0 auto; width: 66.66666667%;
	  }
	  .col-md-9 {
		flex: 0 0 auto; width: 75%;
	  }
	  .col-md-10 {
		flex: 0 0 auto; width: 83.33333333%;
	  }
	  .col-md-11 {
		flex: 0 0 auto; width: 91.66666667%;
	  }
	  .col-md-12 {
		flex: 0 0 auto; width: 100%;
	  }
	  .offset-md-0 {
		margin-left: 0;
	  }
	  .offset-md-1 {
		margin-left: 8.33333333%;
	  }
	  .offset-md-2 {
		margin-left: 16.66666667%;
	  }
	  .offset-md-3 {
		margin-left: 25%;
	  }
	  .offset-md-4 {
		margin-left: 33.33333333%;
	  }
	  .offset-md-5 {
		margin-left: 41.66666667%;
	  }
	  .offset-md-6 {
		margin-left: 50%;
	  }
	  .offset-md-7 {
		margin-left: 58.33333333%;
	  }
	  .offset-md-8 {
		margin-left: 66.66666667%;
	  }
	  .offset-md-9 {
		margin-left: 75%;
	  }
	  .offset-md-10 {
		margin-left: 83.33333333%;
	  }
	  .offset-md-11 {
		margin-left: 91.66666667%;
	  }
	  .g-md-0 {
		--bs-gutter-x: 0;
	  }
	  .gx-md-0 {
		--bs-gutter-x: 0;
	  }
	  .g-md-0 {
		--bs-gutter-y: 0;
	  }
	  .gy-md-0 {
		--bs-gutter-y: 0;
	  }
	  .g-md-1 {
		--bs-gutter-x: 0.25rem;
	  }
	  .gx-md-1 {
		--bs-gutter-x: 0.25rem;
	  }
	  .g-md-1 {
		--bs-gutter-y: 0.25rem;
	  }
	  .gy-md-1 {
		--bs-gutter-y: 0.25rem;
	  }
	  .g-md-2 {
		--bs-gutter-x: 0.5rem;
	  }
	  .gx-md-2 {
		--bs-gutter-x: 0.5rem;
	  }
	  .g-md-2 {
		--bs-gutter-y: 0.5rem;
	  }
	  .gy-md-2 {
		--bs-gutter-y: 0.5rem;
	  }
	  .g-md-3 {
		--bs-gutter-x: 1rem;
	  }
	  .gx-md-3 {
		--bs-gutter-x: 1rem;
	  }
	  .g-md-3 {
		--bs-gutter-y: 1rem;
	  }
	  .gy-md-3 {
		--bs-gutter-y: 1rem;
	  }
	  .g-md-4 {
		--bs-gutter-x: 1.5rem;
	  }
	  .gx-md-4 {
		--bs-gutter-x: 1.5rem;
	  }
	  .g-md-4 {
		--bs-gutter-y: 1.5rem;
	  }
	  .gy-md-4 {
		--bs-gutter-y: 1.5rem;
	  }
	  .g-md-5 {
		--bs-gutter-x: 3rem;
	  }
	  .gx-md-5 {
		--bs-gutter-x: 3rem;
	  }
	  .g-md-5 {
		--bs-gutter-y: 3rem;
	  }
	  .gy-md-5 {
		--bs-gutter-y: 3rem;
	  }
	  .dropdown-menu-md-start {
		--bs-position: start;
	  }
	  .dropdown-menu-md-start[data-bs-popper] {
		right: auto; left: 0;
	  }
	  .dropdown-menu-md-end {
		--bs-position: end;
	  }
	  .dropdown-menu-md-end[data-bs-popper] {
		right: 0; left: auto;
	  }
	  .navbar-expand-md {
		flex-wrap: nowrap; justify-content: flex-start;
	  }
	  .navbar-expand-md .navbar-nav {
		flex-direction: row;
	  }
	  .navbar-expand-md .navbar-nav .dropdown-menu {
		position: absolute;
	  }
	  .navbar-expand-md .navbar-nav .nav-link {
		padding-right: 0.5rem; padding-left: 0.5rem;
	  }
	  .navbar-expand-md .navbar-nav-scroll {
		overflow: visible;
	  }
	  .navbar-expand-md .navbar-collapse {
		display: flex !important; flex-basis: auto;
	  }
	  .navbar-expand-md .navbar-toggler {
		display: none;
	  }
	  .list-group-horizontal-md {
		flex-direction: row;
	  }
	  .list-group-horizontal-md > .list-group-item:first-child {
		border-bottom-left-radius: 0.25rem; border-top-right-radius: 0;
	  }
	  .list-group-horizontal-md > .list-group-item:last-child {
		border-top-right-radius: 0.25rem; border-bottom-left-radius: 0;
	  }
	  .list-group-horizontal-md > .list-group-item.active {
		margin-top: 0;
	  }
	  .list-group-horizontal-md > .list-group-item + .list-group-item {
		border-top-width: 1px; border-left-width: 0;
	  }
	  .list-group-horizontal-md > .list-group-item + .list-group-item.active {
		margin-left: -1px; border-left-width: 1px;
	  }
	  .sticky-md-top {
		position: sticky; top: 0; z-index: 1020;
	  }
	  .float-md-start {
		float: left !important;
	  }
	  .float-md-end {
		float: right !important;
	  }
	  .float-md-none {
		float: none !important;
	  }
	  .d-md-inline {
		display: inline !important;
	  }
	  .d-md-inline-block {
		display: inline-block !important;
	  }
	  .d-md-block {
		display: block !important;
	  }
	  .d-md-grid {
		display: grid !important;
	  }
	  .d-md-table {
		display: table !important;
	  }
	  .d-md-table-row {
		display: table-row !important;
	  }
	  .d-md-table-cell {
		display: table-cell !important;
	  }
	  .d-md-flex {
		display: flex !important;
	  }
	  .d-md-inline-flex {
		display: inline-flex !important;
	  }
	  .d-md-none {
		display: none !important;
	  }
	  .flex-md-fill {
		flex: 1 1 auto !important;
	  }
	  .flex-md-row {
		flex-direction: row !important;
	  }
	  .flex-md-column {
		flex-direction: column !important;
	  }
	  .flex-md-row-reverse {
		flex-direction: row-reverse !important;
	  }
	  .flex-md-column-reverse {
		flex-direction: column-reverse !important;
	  }
	  .flex-md-grow-0 {
		flex-grow: 0 !important;
	  }
	  .flex-md-grow-1 {
		flex-grow: 1 !important;
	  }
	  .flex-md-shrink-0 {
		flex-shrink: 0 !important;
	  }
	  .flex-md-shrink-1 {
		flex-shrink: 1 !important;
	  }
	  .flex-md-wrap {
		flex-wrap: wrap !important;
	  }
	  .flex-md-nowrap {
		flex-wrap: nowrap !important;
	  }
	  .flex-md-wrap-reverse {
		flex-wrap: wrap-reverse !important;
	  }
	  .gap-md-0 {
		gap: 0 !important;
	  }
	  .gap-md-1 {
		gap: 0.25rem !important;
	  }
	  .gap-md-2 {
		gap: 0.5rem !important;
	  }
	  .gap-md-3 {
		gap: 1rem !important;
	  }
	  .gap-md-4 {
		gap: 1.5rem !important;
	  }
	  .gap-md-5 {
		gap: 3rem !important;
	  }
	  .justify-content-md-start {
		justify-content: flex-start !important;
	  }
	  .justify-content-md-end {
		justify-content: flex-end !important;
	  }
	  .justify-content-md-center {
		justify-content: center !important;
	  }
	  .justify-content-md-between {
		justify-content: space-between !important;
	  }
	  .justify-content-md-around {
		justify-content: space-around !important;
	  }
	  .justify-content-md-evenly {
		justify-content: space-evenly !important;
	  }
	  .align-items-md-start {
		align-items: flex-start !important;
	  }
	  .align-items-md-end {
		align-items: flex-end !important;
	  }
	  .align-items-md-center {
		align-items: center !important;
	  }
	  .align-items-md-baseline {
		align-items: baseline !important;
	  }
	  .align-items-md-stretch {
		align-items: stretch !important;
	  }
	  .align-content-md-start {
		align-content: flex-start !important;
	  }
	  .align-content-md-end {
		align-content: flex-end !important;
	  }
	  .align-content-md-center {
		align-content: center !important;
	  }
	  .align-content-md-between {
		align-content: space-between !important;
	  }
	  .align-content-md-around {
		align-content: space-around !important;
	  }
	  .align-content-md-stretch {
		align-content: stretch !important;
	  }
	  .align-self-md-auto {
		align-self: auto !important;
	  }
	  .align-self-md-start {
		align-self: flex-start !important;
	  }
	  .align-self-md-end {
		align-self: flex-end !important;
	  }
	  .align-self-md-center {
		align-self: center !important;
	  }
	  .align-self-md-baseline {
		align-self: baseline !important;
	  }
	  .align-self-md-stretch {
		align-self: stretch !important;
	  }
	  .order-md-first {
		order: -1 !important;
	  }
	  .order-md-0 {
		order: 0 !important;
	  }
	  .order-md-1 {
		order: 1 !important;
	  }
	  .order-md-2 {
		order: 2 !important;
	  }
	  .order-md-3 {
		order: 3 !important;
	  }
	  .order-md-4 {
		order: 4 !important;
	  }
	  .order-md-5 {
		order: 5 !important;
	  }
	  .order-md-last {
		order: 6 !important;
	  }
	  .m-md-0 {
		margin: 0 !important;
	  }
	  .m-md-1 {
		margin: 0.25rem !important;
	  }
	  .m-md-2 {
		margin: 0.5rem !important;
	  }
	  .m-md-3 {
		margin: 1rem !important;
	  }
	  .m-md-4 {
		margin: 1.5rem !important;
	  }
	  .m-md-5 {
		margin: 3rem !important;
	  }
	  .m-md-auto {
		margin: auto !important;
	  }
	  .mx-md-0 {
		margin-right: 0 !important; margin-left: 0 !important;
	  }
	  .mx-md-1 {
		margin-right: 0.25rem !important; margin-left: 0.25rem !important;
	  }
	  .mx-md-2 {
		margin-right: 0.5rem !important; margin-left: 0.5rem !important;
	  }
	  .mx-md-3 {
		margin-right: 1rem !important; margin-left: 1rem !important;
	  }
	  .mx-md-4 {
		margin-right: 1.5rem !important; margin-left: 1.5rem !important;
	  }
	  .mx-md-5 {
		margin-right: 3rem !important; margin-left: 3rem !important;
	  }
	  .mx-md-auto {
		margin-right: auto !important; margin-left: auto !important;
	  }
	  .my-md-0 {
		margin-top: 0 !important; margin-bottom: 0 !important;
	  }
	  .my-md-1 {
		margin-top: 0.25rem !important; margin-bottom: 0.25rem !important;
	  }
	  .my-md-2 {
		margin-top: 0.5rem !important; margin-bottom: 0.5rem !important;
	  }
	  .my-md-3 {
		margin-top: 1rem !important; margin-bottom: 1rem !important;
	  }
	  .my-md-4 {
		margin-top: 1.5rem !important; margin-bottom: 1.5rem !important;
	  }
	  .my-md-5 {
		margin-top: 3rem !important; margin-bottom: 3rem !important;
	  }
	  .my-md-auto {
		margin-top: auto !important; margin-bottom: auto !important;
	  }
	  .mt-md-0 {
		margin-top: 0 !important;
	  }
	  .mt-md-1 {
		margin-top: 0.25rem !important;
	  }
	  .mt-md-2 {
		margin-top: 0.5rem !important;
	  }
	  .mt-md-3 {
		margin-top: 1rem !important;
	  }
	  .mt-md-4 {
		margin-top: 1.5rem !important;
	  }
	  .mt-md-5 {
		margin-top: 3rem !important;
	  }
	  .mt-md-auto {
		margin-top: auto !important;
	  }
	  .me-md-0 {
		margin-right: 0 !important;
	  }
	  .me-md-1 {
		margin-right: 0.25rem !important;
	  }
	  .me-md-2 {
		margin-right: 0.5rem !important;
	  }
	  .me-md-3 {
		margin-right: 1rem !important;
	  }
	  .me-md-4 {
		margin-right: 1.5rem !important;
	  }
	  .me-md-5 {
		margin-right: 3rem !important;
	  }
	  .me-md-auto {
		margin-right: auto !important;
	  }
	  .mb-md-0 {
		margin-bottom: 0 !important;
	  }
	  .mb-md-1 {
		margin-bottom: 0.25rem !important;
	  }
	  .mb-md-2 {
		margin-bottom: 0.5rem !important;
	  }
	  .mb-md-3 {
		margin-bottom: 1rem !important;
	  }
	  .mb-md-4 {
		margin-bottom: 1.5rem !important;
	  }
	  .mb-md-5 {
		margin-bottom: 3rem !important;
	  }
	  .mb-md-auto {
		margin-bottom: auto !important;
	  }
	  .ms-md-0 {
		margin-left: 0 !important;
	  }
	  .ms-md-1 {
		margin-left: 0.25rem !important;
	  }
	  .ms-md-2 {
		margin-left: 0.5rem !important;
	  }
	  .ms-md-3 {
		margin-left: 1rem !important;
	  }
	  .ms-md-4 {
		margin-left: 1.5rem !important;
	  }
	  .ms-md-5 {
		margin-left: 3rem !important;
	  }
	  .ms-md-auto {
		margin-left: auto !important;
	  }
	  .p-md-0 {
		padding: 0 !important;
	  }
	  .p-md-1 {
		padding: 0.25rem !important;
	  }
	  .p-md-2 {
		padding: 0.5rem !important;
	  }
	  .p-md-3 {
		padding: 1rem !important;
	  }
	  .p-md-4 {
		padding: 1.5rem !important;
	  }
	  .p-md-5 {
		padding: 3rem !important;
	  }
	  .px-md-0 {
		padding-right: 0 !important; padding-left: 0 !important;
	  }
	  .px-md-1 {
		padding-right: 0.25rem !important; padding-left: 0.25rem !important;
	  }
	  .px-md-2 {
		padding-right: 0.5rem !important; padding-left: 0.5rem !important;
	  }
	  .px-md-3 {
		padding-right: 1rem !important; padding-left: 1rem !important;
	  }
	  .px-md-4 {
		padding-right: 1.5rem !important; padding-left: 1.5rem !important;
	  }
	  .px-md-5 {
		padding-right: 3rem !important; padding-left: 3rem !important;
	  }
	  .py-md-0 {
		padding-top: 0 !important; padding-bottom: 0 !important;
	  }
	  .py-md-1 {
		padding-top: 0.25rem !important; padding-bottom: 0.25rem !important;
	  }
	  .py-md-2 {
		padding-top: 0.5rem !important; padding-bottom: 0.5rem !important;
	  }
	  .py-md-3 {
		padding-top: 1rem !important; padding-bottom: 1rem !important;
	  }
	  .py-md-4 {
		padding-top: 1.5rem !important; padding-bottom: 1.5rem !important;
	  }
	  .py-md-5 {
		padding-top: 3rem !important; padding-bottom: 3rem !important;
	  }
	  .pt-md-0 {
		padding-top: 0 !important;
	  }
	  .pt-md-1 {
		padding-top: 0.25rem !important;
	  }
	  .pt-md-2 {
		padding-top: 0.5rem !important;
	  }
	  .pt-md-3 {
		padding-top: 1rem !important;
	  }
	  .pt-md-4 {
		padding-top: 1.5rem !important;
	  }
	  .pt-md-5 {
		padding-top: 3rem !important;
	  }
	  .pe-md-0 {
		padding-right: 0 !important;
	  }
	  .pe-md-1 {
		padding-right: 0.25rem !important;
	  }
	  .pe-md-2 {
		padding-right: 0.5rem !important;
	  }
	  .pe-md-3 {
		padding-right: 1rem !important;
	  }
	  .pe-md-4 {
		padding-right: 1.5rem !important;
	  }
	  .pe-md-5 {
		padding-right: 3rem !important;
	  }
	  .pb-md-0 {
		padding-bottom: 0 !important;
	  }
	  .pb-md-1 {
		padding-bottom: 0.25rem !important;
	  }
	  .pb-md-2 {
		padding-bottom: 0.5rem !important;
	  }
	  .pb-md-3 {
		padding-bottom: 1rem !important;
	  }
	  .pb-md-4 {
		padding-bottom: 1.5rem !important;
	  }
	  .pb-md-5 {
		padding-bottom: 3rem !important;
	  }
	  .ps-md-0 {
		padding-left: 0 !important;
	  }
	  .ps-md-1 {
		padding-left: 0.25rem !important;
	  }
	  .ps-md-2 {
		padding-left: 0.5rem !important;
	  }
	  .ps-md-3 {
		padding-left: 1rem !important;
	  }
	  .ps-md-4 {
		padding-left: 1.5rem !important;
	  }
	  .ps-md-5 {
		padding-left: 3rem !important;
	  }
	  .text-md-start {
		text-align: left !important;
	  }
	  .text-md-end {
		text-align: right !important;
	  }
	  .text-md-center {
		text-align: center !important;
	  }
	}
	@media (min-width: 992px) {
	  .container-lg {
		max-width: 960px;
	  }
	  .container-md {
		max-width: 960px;
	  }
	  .container-sm {
		max-width: 960px;
	  }
	  .container {
		max-width: 960px;
	  }
	  .col-lg {
		flex: 1 0 0%;
	  }
	  .row-cols-lg-auto > * {
		flex: 0 0 auto; width: auto;
	  }
	  .row-cols-lg-1 > * {
		flex: 0 0 auto; width: 100%;
	  }
	  .row-cols-lg-2 > * {
		flex: 0 0 auto; width: 50%;
	  }
	  .row-cols-lg-3 > * {
		flex: 0 0 auto; width: 33.3333333333%;
	  }
	  .row-cols-lg-4 > * {
		flex: 0 0 auto; width: 25%;
	  }
	  .row-cols-lg-5 > * {
		flex: 0 0 auto; width: 20%;
	  }
	  .row-cols-lg-6 > * {
		flex: 0 0 auto; width: 16.6666666667%;
	  }
	  .col-lg-auto {
		flex: 0 0 auto; width: auto;
	  }
	  .col-lg-1 {
		flex: 0 0 auto; width: 8.33333333%;
	  }
	  .col-lg-2 {
		flex: 0 0 auto; width: 16.66666667%;
	  }
	  .col-lg-3 {
		flex: 0 0 auto; width: 25%;
	  }
	  .col-lg-4 {
		flex: 0 0 auto; width: 33.33333333%;
	  }
	  .col-lg-5 {
		flex: 0 0 auto; width: 41.66666667%;
	  }
	  .col-lg-6 {
		flex: 0 0 auto; width: 50%;
	  }
	  .col-lg-7 {
		flex: 0 0 auto; width: 58.33333333%;
	  }
	  .col-lg-8 {
		flex: 0 0 auto; width: 66.66666667%;
	  }
	  .col-lg-9 {
		flex: 0 0 auto; width: 75%;
	  }
	  .col-lg-10 {
		flex: 0 0 auto; width: 83.33333333%;
	  }
	  .col-lg-11 {
		flex: 0 0 auto; width: 91.66666667%;
	  }
	  .col-lg-12 {
		flex: 0 0 auto; width: 100%;
	  }
	  .offset-lg-0 {
		margin-left: 0;
	  }
	  .offset-lg-1 {
		margin-left: 8.33333333%;
	  }
	  .offset-lg-2 {
		margin-left: 16.66666667%;
	  }
	  .offset-lg-3 {
		margin-left: 25%;
	  }
	  .offset-lg-4 {
		margin-left: 33.33333333%;
	  }
	  .offset-lg-5 {
		margin-left: 41.66666667%;
	  }
	  .offset-lg-6 {
		margin-left: 50%;
	  }
	  .offset-lg-7 {
		margin-left: 58.33333333%;
	  }
	  .offset-lg-8 {
		margin-left: 66.66666667%;
	  }
	  .offset-lg-9 {
		margin-left: 75%;
	  }
	  .offset-lg-10 {
		margin-left: 83.33333333%;
	  }
	  .offset-lg-11 {
		margin-left: 91.66666667%;
	  }
	  .g-lg-0 {
		--bs-gutter-x: 0;
	  }
	  .gx-lg-0 {
		--bs-gutter-x: 0;
	  }
	  .g-lg-0 {
		--bs-gutter-y: 0;
	  }
	  .gy-lg-0 {
		--bs-gutter-y: 0;
	  }
	  .g-lg-1 {
		--bs-gutter-x: 0.25rem;
	  }
	  .gx-lg-1 {
		--bs-gutter-x: 0.25rem;
	  }
	  .g-lg-1 {
		--bs-gutter-y: 0.25rem;
	  }
	  .gy-lg-1 {
		--bs-gutter-y: 0.25rem;
	  }
	  .g-lg-2 {
		--bs-gutter-x: 0.5rem;
	  }
	  .gx-lg-2 {
		--bs-gutter-x: 0.5rem;
	  }
	  .g-lg-2 {
		--bs-gutter-y: 0.5rem;
	  }
	  .gy-lg-2 {
		--bs-gutter-y: 0.5rem;
	  }
	  .g-lg-3 {
		--bs-gutter-x: 1rem;
	  }
	  .gx-lg-3 {
		--bs-gutter-x: 1rem;
	  }
	  .g-lg-3 {
		--bs-gutter-y: 1rem;
	  }
	  .gy-lg-3 {
		--bs-gutter-y: 1rem;
	  }
	  .g-lg-4 {
		--bs-gutter-x: 1.5rem;
	  }
	  .gx-lg-4 {
		--bs-gutter-x: 1.5rem;
	  }
	  .g-lg-4 {
		--bs-gutter-y: 1.5rem;
	  }
	  .gy-lg-4 {
		--bs-gutter-y: 1.5rem;
	  }
	  .g-lg-5 {
		--bs-gutter-x: 3rem;
	  }
	  .gx-lg-5 {
		--bs-gutter-x: 3rem;
	  }
	  .g-lg-5 {
		--bs-gutter-y: 3rem;
	  }
	  .gy-lg-5 {
		--bs-gutter-y: 3rem;
	  }
	  .dropdown-menu-lg-start {
		--bs-position: start;
	  }
	  .dropdown-menu-lg-start[data-bs-popper] {
		right: auto; left: 0;
	  }
	  .dropdown-menu-lg-end {
		--bs-position: end;
	  }
	  .dropdown-menu-lg-end[data-bs-popper] {
		right: 0; left: auto;
	  }
	  .navbar-expand-lg {
		flex-wrap: nowrap; justify-content: flex-start;
	  }
	  .navbar-expand-lg .navbar-nav {
		flex-direction: row;
	  }
	  .navbar-expand-lg .navbar-nav .dropdown-menu {
		position: absolute;
	  }
	  .navbar-expand-lg .navbar-nav .nav-link {
		padding-right: 0.5rem; padding-left: 0.5rem;
	  }
	  .navbar-expand-lg .navbar-nav-scroll {
		overflow: visible;
	  }
	  .navbar-expand-lg .navbar-collapse {
		display: flex !important; flex-basis: auto;
	  }
	  .navbar-expand-lg .navbar-toggler {
		display: none;
	  }
	  .list-group-horizontal-lg {
		flex-direction: row;
	  }
	  .list-group-horizontal-lg > .list-group-item:first-child {
		border-bottom-left-radius: 0.25rem; border-top-right-radius: 0;
	  }
	  .list-group-horizontal-lg > .list-group-item:last-child {
		border-top-right-radius: 0.25rem; border-bottom-left-radius: 0;
	  }
	  .list-group-horizontal-lg > .list-group-item.active {
		margin-top: 0;
	  }
	  .list-group-horizontal-lg > .list-group-item + .list-group-item {
		border-top-width: 1px; border-left-width: 0;
	  }
	  .list-group-horizontal-lg > .list-group-item + .list-group-item.active {
		margin-left: -1px; border-left-width: 1px;
	  }
	  .modal-lg {
		max-width: 800px;
	  }
	  .modal-xl {
		max-width: 800px;
	  }
	  .sticky-lg-top {
		position: sticky; top: 0; z-index: 1020;
	  }
	  .float-lg-start {
		float: left !important;
	  }
	  .float-lg-end {
		float: right !important;
	  }
	  .float-lg-none {
		float: none !important;
	  }
	  .d-lg-inline {
		display: inline !important;
	  }
	  .d-lg-inline-block {
		display: inline-block !important;
	  }
	  .d-lg-block {
		display: block !important;
	  }
	  .d-lg-grid {
		display: grid !important;
	  }
	  .d-lg-table {
		display: table !important;
	  }
	  .d-lg-table-row {
		display: table-row !important;
	  }
	  .d-lg-table-cell {
		display: table-cell !important;
	  }
	  .d-lg-flex {
		display: flex !important;
	  }
	  .d-lg-inline-flex {
		display: inline-flex !important;
	  }
	  .d-lg-none {
		display: none !important;
	  }
	  .flex-lg-fill {
		flex: 1 1 auto !important;
	  }
	  .flex-lg-row {
		flex-direction: row !important;
	  }
	  .flex-lg-column {
		flex-direction: column !important;
	  }
	  .flex-lg-row-reverse {
		flex-direction: row-reverse !important;
	  }
	  .flex-lg-column-reverse {
		flex-direction: column-reverse !important;
	  }
	  .flex-lg-grow-0 {
		flex-grow: 0 !important;
	  }
	  .flex-lg-grow-1 {
		flex-grow: 1 !important;
	  }
	  .flex-lg-shrink-0 {
		flex-shrink: 0 !important;
	  }
	  .flex-lg-shrink-1 {
		flex-shrink: 1 !important;
	  }
	  .flex-lg-wrap {
		flex-wrap: wrap !important;
	  }
	  .flex-lg-nowrap {
		flex-wrap: nowrap !important;
	  }
	  .flex-lg-wrap-reverse {
		flex-wrap: wrap-reverse !important;
	  }
	  .gap-lg-0 {
		gap: 0 !important;
	  }
	  .gap-lg-1 {
		gap: 0.25rem !important;
	  }
	  .gap-lg-2 {
		gap: 0.5rem !important;
	  }
	  .gap-lg-3 {
		gap: 1rem !important;
	  }
	  .gap-lg-4 {
		gap: 1.5rem !important;
	  }
	  .gap-lg-5 {
		gap: 3rem !important;
	  }
	  .justify-content-lg-start {
		justify-content: flex-start !important;
	  }
	  .justify-content-lg-end {
		justify-content: flex-end !important;
	  }
	  .justify-content-lg-center {
		justify-content: center !important;
	  }
	  .justify-content-lg-between {
		justify-content: space-between !important;
	  }
	  .justify-content-lg-around {
		justify-content: space-around !important;
	  }
	  .justify-content-lg-evenly {
		justify-content: space-evenly !important;
	  }
	  .align-items-lg-start {
		align-items: flex-start !important;
	  }
	  .align-items-lg-end {
		align-items: flex-end !important;
	  }
	  .align-items-lg-center {
		align-items: center !important;
	  }
	  .align-items-lg-baseline {
		align-items: baseline !important;
	  }
	  .align-items-lg-stretch {
		align-items: stretch !important;
	  }
	  .align-content-lg-start {
		align-content: flex-start !important;
	  }
	  .align-content-lg-end {
		align-content: flex-end !important;
	  }
	  .align-content-lg-center {
		align-content: center !important;
	  }
	  .align-content-lg-between {
		align-content: space-between !important;
	  }
	  .align-content-lg-around {
		align-content: space-around !important;
	  }
	  .align-content-lg-stretch {
		align-content: stretch !important;
	  }
	  .align-self-lg-auto {
		align-self: auto !important;
	  }
	  .align-self-lg-start {
		align-self: flex-start !important;
	  }
	  .align-self-lg-end {
		align-self: flex-end !important;
	  }
	  .align-self-lg-center {
		align-self: center !important;
	  }
	  .align-self-lg-baseline {
		align-self: baseline !important;
	  }
	  .align-self-lg-stretch {
		align-self: stretch !important;
	  }
	  .order-lg-first {
		order: -1 !important;
	  }
	  .order-lg-0 {
		order: 0 !important;
	  }
	  .order-lg-1 {
		order: 1 !important;
	  }
	  .order-lg-2 {
		order: 2 !important;
	  }
	  .order-lg-3 {
		order: 3 !important;
	  }
	  .order-lg-4 {
		order: 4 !important;
	  }
	  .order-lg-5 {
		order: 5 !important;
	  }
	  .order-lg-last {
		order: 6 !important;
	  }
	  .m-lg-0 {
		margin: 0 !important;
	  }
	  .m-lg-1 {
		margin: 0.25rem !important;
	  }
	  .m-lg-2 {
		margin: 0.5rem !important;
	  }
	  .m-lg-3 {
		margin: 1rem !important;
	  }
	  .m-lg-4 {
		margin: 1.5rem !important;
	  }
	  .m-lg-5 {
		margin: 3rem !important;
	  }
	  .m-lg-auto {
		margin: auto !important;
	  }
	  .mx-lg-0 {
		margin-right: 0 !important; margin-left: 0 !important;
	  }
	  .mx-lg-1 {
		margin-right: 0.25rem !important; margin-left: 0.25rem !important;
	  }
	  .mx-lg-2 {
		margin-right: 0.5rem !important; margin-left: 0.5rem !important;
	  }
	  .mx-lg-3 {
		margin-right: 1rem !important; margin-left: 1rem !important;
	  }
	  .mx-lg-4 {
		margin-right: 1.5rem !important; margin-left: 1.5rem !important;
	  }
	  .mx-lg-5 {
		margin-right: 3rem !important; margin-left: 3rem !important;
	  }
	  .mx-lg-auto {
		margin-right: auto !important; margin-left: auto !important;
	  }
	  .my-lg-0 {
		margin-top: 0 !important; margin-bottom: 0 !important;
	  }
	  .my-lg-1 {
		margin-top: 0.25rem !important; margin-bottom: 0.25rem !important;
	  }
	  .my-lg-2 {
		margin-top: 0.5rem !important; margin-bottom: 0.5rem !important;
	  }
	  .my-lg-3 {
		margin-top: 1rem !important; margin-bottom: 1rem !important;
	  }
	  .my-lg-4 {
		margin-top: 1.5rem !important; margin-bottom: 1.5rem !important;
	  }
	  .my-lg-5 {
		margin-top: 3rem !important; margin-bottom: 3rem !important;
	  }
	  .my-lg-auto {
		margin-top: auto !important; margin-bottom: auto !important;
	  }
	  .mt-lg-0 {
		margin-top: 0 !important;
	  }
	  .mt-lg-1 {
		margin-top: 0.25rem !important;
	  }
	  .mt-lg-2 {
		margin-top: 0.5rem !important;
	  }
	  .mt-lg-3 {
		margin-top: 1rem !important;
	  }
	  .mt-lg-4 {
		margin-top: 1.5rem !important;
	  }
	  .mt-lg-5 {
		margin-top: 3rem !important;
	  }
	  .mt-lg-auto {
		margin-top: auto !important;
	  }
	  .me-lg-0 {
		margin-right: 0 !important;
	  }
	  .me-lg-1 {
		margin-right: 0.25rem !important;
	  }
	  .me-lg-2 {
		margin-right: 0.5rem !important;
	  }
	  .me-lg-3 {
		margin-right: 1rem !important;
	  }
	  .me-lg-4 {
		margin-right: 1.5rem !important;
	  }
	  .me-lg-5 {
		margin-right: 3rem !important;
	  }
	  .me-lg-auto {
		margin-right: auto !important;
	  }
	  .mb-lg-0 {
		margin-bottom: 0 !important;
	  }
	  .mb-lg-1 {
		margin-bottom: 0.25rem !important;
	  }
	  .mb-lg-2 {
		margin-bottom: 0.5rem !important;
	  }
	  .mb-lg-3 {
		margin-bottom: 1rem !important;
	  }
	  .mb-lg-4 {
		margin-bottom: 1.5rem !important;
	  }
	  .mb-lg-5 {
		margin-bottom: 3rem !important;
	  }
	  .mb-lg-auto {
		margin-bottom: auto !important;
	  }
	  .ms-lg-0 {
		margin-left: 0 !important;
	  }
	  .ms-lg-1 {
		margin-left: 0.25rem !important;
	  }
	  .ms-lg-2 {
		margin-left: 0.5rem !important;
	  }
	  .ms-lg-3 {
		margin-left: 1rem !important;
	  }
	  .ms-lg-4 {
		margin-left: 1.5rem !important;
	  }
	  .ms-lg-5 {
		margin-left: 3rem !important;
	  }
	  .ms-lg-auto {
		margin-left: auto !important;
	  }
	  .p-lg-0 {
		padding: 0 !important;
	  }
	  .p-lg-1 {
		padding: 0.25rem !important;
	  }
	  .p-lg-2 {
		padding: 0.5rem !important;
	  }
	  .p-lg-3 {
		padding: 1rem !important;
	  }
	  .p-lg-4 {
		padding: 1.5rem !important;
	  }
	  .p-lg-5 {
		padding: 3rem !important;
	  }
	  .px-lg-0 {
		padding-right: 0 !important; padding-left: 0 !important;
	  }
	  .px-lg-1 {
		padding-right: 0.25rem !important; padding-left: 0.25rem !important;
	  }
	  .px-lg-2 {
		padding-right: 0.5rem !important; padding-left: 0.5rem !important;
	  }
	  .px-lg-3 {
		padding-right: 1rem !important; padding-left: 1rem !important;
	  }
	  .px-lg-4 {
		padding-right: 1.5rem !important; padding-left: 1.5rem !important;
	  }
	  .px-lg-5 {
		padding-right: 3rem !important; padding-left: 3rem !important;
	  }
	  .py-lg-0 {
		padding-top: 0 !important; padding-bottom: 0 !important;
	  }
	  .py-lg-1 {
		padding-top: 0.25rem !important; padding-bottom: 0.25rem !important;
	  }
	  .py-lg-2 {
		padding-top: 0.5rem !important; padding-bottom: 0.5rem !important;
	  }
	  .py-lg-3 {
		padding-top: 1rem !important; padding-bottom: 1rem !important;
	  }
	  .py-lg-4 {
		padding-top: 1.5rem !important; padding-bottom: 1.5rem !important;
	  }
	  .py-lg-5 {
		padding-top: 3rem !important; padding-bottom: 3rem !important;
	  }
	  .pt-lg-0 {
		padding-top: 0 !important;
	  }
	  .pt-lg-1 {
		padding-top: 0.25rem !important;
	  }
	  .pt-lg-2 {
		padding-top: 0.5rem !important;
	  }
	  .pt-lg-3 {
		padding-top: 1rem !important;
	  }
	  .pt-lg-4 {
		padding-top: 1.5rem !important;
	  }
	  .pt-lg-5 {
		padding-top: 3rem !important;
	  }
	  .pe-lg-0 {
		padding-right: 0 !important;
	  }
	  .pe-lg-1 {
		padding-right: 0.25rem !important;
	  }
	  .pe-lg-2 {
		padding-right: 0.5rem !important;
	  }
	  .pe-lg-3 {
		padding-right: 1rem !important;
	  }
	  .pe-lg-4 {
		padding-right: 1.5rem !important;
	  }
	  .pe-lg-5 {
		padding-right: 3rem !important;
	  }
	  .pb-lg-0 {
		padding-bottom: 0 !important;
	  }
	  .pb-lg-1 {
		padding-bottom: 0.25rem !important;
	  }
	  .pb-lg-2 {
		padding-bottom: 0.5rem !important;
	  }
	  .pb-lg-3 {
		padding-bottom: 1rem !important;
	  }
	  .pb-lg-4 {
		padding-bottom: 1.5rem !important;
	  }
	  .pb-lg-5 {
		padding-bottom: 3rem !important;
	  }
	  .ps-lg-0 {
		padding-left: 0 !important;
	  }
	  .ps-lg-1 {
		padding-left: 0.25rem !important;
	  }
	  .ps-lg-2 {
		padding-left: 0.5rem !important;
	  }
	  .ps-lg-3 {
		padding-left: 1rem !important;
	  }
	  .ps-lg-4 {
		padding-left: 1.5rem !important;
	  }
	  .ps-lg-5 {
		padding-left: 3rem !important;
	  }
	  .text-lg-start {
		text-align: left !important;
	  }
	  .text-lg-end {
		text-align: right !important;
	  }
	  .text-lg-center {
		text-align: center !important;
	  }
	}
	@media (min-width: 1400px) {
	  .container-xxl {
		max-width: 1320px;
	  }
	  .container-xl {
		max-width: 1320px;
	  }
	  .container-lg {
		max-width: 1320px;
	  }
	  .container-md {
		max-width: 1320px;
	  }
	  .container-sm {
		max-width: 1320px;
	  }
	  .container {
		max-width: 1320px;
	  }
	  .col-xxl {
		flex: 1 0 0%;
	  }
	  .row-cols-xxl-auto > * {
		flex: 0 0 auto; width: auto;
	  }
	  .row-cols-xxl-1 > * {
		flex: 0 0 auto; width: 100%;
	  }
	  .row-cols-xxl-2 > * {
		flex: 0 0 auto; width: 50%;
	  }
	  .row-cols-xxl-3 > * {
		flex: 0 0 auto; width: 33.3333333333%;
	  }
	  .row-cols-xxl-4 > * {
		flex: 0 0 auto; width: 25%;
	  }
	  .row-cols-xxl-5 > * {
		flex: 0 0 auto; width: 20%;
	  }
	  .row-cols-xxl-6 > * {
		flex: 0 0 auto; width: 16.6666666667%;
	  }
	  .col-xxl-auto {
		flex: 0 0 auto; width: auto;
	  }
	  .col-xxl-1 {
		flex: 0 0 auto; width: 8.33333333%;
	  }
	  .col-xxl-2 {
		flex: 0 0 auto; width: 16.66666667%;
	  }
	  .col-xxl-3 {
		flex: 0 0 auto; width: 25%;
	  }
	  .col-xxl-4 {
		flex: 0 0 auto; width: 33.33333333%;
	  }
	  .col-xxl-5 {
		flex: 0 0 auto; width: 41.66666667%;
	  }
	  .col-xxl-6 {
		flex: 0 0 auto; width: 50%;
	  }
	  .col-xxl-7 {
		flex: 0 0 auto; width: 58.33333333%;
	  }
	  .col-xxl-8 {
		flex: 0 0 auto; width: 66.66666667%;
	  }
	  .col-xxl-9 {
		flex: 0 0 auto; width: 75%;
	  }
	  .col-xxl-10 {
		flex: 0 0 auto; width: 83.33333333%;
	  }
	  .col-xxl-11 {
		flex: 0 0 auto; width: 91.66666667%;
	  }
	  .col-xxl-12 {
		flex: 0 0 auto; width: 100%;
	  }
	  .offset-xxl-0 {
		margin-left: 0;
	  }
	  .offset-xxl-1 {
		margin-left: 8.33333333%;
	  }
	  .offset-xxl-2 {
		margin-left: 16.66666667%;
	  }
	  .offset-xxl-3 {
		margin-left: 25%;
	  }
	  .offset-xxl-4 {
		margin-left: 33.33333333%;
	  }
	  .offset-xxl-5 {
		margin-left: 41.66666667%;
	  }
	  .offset-xxl-6 {
		margin-left: 50%;
	  }
	  .offset-xxl-7 {
		margin-left: 58.33333333%;
	  }
	  .offset-xxl-8 {
		margin-left: 66.66666667%;
	  }
	  .offset-xxl-9 {
		margin-left: 75%;
	  }
	  .offset-xxl-10 {
		margin-left: 83.33333333%;
	  }
	  .offset-xxl-11 {
		margin-left: 91.66666667%;
	  }
	  .g-xxl-0 {
		--bs-gutter-x: 0;
	  }
	  .gx-xxl-0 {
		--bs-gutter-x: 0;
	  }
	  .g-xxl-0 {
		--bs-gutter-y: 0;
	  }
	  .gy-xxl-0 {
		--bs-gutter-y: 0;
	  }
	  .g-xxl-1 {
		--bs-gutter-x: 0.25rem;
	  }
	  .gx-xxl-1 {
		--bs-gutter-x: 0.25rem;
	  }
	  .g-xxl-1 {
		--bs-gutter-y: 0.25rem;
	  }
	  .gy-xxl-1 {
		--bs-gutter-y: 0.25rem;
	  }
	  .g-xxl-2 {
		--bs-gutter-x: 0.5rem;
	  }
	  .gx-xxl-2 {
		--bs-gutter-x: 0.5rem;
	  }
	  .g-xxl-2 {
		--bs-gutter-y: 0.5rem;
	  }
	  .gy-xxl-2 {
		--bs-gutter-y: 0.5rem;
	  }
	  .g-xxl-3 {
		--bs-gutter-x: 1rem;
	  }
	  .gx-xxl-3 {
		--bs-gutter-x: 1rem;
	  }
	  .g-xxl-3 {
		--bs-gutter-y: 1rem;
	  }
	  .gy-xxl-3 {
		--bs-gutter-y: 1rem;
	  }
	  .g-xxl-4 {
		--bs-gutter-x: 1.5rem;
	  }
	  .gx-xxl-4 {
		--bs-gutter-x: 1.5rem;
	  }
	  .g-xxl-4 {
		--bs-gutter-y: 1.5rem;
	  }
	  .gy-xxl-4 {
		--bs-gutter-y: 1.5rem;
	  }
	  .g-xxl-5 {
		--bs-gutter-x: 3rem;
	  }
	  .gx-xxl-5 {
		--bs-gutter-x: 3rem;
	  }
	  .g-xxl-5 {
		--bs-gutter-y: 3rem;
	  }
	  .gy-xxl-5 {
		--bs-gutter-y: 3rem;
	  }
	  .dropdown-menu-xxl-start {
		--bs-position: start;
	  }
	  .dropdown-menu-xxl-start[data-bs-popper] {
		right: auto; left: 0;
	  }
	  .dropdown-menu-xxl-end {
		--bs-position: end;
	  }
	  .dropdown-menu-xxl-end[data-bs-popper] {
		right: 0; left: auto;
	  }
	  .navbar-expand-xxl {
		flex-wrap: nowrap; justify-content: flex-start;
	  }
	  .navbar-expand-xxl .navbar-nav {
		flex-direction: row;
	  }
	  .navbar-expand-xxl .navbar-nav .dropdown-menu {
		position: absolute;
	  }
	  .navbar-expand-xxl .navbar-nav .nav-link {
		padding-right: 0.5rem; padding-left: 0.5rem;
	  }
	  .navbar-expand-xxl .navbar-nav-scroll {
		overflow: visible;
	  }
	  .navbar-expand-xxl .navbar-collapse {
		display: flex !important; flex-basis: auto;
	  }
	  .navbar-expand-xxl .navbar-toggler {
		display: none;
	  }
	  .list-group-horizontal-xxl {
		flex-direction: row;
	  }
	  .list-group-horizontal-xxl > .list-group-item:first-child {
		border-bottom-left-radius: 0.25rem; border-top-right-radius: 0;
	  }
	  .list-group-horizontal-xxl > .list-group-item:last-child {
		border-top-right-radius: 0.25rem; border-bottom-left-radius: 0;
	  }
	  .list-group-horizontal-xxl > .list-group-item.active {
		margin-top: 0;
	  }
	  .list-group-horizontal-xxl > .list-group-item + .list-group-item {
		border-top-width: 1px; border-left-width: 0;
	  }
	  .list-group-horizontal-xxl > .list-group-item + .list-group-item.active {
		margin-left: -1px; border-left-width: 1px;
	  }
	  .sticky-xxl-top {
		position: sticky; top: 0; z-index: 1020;
	  }
	  .float-xxl-start {
		float: left !important;
	  }
	  .float-xxl-end {
		float: right !important;
	  }
	  .float-xxl-none {
		float: none !important;
	  }
	  .d-xxl-inline {
		display: inline !important;
	  }
	  .d-xxl-inline-block {
		display: inline-block !important;
	  }
	  .d-xxl-block {
		display: block !important;
	  }
	  .d-xxl-grid {
		display: grid !important;
	  }
	  .d-xxl-table {
		display: table !important;
	  }
	  .d-xxl-table-row {
		display: table-row !important;
	  }
	  .d-xxl-table-cell {
		display: table-cell !important;
	  }
	  .d-xxl-flex {
		display: flex !important;
	  }
	  .d-xxl-inline-flex {
		display: inline-flex !important;
	  }
	  .d-xxl-none {
		display: none !important;
	  }
	  .flex-xxl-fill {
		flex: 1 1 auto !important;
	  }
	  .flex-xxl-row {
		flex-direction: row !important;
	  }
	  .flex-xxl-column {
		flex-direction: column !important;
	  }
	  .flex-xxl-row-reverse {
		flex-direction: row-reverse !important;
	  }
	  .flex-xxl-column-reverse {
		flex-direction: column-reverse !important;
	  }
	  .flex-xxl-grow-0 {
		flex-grow: 0 !important;
	  }
	  .flex-xxl-grow-1 {
		flex-grow: 1 !important;
	  }
	  .flex-xxl-shrink-0 {
		flex-shrink: 0 !important;
	  }
	  .flex-xxl-shrink-1 {
		flex-shrink: 1 !important;
	  }
	  .flex-xxl-wrap {
		flex-wrap: wrap !important;
	  }
	  .flex-xxl-nowrap {
		flex-wrap: nowrap !important;
	  }
	  .flex-xxl-wrap-reverse {
		flex-wrap: wrap-reverse !important;
	  }
	  .gap-xxl-0 {
		gap: 0 !important;
	  }
	  .gap-xxl-1 {
		gap: 0.25rem !important;
	  }
	  .gap-xxl-2 {
		gap: 0.5rem !important;
	  }
	  .gap-xxl-3 {
		gap: 1rem !important;
	  }
	  .gap-xxl-4 {
		gap: 1.5rem !important;
	  }
	  .gap-xxl-5 {
		gap: 3rem !important;
	  }
	  .justify-content-xxl-start {
		justify-content: flex-start !important;
	  }
	  .justify-content-xxl-end {
		justify-content: flex-end !important;
	  }
	  .justify-content-xxl-center {
		justify-content: center !important;
	  }
	  .justify-content-xxl-between {
		justify-content: space-between !important;
	  }
	  .justify-content-xxl-around {
		justify-content: space-around !important;
	  }
	  .justify-content-xxl-evenly {
		justify-content: space-evenly !important;
	  }
	  .align-items-xxl-start {
		align-items: flex-start !important;
	  }
	  .align-items-xxl-end {
		align-items: flex-end !important;
	  }
	  .align-items-xxl-center {
		align-items: center !important;
	  }
	  .align-items-xxl-baseline {
		align-items: baseline !important;
	  }
	  .align-items-xxl-stretch {
		align-items: stretch !important;
	  }
	  .align-content-xxl-start {
		align-content: flex-start !important;
	  }
	  .align-content-xxl-end {
		align-content: flex-end !important;
	  }
	  .align-content-xxl-center {
		align-content: center !important;
	  }
	  .align-content-xxl-between {
		align-content: space-between !important;
	  }
	  .align-content-xxl-around {
		align-content: space-around !important;
	  }
	  .align-content-xxl-stretch {
		align-content: stretch !important;
	  }
	  .align-self-xxl-auto {
		align-self: auto !important;
	  }
	  .align-self-xxl-start {
		align-self: flex-start !important;
	  }
	  .align-self-xxl-end {
		align-self: flex-end !important;
	  }
	  .align-self-xxl-center {
		align-self: center !important;
	  }
	  .align-self-xxl-baseline {
		align-self: baseline !important;
	  }
	  .align-self-xxl-stretch {
		align-self: stretch !important;
	  }
	  .order-xxl-first {
		order: -1 !important;
	  }
	  .order-xxl-0 {
		order: 0 !important;
	  }
	  .order-xxl-1 {
		order: 1 !important;
	  }
	  .order-xxl-2 {
		order: 2 !important;
	  }
	  .order-xxl-3 {
		order: 3 !important;
	  }
	  .order-xxl-4 {
		order: 4 !important;
	  }
	  .order-xxl-5 {
		order: 5 !important;
	  }
	  .order-xxl-last {
		order: 6 !important;
	  }
	  .m-xxl-0 {
		margin: 0 !important;
	  }
	  .m-xxl-1 {
		margin: 0.25rem !important;
	  }
	  .m-xxl-2 {
		margin: 0.5rem !important;
	  }
	  .m-xxl-3 {
		margin: 1rem !important;
	  }
	  .m-xxl-4 {
		margin: 1.5rem !important;
	  }
	  .m-xxl-5 {
		margin: 3rem !important;
	  }
	  .m-xxl-auto {
		margin: auto !important;
	  }
	  .mx-xxl-0 {
		margin-right: 0 !important; margin-left: 0 !important;
	  }
	  .mx-xxl-1 {
		margin-right: 0.25rem !important; margin-left: 0.25rem !important;
	  }
	  .mx-xxl-2 {
		margin-right: 0.5rem !important; margin-left: 0.5rem !important;
	  }
	  .mx-xxl-3 {
		margin-right: 1rem !important; margin-left: 1rem !important;
	  }
	  .mx-xxl-4 {
		margin-right: 1.5rem !important; margin-left: 1.5rem !important;
	  }
	  .mx-xxl-5 {
		margin-right: 3rem !important; margin-left: 3rem !important;
	  }
	  .mx-xxl-auto {
		margin-right: auto !important; margin-left: auto !important;
	  }
	  .my-xxl-0 {
		margin-top: 0 !important; margin-bottom: 0 !important;
	  }
	  .my-xxl-1 {
		margin-top: 0.25rem !important; margin-bottom: 0.25rem !important;
	  }
	  .my-xxl-2 {
		margin-top: 0.5rem !important; margin-bottom: 0.5rem !important;
	  }
	  .my-xxl-3 {
		margin-top: 1rem !important; margin-bottom: 1rem !important;
	  }
	  .my-xxl-4 {
		margin-top: 1.5rem !important; margin-bottom: 1.5rem !important;
	  }
	  .my-xxl-5 {
		margin-top: 3rem !important; margin-bottom: 3rem !important;
	  }
	  .my-xxl-auto {
		margin-top: auto !important; margin-bottom: auto !important;
	  }
	  .mt-xxl-0 {
		margin-top: 0 !important;
	  }
	  .mt-xxl-1 {
		margin-top: 0.25rem !important;
	  }
	  .mt-xxl-2 {
		margin-top: 0.5rem !important;
	  }
	  .mt-xxl-3 {
		margin-top: 1rem !important;
	  }
	  .mt-xxl-4 {
		margin-top: 1.5rem !important;
	  }
	  .mt-xxl-5 {
		margin-top: 3rem !important;
	  }
	  .mt-xxl-auto {
		margin-top: auto !important;
	  }
	  .me-xxl-0 {
		margin-right: 0 !important;
	  }
	  .me-xxl-1 {
		margin-right: 0.25rem !important;
	  }
	  .me-xxl-2 {
		margin-right: 0.5rem !important;
	  }
	  .me-xxl-3 {
		margin-right: 1rem !important;
	  }
	  .me-xxl-4 {
		margin-right: 1.5rem !important;
	  }
	  .me-xxl-5 {
		margin-right: 3rem !important;
	  }
	  .me-xxl-auto {
		margin-right: auto !important;
	  }
	  .mb-xxl-0 {
		margin-bottom: 0 !important;
	  }
	  .mb-xxl-1 {
		margin-bottom: 0.25rem !important;
	  }
	  .mb-xxl-2 {
		margin-bottom: 0.5rem !important;
	  }
	  .mb-xxl-3 {
		margin-bottom: 1rem !important;
	  }
	  .mb-xxl-4 {
		margin-bottom: 1.5rem !important;
	  }
	  .mb-xxl-5 {
		margin-bottom: 3rem !important;
	  }
	  .mb-xxl-auto {
		margin-bottom: auto !important;
	  }
	  .ms-xxl-0 {
		margin-left: 0 !important;
	  }
	  .ms-xxl-1 {
		margin-left: 0.25rem !important;
	  }
	  .ms-xxl-2 {
		margin-left: 0.5rem !important;
	  }
	  .ms-xxl-3 {
		margin-left: 1rem !important;
	  }
	  .ms-xxl-4 {
		margin-left: 1.5rem !important;
	  }
	  .ms-xxl-5 {
		margin-left: 3rem !important;
	  }
	  .ms-xxl-auto {
		margin-left: auto !important;
	  }
	  .p-xxl-0 {
		padding: 0 !important;
	  }
	  .p-xxl-1 {
		padding: 0.25rem !important;
	  }
	  .p-xxl-2 {
		padding: 0.5rem !important;
	  }
	  .p-xxl-3 {
		padding: 1rem !important;
	  }
	  .p-xxl-4 {
		padding: 1.5rem !important;
	  }
	  .p-xxl-5 {
		padding: 3rem !important;
	  }
	  .px-xxl-0 {
		padding-right: 0 !important; padding-left: 0 !important;
	  }
	  .px-xxl-1 {
		padding-right: 0.25rem !important; padding-left: 0.25rem !important;
	  }
	  .px-xxl-2 {
		padding-right: 0.5rem !important; padding-left: 0.5rem !important;
	  }
	  .px-xxl-3 {
		padding-right: 1rem !important; padding-left: 1rem !important;
	  }
	  .px-xxl-4 {
		padding-right: 1.5rem !important; padding-left: 1.5rem !important;
	  }
	  .px-xxl-5 {
		padding-right: 3rem !important; padding-left: 3rem !important;
	  }
	  .py-xxl-0 {
		padding-top: 0 !important; padding-bottom: 0 !important;
	  }
	  .py-xxl-1 {
		padding-top: 0.25rem !important; padding-bottom: 0.25rem !important;
	  }
	  .py-xxl-2 {
		padding-top: 0.5rem !important; padding-bottom: 0.5rem !important;
	  }
	  .py-xxl-3 {
		padding-top: 1rem !important; padding-bottom: 1rem !important;
	  }
	  .py-xxl-4 {
		padding-top: 1.5rem !important; padding-bottom: 1.5rem !important;
	  }
	  .py-xxl-5 {
		padding-top: 3rem !important; padding-bottom: 3rem !important;
	  }
	  .pt-xxl-0 {
		padding-top: 0 !important;
	  }
	  .pt-xxl-1 {
		padding-top: 0.25rem !important;
	  }
	  .pt-xxl-2 {
		padding-top: 0.5rem !important;
	  }
	  .pt-xxl-3 {
		padding-top: 1rem !important;
	  }
	  .pt-xxl-4 {
		padding-top: 1.5rem !important;
	  }
	  .pt-xxl-5 {
		padding-top: 3rem !important;
	  }
	  .pe-xxl-0 {
		padding-right: 0 !important;
	  }
	  .pe-xxl-1 {
		padding-right: 0.25rem !important;
	  }
	  .pe-xxl-2 {
		padding-right: 0.5rem !important;
	  }
	  .pe-xxl-3 {
		padding-right: 1rem !important;
	  }
	  .pe-xxl-4 {
		padding-right: 1.5rem !important;
	  }
	  .pe-xxl-5 {
		padding-right: 3rem !important;
	  }
	  .pb-xxl-0 {
		padding-bottom: 0 !important;
	  }
	  .pb-xxl-1 {
		padding-bottom: 0.25rem !important;
	  }
	  .pb-xxl-2 {
		padding-bottom: 0.5rem !important;
	  }
	  .pb-xxl-3 {
		padding-bottom: 1rem !important;
	  }
	  .pb-xxl-4 {
		padding-bottom: 1.5rem !important;
	  }
	  .pb-xxl-5 {
		padding-bottom: 3rem !important;
	  }
	  .ps-xxl-0 {
		padding-left: 0 !important;
	  }
	  .ps-xxl-1 {
		padding-left: 0.25rem !important;
	  }
	  .ps-xxl-2 {
		padding-left: 0.5rem !important;
	  }
	  .ps-xxl-3 {
		padding-left: 1rem !important;
	  }
	  .ps-xxl-4 {
		padding-left: 1.5rem !important;
	  }
	  .ps-xxl-5 {
		padding-left: 3rem !important;
	  }
	  .text-xxl-start {
		text-align: left !important;
	  }
	  .text-xxl-end {
		text-align: right !important;
	  }
	  .text-xxl-center {
		text-align: center !important;
	  }
	}
	@media (max-width: 575.98px) {
	  .table-responsive-sm {
		overflow-x: auto; -webkit-overflow-scrolling: touch;
	  }
	  .modal-fullscreen-sm-down {
		width: 100vw; max-width: none; height: 100%; margin: 0;
	  }
	  .modal-fullscreen-sm-down .modal-content {
		height: 100%; border: 0; border-radius: 0;
	  }
	  .modal-fullscreen-sm-down .modal-header {
		border-radius: 0;
	  }
	  .modal-fullscreen-sm-down .modal-body {
		overflow-y: auto;
	  }
	  .modal-fullscreen-sm-down .modal-footer {
		border-radius: 0;
	  }
	}
	@media (max-width: 767.98px) {
	  .table-responsive-md {
		overflow-x: auto; -webkit-overflow-scrolling: touch;
	  }
	  .modal-fullscreen-md-down {
		width: 100vw; max-width: none; height: 100%; margin: 0;
	  }
	  .modal-fullscreen-md-down .modal-content {
		height: 100%; border: 0; border-radius: 0;
	  }
	  .modal-fullscreen-md-down .modal-header {
		border-radius: 0;
	  }
	  .modal-fullscreen-md-down .modal-body {
		overflow-y: auto;
	  }
	  .modal-fullscreen-md-down .modal-footer {
		border-radius: 0;
	  }
	}
	@media (max-width: 991.98px) {
	  .table-responsive-lg {
		overflow-x: auto; -webkit-overflow-scrolling: touch;
	  }
	  .modal-fullscreen-lg-down {
		width: 100vw; max-width: none; height: 100%; margin: 0;
	  }
	  .modal-fullscreen-lg-down .modal-content {
		height: 100%; border: 0; border-radius: 0;
	  }
	  .modal-fullscreen-lg-down .modal-header {
		border-radius: 0;
	  }
	  .modal-fullscreen-lg-down .modal-body {
		overflow-y: auto;
	  }
	  .modal-fullscreen-lg-down .modal-footer {
		border-radius: 0;
	  }
	}
	@media (max-width: 1199.98px) {
	  .table-responsive-xl {
		overflow-x: auto; -webkit-overflow-scrolling: touch;
	  }
	  .modal-fullscreen-xl-down {
		width: 100vw; max-width: none; height: 100%; margin: 0;
	  }
	  .modal-fullscreen-xl-down .modal-content {
		height: 100%; border: 0; border-radius: 0;
	  }
	  .modal-fullscreen-xl-down .modal-header {
		border-radius: 0;
	  }
	  .modal-fullscreen-xl-down .modal-body {
		overflow-y: auto;
	  }
	  .modal-fullscreen-xl-down .modal-footer {
		border-radius: 0;
	  }
	}
	@media (max-width: 1399.98px) {
	  .table-responsive-xxl {
		overflow-x: auto; -webkit-overflow-scrolling: touch;
	  }
	  .modal-fullscreen-xxl-down {
		width: 100vw; max-width: none; height: 100%; margin: 0;
	  }
	  .modal-fullscreen-xxl-down .modal-content {
		height: 100%; border: 0; border-radius: 0;
	  }
	  .modal-fullscreen-xxl-down .modal-header {
		border-radius: 0;
	  }
	  .modal-fullscreen-xxl-down .modal-body {
		overflow-y: auto;
	  }
	  .modal-fullscreen-xxl-down .modal-footer {
		border-radius: 0;
	  }
	}
	@media (prefers-reduced-motion: reduce) {
	  .form-control {
		transition: none;
	  }
	  .form-control::file-selector-button {
		transition: none;
	  }
	  .form-control::-webkit-file-upload-button {
		-webkit-transition: none; transition: none;
	  }
	  .form-select {
		transition: none;
	  }
	  .form-switch .form-check-input {
		transition: none;
	  }
	  .form-range::-webkit-slider-thumb {
		-webkit-transition: none; transition: none;
	  }
	  .form-range::-moz-range-thumb {
		-moz-transition: none; transition: none;
	  }
	  .form-floating > label {
		transition: none;
	  }
	  .btn {
		transition: none;
	  }
	  .fade {
		transition: none;
	  }
	  .collapsing {
		transition: none;
	  }
	  .nav-link {
		transition: none;
	  }
	  .navbar-toggler {
		transition: none;
	  }
	  .accordion-button {
		transition: none;
	  }
	  .accordion-button::after {
		transition: none;
	  }
	  .page-link {
		transition: none;
	  }
	  .progress-bar {
		transition: none;
	  }
	  .progress-bar-animated {
		-webkit-animation: none; animation: none;
	  }
	  .modal.fade .modal-dialog {
		transition: none;
	  }
	  .carousel-item {
		transition: none;
	  }
	  .carousel-fade .active.carousel-item-start {
		transition: none;
	  }
	  .carousel-fade .active.carousel-item-end {
		transition: none;
	  }
	  .carousel-control-prev {
		transition: none;
	  }
	  .carousel-control-next {
		transition: none;
	  }
	  .carousel-indicators [data-bs-target] {
		transition: none;
	  }
	  .spinner-border {
		-webkit-animation-duration: 1.5s; animation-duration: 1.5s;
	  }
	  .spinner-grow {
		-webkit-animation-duration: 1.5s; animation-duration: 1.5s;
	  }
	  .offcanvas {
		transition: none;
	  }
	}
	</style>
	</head>
			  
				<body style="box-sizing: border-box; font-family: var(--bs-font-sans-serif); font-size: 1rem; font-weight: 400; line-height: 1.5; color: #212529; -webkit-text-size-adjust: 100%; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); width: 100%; align-content: center; justify-content: center; display: flex; margin: 0;" bgcolor="#E5E5E5">
					<div class="content" style="box-sizing: border-box; display: flex; width: 100%; flex-wrap: wrap; flex-direction: column; max-width: 580px; min-width: 400px; align-content: center; justify-content: center; position: relative;">
						<div class="header" style="box-sizing: border-box; display: flex; flex-wrap: wrap; flex-direction: column; justify-content: center; align-content: center; width: 100%; position: relative;">
							<div class="logo" style="box-sizing: border-box; display: flex; justify-content: center; width: 100%; margin-top: 20px; position: relative;">
								<img src="https://storage.googleapis.com/fidelight-api/email/img/logo.png" class="logo_image" alt="Logo Fidelight" style="box-sizing: border-box; vertical-align: middle; width: 30px;">
							</div>
							<div class="brand_name" style="box-sizing: border-box; display: flex; justify-content: center; margin-top: 15px; margin-bottom: 20px; width: 100%; position: relative;">
								<img src="https://storage.googleapis.com/fidelight-api/email/img/name.png" class="brand_name_image" alt="Name Fidelight" style="box-sizing: border-box; vertical-align: middle; width: 100px;">
							</div>
							<div class="title" style="box-sizing: border-box; display: flex; justify-content: center; color: rgba(0, 0, 0, 1); width: 100%; position: relative; font-family: Inter; font-size: 24px; letter-spacing: 0;" align="center">Email Confirmation</div>
						</div>
						<div class="box_mail" style="box-sizing: border-box; display: flex; flex-wrap: wrap; flex-direction: column; background-color: rgba(255, 255, 255, 1); width: 100%; position: relative; align-content: center; justify-content: center; margin-top: 30px; border-top-left-radius: 10px; border-top-right-radius: 10px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; padding: 20px;">
							<div class="thank_you_message" style="box-sizing: border-box; display: flex; color: rgba(50, 50, 50, 1); width: 100%; position: relative; font-family: Inter; margin-bottom: 10px; font-size: 16px; letter-spacing: 0;" align="center">Thank you for subscribing ${company}. Please confirm your email by clicking on the following button:</div>
							<div class="confirmation_link" style="box-sizing: border-box; display: flex; color: rgba(35, 50, 250, 1); width: 100%; justify-content: center; position: relative; font-family: Inter; font-size: 24px; letter-spacing: 0;" align="center">
								<a href="${confirmationURL}" style="box-sizing: border-box; color: #0d6efd; text-decoration: none;">Click here !</a>
							</div>
							<div class="separatorDiv" style="box-sizing: border-box; display: flex; width: 100%; align-content: center; justify-content: center; position: relative; margin-top: 20px; margin-bottom: 20px;">
								<img src="https://storage.googleapis.com/fidelight-api/email/img/separator.png" class="separator" alt="Name Fidelight" style="box-sizing: border-box; vertical-align: middle; width: 30%;">
							</div>
							<div class="get_app_msg" style="box-sizing: border-box; display: flex; color: rgba(0, 0, 0, 1); width: 100%; justify-content: center; position: relative; font-family: Inter; font-size: 24px; letter-spacing: 0; margin-bottom: 10px;" align="center">Get the Fidelight app!</div>
							<div class="get_app_detail" style="box-sizing: border-box; display: flex; color: rgba(100, 100, 100, 1); width: 100%; justify-content: center; position: relative; font-family: Inter; font-size: 16px; letter-spacing: 0; margin-bottom: 15px;" align="center">Get the most of Fidelight by installing the mobile app. You can log in by using your email address and password.</div>
							<div class="download" style="box-sizing: border-box; display: flex; width: 100%; position: relative; flex-wrap: wrap; flex-direction: row; align-content: center; justify-content: center; margin-bottom: 15px;">
								<div class="download_left" style="box-sizing: border-box; display: flex; justify-content: right; width: 50%; height: 55px; padding-right: 10px; position: relative;">
									<img src="https://storage.googleapis.com/fidelight-api/email/img/download_apple.png" alt="Download Fidelight for iOS" class="download_logo" style="box-sizing: border-box; vertical-align: middle; display: flex; justify-content: center; height: 55px; margin-right: 10px; margin-left: 10px; position: relative;">
								</div>
								<div class="download_right" style="box-sizing: border-box; display: flex; justify-content: left; width: 50%; height: 55px; padding-left: 10px; position: relative;">
									<img src="https://storage.googleapis.com/fidelight-api/email/img/download_android.png" alt="Download Fidelight for Android" class="download_logo" style="box-sizing: border-box; vertical-align: middle; display: flex; justify-content: center; height: 55px; margin-right: 10px; margin-left: 10px; position: relative;">
								</div>
							</div>
							<div class="social_links" style="box-sizing: border-box; display: flex; flex-wrap: wrap; justify-content: center; flex-direction: row; width: 100%; min-width: 120px; position: relative;">
								<div class="social_logo" style="box-sizing: border-box; width: 24px; height: 24px; margin-left: 12px; margin-right: 12px; position: relative;">
									<img src="https://storage.googleapis.com/fidelight-api/email/img/twitter_logo.png" class="social_img" alt="Fidelight on Twitter" style="box-sizing: border-box; vertical-align: middle; width: 24px;">
								</div>
								<div class="social_logo" style="box-sizing: border-box; width: 24px; height: 24px; margin-left: 12px; margin-right: 12px; position: relative;">
									<img src="https://storage.googleapis.com/fidelight-api/email/img/facebook_logo.png" class="social_img" alt="Fidelight on Facebook" style="box-sizing: border-box; vertical-align: middle; width: 24px;">
								</div>
								<div class="social_logo" style="box-sizing: border-box; width: 24px; height: 24px; margin-left: 12px; margin-right: 12px; position: relative;">
									<img src="https://storage.googleapis.com/fidelight-api/email/img/linkedin_logo.png" class="social_img" alt="Fidelight on Linkedin" style="box-sizing: border-box; vertical-align: middle; width: 24px;">
								</div>
							</div>
							<div class="brand_name" style="box-sizing: border-box; display: flex; justify-content: center; margin-top: 15px; margin-bottom: 20px; width: 100%; position: relative;">
								<img src="https://storage.googleapis.com/fidelight-api/email/img/name.png" class="brand_name_image" alt="Logo Fidelight" style="box-sizing: border-box; vertical-align: middle; width: 100px;">
							</div>
							<span class="footer" style="box-sizing: border-box; display: flex; justify-content: center; color: rgba(150, 150, 150, 1); width: 100%; position: relative; font-family: Inter; text-align: center; font-size: 12px; letter-spacing: 0;">Copyright © 2021 Fidelight</span>
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