const express = require('express');
const {format} = require('util');
const router = express.Router();
const db = require('../modules/dbConnect');
const midWare = require('../modules/middleware');
const { check, validationResult } = require('express-validator');

let traVry = [
    midWare.checkToken
];


router.get('/v1/transaction/:transId', traVry, (req, res, next) => {
    try {
        validationResult(req).throw();
        if(req.decoded.type == 'company') {
            db.query("SELECT transaction.id AS id, transaction.discount AS discount, user.name AS userName, user.surname AS userSurname, company.id AS companyId, company.name AS companyName, transaction.value AS value, transaction.date AS date FROM transaction INNER JOIN user ON transaction.user = user.id INNER JOIN company ON company.id = transaction.company WHERE transaction.company = ? AND transaction.id = ?", [req.decoded.id, req.params.transId], (err, rows, result) => {
                if (err) {
                    res.status(410).jsonp({msg:err});
                    next(err);
                } else {
                    if (rows[0]) {
                        if(rows[0].discount != null){
                            db.query("SELECT name FROM discount WHERE id = ?", [rows[0].discount], (err, rows2, result) => {
                                if (err) {
                                    res.status(410).jsonp({msg:err});
                                    next(err);
                                } else {
                                    res.status(200).jsonp({data:{ id: rows[0].id, discountId: rows[0].discount, discountName: rows2[0].name, companyId: rows[0].companyId, companyName: rows[0].companyName, userName: rows[0].userName, userNurname: rows[0].userSurname, value: rows[0].value, date: rows[0].date}, msg:"success"});
                                }
                            });
                        } else {
                            res.status(200).jsonp({data:{ id: rows[0].id, discountId:null, companyId: rows[0].companyId, companyName: rows[0].companyName, userName: rows[0].userName, userSurname: rows[0].userSurname, value: rows[0].value, date: rows[0].date},msg:"success"});
                        }
                    } else {
                        res.status(404).jsonp({msg:"Transaction not found!"});
                    }
                }
            });
        } else if(req.decoded.type == 'user') {
            db.query("SELECT transaction.id AS id, transaction.discount AS discount, user.name AS userName, user.surname AS userSurname, company.id AS companyId, company.name AS companyName, transaction.value AS value, transaction.date AS date FROM transaction INNER JOIN user ON transaction.user = user.id INNER JOIN company ON company.id = transaction.company WHERE transaction.user = ? AND transaction.id = ?", [req.decoded.id, req.params.transId], (err, rows, result) => {
                if (err) {
                    res.status(410).jsonp({msg:err});
                    next(err);
                } else {
                    if (rows[0]) {
                        if(rows[0].discount != null){
                            db.query("SELECT name FROM discount WHERE id = ?", [rows[0].discount], (err, rows2, result) => {
                                if (err) {
                                    res.status(410).jsonp({msg:err});
                                    next(err);
                                } else {
                                    res.status(200).jsonp({data:{ id: rows[0].id, discountId: rows[0].discount, discountName: rows2[0].name, companyId: rows[0].companyId, companyName: rows[0].companyName, userName: rows[0].userName, userSurname: rows[0].userSurname, value: rows[0].value, date: rows[0].date}, msg:"success"});
                                }
                            });
                        } else {
                            res.status(200).jsonp({data:{ id: rows[0].id, discountId: null, companyId: rows[0].companyId, companyName: rows[0].companyName, userName: rows[0].userName, userSurname: rows[0].userSurname, value: rows[0].value, date: rows[0].date}, msg:"success"});
                        }
                    } else {
                        res.status(404).jsonp({msg:"Transaction not found!"});
                    }
                }
            });
        } else {
            res.status(403).jsonp({msg:'Access forbidden'});
            return 2;
        }
    } catch (err) {
        res.status(400).json({msg:err});
    }
});

/* TODO: ADD DISCOUNT NAME IN RETURNED, AND USER SURNAME */
router.get('/v1/transactions', midWare.checkToken, (req, res, next) => {
    try {
        validationResult(req).throw();
        if(req.decoded.type == 'company') {
            db.query("SELECT transaction.id AS id, user.surname AS surname, transaction.discount as discount, transaction.value as value, transaction.date as date FROM transaction INNER JOIN user ON user.id = transaction.user WHERE transaction.company = ? ORDER BY transaction.date DESC LIMIT 20", [req.decoded.id], (err, rows, result) => {
                if (err) {
                    res.status(410).jsonp({msg:err});
                    next(err);
                } else {
                    if (rows[0]) {
                        var transact = [];
                        rows.forEach(rws => {
                            /* Separating rewards and offers usage */
                            if(rws.discount != null){
                               db.query("SELECT name FROM discount WHERE id = ?", [rws.discount], (err, rows2, result) => {
                                    if (err) {
                                        res.status(410).jsonp({msg:err});
                                        next(err);
                                    } else if (rows2[0] != null) {
                                        transact.push({id: rws.id, discountId: rws.discount, discountName: rows2[0].name, userSurname: rws.surname, value: rws.value, date: rws.date});
                                    } else {
                                        transact.push({id: rws.id, discountId: rws.discount, discountName: "deleted", userSurname: rws.surname, value: rws.value, date: rws.date});
                                    }
                                });
                            } else {
                                transact.push({id: rws.id, userSurname: rws.surname, discountId: null, value: rws.value, date: rws.date});
                            }
                        });

                        res.status(200).jsonp({data:transact, msg:"success"});
                    } else {
                        res.status(404).jsonp({msg:"No Transaction Found!"});
                    }
                }
            });
        } else if(req.decoded.type == 'user') {
            db.query("SELECT transaction.id AS id, company.id as company_id, company.name as company_name, company.logo_link AS companyLogoLink, transaction.discount as discount, transaction.value as value, transaction.date as date, discount.name AS discountName FROM transaction INNER JOIN company ON transaction.company = company.id LEFT JOIN discount ON transaction.discount = discount.id WHERE transaction.user = ? ORDER BY transaction.date DESC LIMIT 20", [req.decoded.id],(err, rows, result) => {
                if (err) {
                    res.status(410).jsonp({msg:err});
                    next(err);
                } else {
                    if (rows[0]) {
                        const bucketName = "fidelight-api";
                        var transact = [];
                        var counter = 0;
                        rows.forEach(rws => {
                            /* Generating logo links for companies */
                            if(rws.companyLogoLink == null){
                                rows[counter].companyLogoLink = null;
                            } else {
                                rows[counter].companyLogoLink = format(
                                    `https://storage.googleapis.com/${bucketName}/${rws.companyLogoLink}`
                                );
                            }
                            counter++;

                            /* Separating rewards and offers usage */
                            if(rws.discount != null){
                                if (rws.discountName != null) {
                                    transact.push({id: rws.id, discountId: rws.discount, discountName: rws.discountName, companyId: rws.company_id, companyName: rws.company_name, companyLogoLink: rws.companyLogoLink, value: rws.value, date: rws.date });
                                } else {
                                    transact.push({id: rws.id, discountId: rws.discount, discountName: "deleted", companyId: rws.company_id, companyName: rws.company_name, companyLogoLink: rws.companyLogoLink, value: rws.value, date: rws.date });
                                }
                            } else {
                                transact.push({id: rws.id, companyId: rws.company_id, companyName: rws.company_name, companyLogoLink: rws.companyLogoLink, discountId: null, value: rws.value, date: rws.date});
                            }
                        });
                        res.status(200).jsonp({data:transact, msg:"success"});
                    } else {
                        res.status(404).jsonp({msg:"No Transaction Found!"});
                    }
                }
            });
        } else {
            res.status(403).jsonp({msg:'Access forbidden'});
            return 2;
        }
    } catch (err) {
        res.status(400).json({msg:err});
    }
});


router.delete('/v1/transaction/:transactionId', midWare.checkToken, (req, res, next) => {
    try {
        /* Steps :
        - see if transaction exists
        - see if the transaction was created less than 10 minutes earlier
        - Check if it was points giving or discount usage
        - get the points back / remove the points from the wallet of the user
        - if it was a discount, decrement the times_used amount 
        - delete the transaction */
        if(req.decoded.type != 'company'){
            res.status(403).jsonp({msg:'Access forbidden'});
            return 2;
        }

        validationResult(req).throw();

        db.query("SELECT date, value, discount, user FROM transaction WHERE id = ? AND company = ?", [req.params.transactionId, req.decoded.id], (err, rows,result) => {
            /* Checking if the transaction exists */
            if (err) {
                res.status(410).jsonp({msg:err});
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
                                res.status(410).jsonp({msg:err});
                                next(err);
                            } else if (result2.affectedRows){
                                /* Decreasing times_used from discount */
                                db.query("UPDATE discount SET times_used = times_used - 1 WHERE id = ? AND company = ? AND times_used >= 0", [rows[0].discount, req.decoded.id], (err, result3) => {
                                    if (err) {
                                        res.status(410).jsonp({msg:err});
                                        next(err);
                                    } else {
                                        /* Deleting the transaction */
                                        db.query("DELETE FROM transaction WHERE id = ? AND company = ?", [req.params.transactionId, req.decoded.id], (err, result2) => {
                                            if (err) {
                                                res.status(410).jsonp({msg:err});
                                                next(err);
                                            } else {
                                                res.status(200).jsonp({msg:'Transaction deleted'});
                                            }
                                        });
                                    }
                                });
                            } else {
                                res.status(403).jsonp({msg:'Error when trying to give points back to the user'});
                            }
                        });
                    } else {
                        /* Removing points from balance of the user if balance allows it */
                        db.query("UPDATE balance SET points = points - ? WHERE user = ? AND company = ? AND points >= ?", [rows[0].value, rows[0].user, req.decoded.id, rows[0].value], (err, result2) => {
                            if (err) {
                                res.status(410).jsonp({msg:err});
                                next(err);
                            } else if (result2.affectedRows){
                                /* Deleting the transaction */
                                db.query("DELETE FROM transaction WHERE id = ? AND company = ?", [req.params.transactionId, req.decoded.id], (err, result2) => {
                                    if (err) {
                                        res.status(410).jsonp({msg:err});
                                        next(err);
                                    } else {
                                        res.status(200).jsonp({msg:'Transaction deleted'});
                                    }
                                });
                            } else {
                                res.status(403).jsonp({msg:'User does not have enough points to refund'});
                            }
                        });
                    }
                } else {
                    res.status(403).jsonp({msg:'Transaction expired (more than 10 minutes old)'});
                }
            } else {
                res.status(403).jsonp({msg:'Transaction does not exist'});
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
        res.status(400).json({msg:err});
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