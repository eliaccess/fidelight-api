const express = require('express');
const router = express.Router();
const db = require('../modules/dbConnect');
const midWare = require('../modules/middleware');
const { check, validationResult } = require('express-validator');

let cpyPoint = [
    check('type').exists(),
    check('value').exists(),
    midWare.checkToken
];

router.post('/api/company/points', cpyPoint, (req, res, next) => {
    try {
        if(req.decoded.type != 'company'){
            res.status(403).jsonp('Access forbidden');
            return 2;
        }

        validationResult(req).throw();
        const point = {
            company: req.decoded.id,
            points_earning_type: req.body.type,
            value: req.body.value
        }
        db.query("SELECT 1 FROM points_earning WHERE company = ?", [req.decoded.id], (err, rows, result) => {
            if(err){
                res.status(410).jsonp(err);
                next(err);
            } else {
                if(rows[0]){
                    db.query("UPDATE points_earning SET ? WHERE company = ?", [point, req.decoded.id], (err, rows, result) => {
                        if (err) {
                            res.status(410).jsonp(err);
                            next(err);
                        } else {
                            res.status(200).jsonp("Point edited successfully!");
                        }
                    });
                } else {
                    db.query("INSERT INTO points_earning SET ?", [point], (err, rows, result) => {
                        if (err) {
                            res.status(410).jsonp(err);
                            next(err);
                        } else {
                            res.status(200).jsonp("Point added successfully!");
                        }
                    });
                }
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/api/company/points/:companyId', midWare.checkToken, (req, res, next) => {
    try {
        db.query("SELECT * FROM points_earning WHERE company = ?", [req.params.companyId], (err, rows, result) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                res.status(200).jsonp({type: rows[0].points_earning_type, value:  rows[0].value });
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


let upCpyPoint = [
    check('type').exists(),
    check('value').exists(),
    midWare.checkToken
];

router.put('/api/company/points/', upCpyPoint, (req, res, next) => {
    try {
        if(req.decoded.type != 'company'){
            res.status(403).jsonp('Access forbidden');
            return 2;
        }

        validationResult(req).throw();
        const point = {
            company: req.decoded.id,
            points_earning_type: req.body.type,
            value: req.body.value
        }
        db.query("SELECT 1 FROM points_earning WHERE company = ?", [req.decoded.id], (err, rows, result) => {
            if(err){
                res.status(410).jsonp(err);
                next(err);
            } else {
                if(rows[0]){
                    db.query("UPDATE points_earning SET ? WHERE company = ?", [point, req.decoded.id], (err, rows, result) => {
                        if (err) {
                            res.status(410).jsonp(err);
                            next(err);
                        } else {
                            res.status(200).jsonp("Point edited successfully!");
                        }
                    });
                } else {
                    db.query("INSERT INTO points_earning SET ?", [point], (err, rows, result) => {
                        if (err) {
                            res.status(410).jsonp(err);
                            next(err);
                        } else {
                            res.status(200).jsonp("Point added successfully!");
                        }
                    });
                }
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

/*
router.delete('/api/company/points/', midWare.checkToken, (req, res, next) => {
    try {
        if(req.decoded.type != 'company'){
            res.status(403).jsonp('Access forbidden');
            return 2;
        }

        validationResult(req).throw();
        db.query("DELETE FROM points_earning WHERE company = ?", [req.decoded.id], (err, rows, result) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                res.status(200).jsonp("Point deleted successfully!");
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});
*/


router.get('/api/points/type', midWare.checkToken,(req, res, next) => {
    try {
        validationResult(req).throw();
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


let usePts = [
    check('user').exists(),
    check('points').exists(),
    midWare.checkToken
];

router.post('/api/company/points/use/', usePts, (req, res, next) => {
    try {
        console.log("2");
        if(req.decoded.type != 'company'){
            res.status(403).jsonp('Access forbidden');
            return 2;
        }
        if((typeof req.body.points != "number") || (req.body.points <= 0)){
            res.status(400).jsonp('Points need to be an integer > 0');
            return 2;
        }
        validationResult(req).throw();
        const words = req.body.user.split('.');
        const userId = words[1];
        const userQr = words[0];

        let trData = {
            user: userId,
            value: req.body.points,
            seller: null,
            discount: null,
            date: new Date(),
            company: req.decoded.id,
            nb_used: 1,
            money_saved: 0,
        };

        /* Verify the key of the user */
        db.query("SELECT * FROM user WHERE id = ? and qr_key = ?", [userId, userQr], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else if (rows[0]){
                /* Creating the transaction */
                db.query("INSERT INTO transaction SET ?", trData, (err, rows, results) => {
                    if (err) {
                        res.status(410).jsonp(err);
                        next(err);
                    } else {
                        /* Verify if the account already exists for the user in that company */
                        db.query("SELECT points FROM balance WHERE company = ? AND user = ?", [req.decoded.id, userId], (err, rows2, results2) => {
                            if(err){
                                res.status(410).jsonp(err);
                                next(err);
                            } else {
                                /* if it exists : adding the points, else creating the account and adding the amount of points */
                                if(rows2[0]){
                                    let blcData = {
                                        points: (req.body.points + rows2[0].points)
                                    };
                                    db.query("UPDATE balance SET ? WHERE company = ? AND user = ?", [blcData, req.decoded.id, userId], (err, rows3, results3) => {
                                        if(err){
                                            res.status(410).jsonp(err);
                                            next(err);
                                        } else {
                                            res.status(200).jsonp({transaction: rows.insertId});
                                        }
                                    });
                                } else {
                                    let blcData = {
                                        user: userId,
                                        company: req.decoded.id,
                                        points: req.body.points
                                    };
                                    db.query("INSERT INTO balance SET ?", blcData, (err, rows3, results3) => {
                                        if(err){
                                            res.status(410).jsonp(err);
                                            next(err);
                                        } else {
                                            res.status(200).jsonp({transaction: rows.insertId});
                                        }
                                    });
                                }
                            }
                        });
                    }
                });
            } else {
                res.status(403).jsonp('User key does not exist');
                return 2;
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;