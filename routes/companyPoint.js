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


router.get('/api/points/type', (req, res, next) => {
    try {
        db.query("SELECT * points_earning_type", (err, rows, result) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                res.status(200).jsonp({types: rows});
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});



router.post('/api/company/points/use/:usrId', cpyPoint, (req, res, next) => {
    try {
        
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;