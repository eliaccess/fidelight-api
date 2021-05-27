const express = require('express');
const router = express.Router();
const db = require('../modules/dbConnect');
const midWare = require('../modules/middleware');
const { check, validationResult } = require('express-validator');

let traVry = [
    midWare.checkToken
];


router.get('/api/v1/transaction/:transId', traVry, (req, res, next) => {
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


router.get('/api/v1/transaction', midWare.checkToken, (req, res, next) => {
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


router.delete('/api/v1/transaction/:transactionId', midWare.checkToken, (req, res, next) => {
    try {
        /* Steps :
        - see if transaction exists
        - see if the transaction was created less than 10 minutes earlier
        - Check if it was points giving or discount usage
        - get the points back / remove the points from the wallet of the user
        - if it was a discount, decrement the times_used amount 
        - delete the transaction */
        if(req.decoded.type != 'company'){
            res.status(403).jsonp('Access forbidden');
            return 2;
        }

        validationResult(req).throw();

        db.query("SELECT date, value, discount, user FROM transaction WHERE id = ? AND company = ?", [req.params.transactionId, req.decoded.id], (err, rows,result) => {
            /* Checking if the transaction exists */
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else if (rows[0]){
                actual_time = new Date();
                diffMins = parseInt((actual_time - rows[0].date) / (1000 * 60) % 60);
                /* Checking if the transaction is less than 10 minutes old */
                if (diffMins >= 0 && diffMins < 10){
                    /* Checking if discount usage or giving points */
                    if(rows[0].discount){
                        /* Giving back points on user balance */
                        db.query("UPDATE balance SET points = points + ? WHERE user = ? AND company = ?", [rows[0].value, rows[0].user, req.decoded.id], (err, result2) => {
                            if (err) {
                                res.status(410).jsonp(err);
                                next(err);
                            } else if (result2.affectedRows){
                                /* Decreasing times_used from discount */
                                db.query("UPDATE discount SET times_used = times_used - 1 WHERE id = ? AND company = ? AND times_used >= 0", [rows[0].discount, req.decoded.id], (err, result3) => {
                                    if (err) {
                                        res.status(410).jsonp(err);
                                        next(err);
                                    } else {
                                        /* Deleting the transaction */
                                        db.query("DELETE FROM transaction WHERE id = ? AND company = ?", [req.params.transactionId, req.decoded.id], (err, result2) => {
                                            if (err) {
                                                res.status(410).jsonp(err);
                                                next(err);
                                            } else {
                                                res.status(200).jsonp('Transaction deleted');
                                            }
                                        });
                                    }
                                });
                            } else {
                                res.status(403).jsonp('Error when trying to give points back to the user');
                            }
                        });
                    } else {
                        /* Removing points from balance of the user if balance allows it */
                        db.query("UPDATE balance SET points = points - ? WHERE user = ? AND company = ? AND points >= ?", [rows[0].value, rows[0].user, req.decoded.id, rows[0].value], (err, result2) => {
                            if (err) {
                                res.status(410).jsonp(err);
                                next(err);
                            } else if (result2.affectedRows){
                                /* Deleting the transaction */
                                db.query("DELETE FROM transaction WHERE id = ? AND company = ?", [req.params.transactionId, req.decoded.id], (err, result2) => {
                                    if (err) {
                                        res.status(410).jsonp(err);
                                        next(err);
                                    } else {
                                        res.status(200).jsonp('Transaction deleted');
                                    }
                                });
                            } else {
                                res.status(403).jsonp('User does not have enough points to refund');
                            }
                        });
                    }
                } else {
                    res.status(403).jsonp('Transaction expired (more than 10 minutes old)');
                }
            } else {
                res.status(403).jsonp('Transaction does not exist');
            }
        });/*
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
        });*/
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