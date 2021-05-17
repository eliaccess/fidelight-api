const express = require('express');
const router = express.Router();
const db = require('../modules/dbConnect');
const midWare = require('../modules/middleware');
const { check, validationResult } = require('express-validator');

let traVry = [
    midWare.checkToken
];


router.get('/api/transaction/:transId', traVry, (req, res, next) => {
    try {
        validationResult(req).throw();
        if(req.decoded.type == 'company') {
            db.query("SELECT transaction.id AS id, transaction.discount AS discount, user.name AS userName, user.surname AS userSurname, company.id AS companyId, company.name AS companyName, transaction.value AS value, transaction.date AS date FROM transaction INNER JOIN user ON transaction.user = user.id INNER JOIN company ON company.id = transaction.company WHERE transaction.company = ? AND transaction.id = ?", [req.decoded.id, req.params.transId], (err, rows, result) => {
                if (err) {
                    res.status(410).jsonp(err);
                    next(err);
                } else {
                    if (rows[0]) {
                        if(rows[0].discount != null){
                            db.query("SELECT name FROM discount WHERE id = ?", [rows[0].discount], (err, rows2, result) => {
                                if (err) {
                                    res.status(410).jsonp(err);
                                    next(err);
                                } else {
                                    console.log(rows[0]);
                                    res.status(200).jsonp({transaction: rows[0].id, discount_id: rows[0].discount, discount_name: rows2[0].name, company_id: rows[0].companyId, company_name: rows[0].companyName, user_name: rows[0].userName, user_surname: rows[0].userSurname, value: rows[0].value, date: rows[0].date});
                                }
                            });
                        } else {
                            res.status(200).jsonp({transaction: rows[0].id, discount:null, company_id: rows[0].companyId, company_name: rows[0].companyName, user_name: rows[0].userName, user_surname: rows[0].userSurname, value: rows[0].value, date: rows[0].date});
                        }
                    } else {
                        res.status(404).jsonp("Transaction not found!");
                    }
                }
            });
        } else if(req.decoded.type == 'user') {
            db.query("SELECT transaction.id AS id, transaction.discount AS discount, user.name AS userName, user.surname AS userSurname, company.id AS companyId, company.name AS companyName, transaction.value AS value, transaction.date AS date FROM transaction INNER JOIN user ON transaction.user = user.id INNER JOIN company ON company.id = transaction.company WHERE transaction.user = ? AND transaction.id = ?", [req.decoded.id, req.params.transId], (err, rows, result) => {
                if (err) {
                    res.status(410).jsonp(err);
                    next(err);
                } else {
                    if (rows[0]) {
                        if(rows[0].discount != null){
                            db.query("SELECT name FROM discount WHERE id = ?", [rows[0].discount], (err, rows2, result) => {
                                if (err) {
                                    res.status(410).jsonp(err);
                                    next(err);
                                } else {
                                    console.log(rows[0]);
                                    res.status(200).jsonp({transaction: rows[0].id, discount_id: rows[0].discount, discount_name: rows2[0].name, company_id: rows[0].companyId, company_name: rows[0].companyName, user_name: rows[0].userName, user_surname: rows[0].userSurname, value: rows[0].value, date: rows[0].date});
                                }
                            });
                        } else {
                            res.status(200).jsonp({transaction: rows[0].id, discount:null, company_id: rows[0].companyId, company_name: rows[0].companyName, user_name: rows[0].userName, user_surname: rows[0].userSurname, value: rows[0].value, date: rows[0].date});
                        }
                    } else {
                        res.status(404).jsonp("Transaction not found!");
                    }
                }
            });
        } else {
            res.status(403).jsonp('Access forbidden');
            return 2;
        }
    } catch (err) {
        res.status(400).json(err);
    }
});


router.get('/api/transaction', midWare.checkToken, (req, res, next) => {
    try {
        validationResult(req).throw();
        if(req.decoded.type == 'company') {
            db.query("SELECT transaction.id AS id, user.surname AS surname, transaction.discount as discount, transaction.value as value, transaction.date as date FROM transaction INNER JOIN user ON user.id = transaction.user WHERE transaction.company = ? ORDER BY transaction.date DESC", [req.decoded.id], (err, rows, result) => {
                if (err) {
                    res.status(410).jsonp(err);
                    next(err);
                } else {
                    if (rows[0]) {
                        let transact = [];
                        rows.forEach(rws => {
                            transact.push({ transaction: rws.id, user: rws.surname, discount: rws.discount, value: rws.value, date: rws.date });
                        });
                        res.status(200).jsonp(transact);
                    } else {
                        res.status(404).jsonp("No Transaction Found!");
                    }
                }
            });
        } else if(req.decoded.type == 'user') {
            db.query("SELECT transaction.id AS id, company.id as company_id, company.name as company_name, transaction.discount as discount, transaction.value as value, transaction.date as date FROM transaction INNER JOIN company ON transaction.company = company.id WHERE transaction.user = ? ORDER BY transaction.date DESC LIMIT 20", [req.decoded.id],(err, rows, result) => {
                if (err) {
                    res.status(410).jsonp(err);
                    next(err);
                } else {
                    if (rows[0]) {
                        let transact = [];
                        rows.forEach(rws => {
                            transact.push({ transaction: rws.id, company_id: rws.company_id, company_name: rws.company_name, discount: rws.discount, value: rws.value, date: rws.date });
                        });
                        res.status(200).jsonp(transact);
                    } else {
                        res.status(404).jsonp("No Transaction Found!");
                    }
                }
            });
        } else {
            res.status(403).jsonp('Access forbidden');
            return 2;
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

/* TODO:? */
router.delete('/api/transaction/:transactionId', midWare.checkToken, (req, res, next) => {
    try {
        db.query("DELETE FROM transaction WHERE discountId = ? AND seller = ? AND company = ?", [req.params.discountId], (err, result) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                db.query("DELETE FROM discount_repetition WHERE discountId = ?", [req.params.discountId], (err, result) => {
                    if (err) {
                        res.status(410).jsonp(err);
                        next(err);
                    } else {
                        db.query("DELETE FROM discount_value WHERE discountId = ?", [req.params.discountId], (err, result) => {
                            if (err) {
                                res.status(410).jsonp(err);
                                next(err);
                            } else {
                                res.status(200).jsonp("Discount deleted successfully!");
                            }
                        });
                    }
                });
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

/*
router.get('/api/company/statistics/discount', midWare.checkToken, (req, res, next) => {
    try {
        db.query("SELECT * FROM transaction WHERE userId = ?", [req.decoded.id], (err, rows, result) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if(rows[0])
                    res.status(200).jsonp(rows);
                else
                    res.status(404).jsonp("Transaction not found!");
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


router.get('/api/company/statistics/discount/:discountId', midWare.checkToken, (req, res, next) => {
    try {
        db.query("SELECT * FROM transaction WHERE discountId = ? AND userId = ?", [req.params.discountId, req.decoded.id], (err, rows, result) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if(rows[0])
                    res.status(200).jsonp(rows);
                else
                    res.status(404).jsonp("Transaction not found!");
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


router.get('/api/company/statistics/seller/:sellerId', midWare.checkToken, (req, res, next) => {
    try {
        db.query("SELECT * FROM transaction WHERE seller = ?", [req.params.sellerId], (err, rows, result) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if(rows[0])
                    res.status(200).jsonp(rows);
                else
                    res.status(404).jsonp("Transaction not found!");
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});
*/
module.exports = router;