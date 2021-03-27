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
        validationResult(req).throw();
        const point = {
            companyId: req.decoded.id,
            points_earning_typeId: req.body.type,
            value: req.body.value
        }
        db.query("INSERT INTO points_earning SET ?", [point], (err, rows, result) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                res.status(200).jsonp("Point added successfully!");
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/api/company/points/:companyId', midWare.checkToken, (req, res, next) => {
    try {
        db.query("SELECT * points_earning WHERE companyId = ?", [req.params.companyId], (err, rows, result) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                res.status(200).jsonp({points: rows});
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

router.put('/api/company/points/:pointEarningId', upCpyPoint, (req, res, next) => {
    try {
        validationResult(req).throw();
        const point = {
            points_earning_typeId: req.body.type,
            value: req.body.value
        }
        db.query("INSERT INTO points_earning SET ?", [point], (err, rows, result) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                res.status(200).jsonp("Point added successfully!");
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


router.delete('/api/company/points/:pointEarningId', midWare.checkToken, (req, res, next) => {
    try {
        validationResult(req).throw();
        db.query("DELETE points_earning WHERE id = ?", [req.params.pointEarningId], (err, rows, result) => {
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