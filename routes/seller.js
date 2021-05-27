const express = require('express');
const router = express.Router();
const db = require('../modules/dbConnect');
const midWare = require('../modules/middleware');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

// THIS FUNCTIONNALITY IS NOT SUPPORTED IN THE V1

let sellerVfy = [
    check('company').exists(),
    check('password').exists(),
    check('login').exists(),
    midWare.checkToken
];

router.post('/api/v1/company/seller', sellerVfy, (req, res, next) => {
    try {
        validationResult(req).throw();
        const BCRYPT_SALT_ROUNDS = 12;
        const seller = {
            companyId: req.body.company,
            login: req.body.login,
            hash_pwd: bcrypt.hashSync(req.body.password, BCRYPT_SALT_ROUNDS),
            salt: BCRYPT_SALT_ROUNDS
        }
        db.query("INSERT INTO seller SET ?", [seller], (err, rows, result) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                res.status(200).jsonp("Seller added successfully!");
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


router.get('/api/v1/company/seller/:companyId', midWare.checkToken, (req, res, next) => {
    try {
        db.query("SELECT * FROM seller WHERE companyId = ?", [req.params.companyId], (err, rows, result) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if (rows[0]) {
                    res.status(200).jsonp({sellers: rows});
                } else {
                    res.status(404).jsonp("Seller not found!");
                }
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


router.delete('/api/v1/company/seller/:sellerId', midWare.checkToken, (req, res, next) => {
    try {
        db.query("DELETE FROM seller WHERE id = ?", [req.params.sellerId], (err, rows, result) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                res.status(200).jsonp("Seller deleted successfully!");
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


router.get('/api/v1/company/statistics/seller', midWare.checkToken, (req, res, next) => {
    try {
        db.query("SELECT * FROM seller WHERE companyId = ?", [req.decoded.id], (err, rows, result) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if(rows[0])
                    res.status(200).jsonp(rows);
                else
                    res.status(404).jsonp("Seller not found!");
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;