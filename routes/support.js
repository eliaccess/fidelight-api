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

router.post('/v1/support/ticket', newTicketVry, (req, res, next) => {
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
                res.status(410).jsonp({msg:"An error has occured. Please contact our support or try again later."});
                next(err);
            } else {
                res.status(200).jsonp({msg:"Ticket added successfully!"});
            }
        });
    } catch (err) {
        res.status(400).jsonp({msg:"An error has occured. Please contact our support or try again later."});
        next(err);
    }
});


let upTicketVry = [
    check('ticketId').exists(),
    check('answerTo').exists()
];

router.post('/v1/support/ticket/:ticketId', upTicketVry, (req, res, next) => {
    try {
        validationResult(req).throw();
        const ticket = {
            answer_to: req.body.answerTo
        }
        db.query("UPDATE ticket SET ? WHERE id = ?", [ticket, req.params.ticketId], (err, rows, result) => {
            if (err) {
                res.status(410).jsonp({msg:"An error has occured. Please contact our support or try again later."});
                next(err);
            } else {
                res.status(200).jsonp({msg:"Ticket updated successfully!"});
            }
        });
    } catch (err) {
        res.status(400).json({msg:"An error has occured. Please contact our support or try again later."});
        next(err);
    }
});

let ticketVry = [
    check('ticketId').exists()
];

router.get('/v1/support/ticket/:ticketId', ticketVry, (req, res, next) => {
    try {
        db.query("SELECT * FROM ticket WHERE id = ?", [req.params.ticketId], (err, rows, result) => {
            if (err) {
                res.status(410).jsonp({msg:"An error has occured. Please contact our support or try again later."});
                next(err);
            } else {
                if (rows[0]) {
                    res.status(200).jsonp({data:rows[0], msg:"Ticket loaded."});
                } else {
                    res.status(410).jsonp({msg:"Ticket not found!"});
                }
            }
        });
    } catch (err) {
        res.status(400).json({msg:"An error has occured. Please contact our support or try again later."});
        next(err);
    }
});

module.exports = router;