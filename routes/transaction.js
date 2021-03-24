const express = require('express');
const router = express.Router();
const db = require('../modules/dbConnect');
const midWare = require('../modules/middleware');
const { check, validationResult } = require('express-validator');

let traVry = [
    check('transId').exists(),
    midWare.checkToken
];

router.get('/user/transaction/:transId', traVry, (req, res, next) => {
    try {
        validationResult(req).throw();
        db.query("SELECT * FROM transaction INNER JOIN discount ON discount.id = transaction.discountId INNER JOIN company ON company.id = discount.companyId WHERE transaction.userId = ? AND transaction.id = ?", [req.decoded.id, req.params.transId], (err, rows, result) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if (rows[0]) {
                    res.status(200).jsonp({company: rows[0].name, discount: rows[0].cost, value: rows[0].value, date: rows[0].date, nb_used: rows[0].nb_used, money_saved: rows[0].money_saved});
                } else {
                    res.status(404).jsonp("Transaction not found!");
                }
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


router.get('/user/transaction', midWare.checkToken, (req, res, next) => {
    try {
        validationResult(req).throw();
        db.query("SELECT * FROM transaction INNER JOIN discount ON discount.id = transaction.discountId INNER JOIN company ON company.id = discount.companyId", (err, rows, result) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if (rows[0]) {
                    let transact = [];
                    rows.forEach(rws => {
                        transact.push({ company: rws.name, discount: rws.cost, value: rws.value, date: rws.date });
                    });
                    res.status(200).jsonp(transact);
                } else {
                    res.status(404).jsonp("No Transaction Found!");
                }
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


router.get('/api/discount/type', (req, res, next) => {
    try {
        db.query("SELECT * FROM discount_type", (err, rows, result) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if (rows[0]) {
                    res.status(200).jsonp(rows);
                } else {
                    res.status(410).jsonp("Discount type not found!");
                }
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/api/points/type', (req, res, next) => {
    try {
        db.query("SELECT * FROM points_earning_type", (err, rows, result) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if (rows[0]) {
                    res.status(200).jsonp(rows);
                } else {
                    res.status(410).jsonp("Point type not found!");
                }
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;