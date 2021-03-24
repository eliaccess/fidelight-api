const express = require('express');
const router = express.Router();
const db = require('../modules/dbConnect');
const midWare = require('../modules/middleware');
const { check, validationResult } = require('express-validator');


let newTicketVry = [
    check('userId').exists(),
    check('companyId').exists(),
    check('title').exists(),
    check('message').exists()
];

router.post('/api/support/ticket', newTicketVry, (req, res, next) => {
    try {
        validationResult(req).throw();
        const ticket = {
            userId: req.body.userId,
            companyId: req.body.companyId,
            title: req.body.title,
            message: req.body.message,
            answer_to: null,
            post_date: new Date(),
            open: '1'
        }
        db.query("INSERT INTO ticket SET ?", [ticket], (err, rows, result) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                res.status(200).jsonp("Ticket added successfully!");
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


let upTicketVry = [
    check('ticketId').exists(),
    check('answerTo').exists()
];

router.post('/api/support/ticket/:ticketId', upTicketVry, (req, res, next) => {
    try {
        validationResult(req).throw();
        const ticket = {
            answer_to: req.body.answerTo
        }
        db.query("UPDATE ticket SET ? WHERE id = ?", [ticket, req.params.ticketId], (err, rows, result) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                res.status(200).jsonp("Ticket updated successfully!");
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

let ticketVry = [
    check('ticketId').exists()
];

router.get('/api/support/ticket/:ticketId', ticketVry, (req, res, next) => {
    try {
        db.query("SELECT * FROM ticket WHERE id = ?", [req.params.ticketId], (err, rows, result) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if (rows[0]) {
                    res.status(200).jsonp(rows[0]);
                } else {
                    res.status(410).jsonp("Ticket not found!");
                }
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;