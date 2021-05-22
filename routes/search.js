const express = require('express');
const router = express.Router();
const db = require('../modules/dbConnect');
const midWare = require('../modules/middleware');
const { check, validationResult } = require('express-validator');

/* Discount Search */
/*
router.get('/api/search/discount/c/t/:city', midWare.checkToken, (req, res, next) => {
    try {
        db.query("SELECT discount.id, discount.name, discount.description, discount.cost, discount.picture_link FROM discount INNER JOIN company_location ON company_location.companyId = discount.companyId WHERE company_location.city = ? AND discount.active = ?", [req.params.city, '1'], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if (rows[0]) {
                    res.status(200).jsonp(rows);
                } else {
                    res.status(404).jsonp("Discount not found!");
                }
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


router.get('/api/search/discount/c/:city', (req, res, next) => {
    try {
        db.query("SELECT discount.id, discount.name, discount.description, discount.cost, discount.picture_link FROM discount INNER JOIN company_location ON company_location.companyId = discount.companyId WHERE company_location.city = ? AND discount.active = ?", [req.params.city, '1'], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if (rows[0]) {
                    res.status(200).jsonp(rows);
                } else {
                    res.status(404).jsonp("Discount not found!");
                }
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


router.get('/api/search/discount/t/:type', (req, res, next) => {
    try {
        db.query("SELECT id FROM company_type WHERE name = ?", [req.params.type], (cErr, cRows, cResults) => {
            if (cErr) {
                res.status(410).jsonp(cErr);
                next(cErr);
            } else {
                db.query("SELECT discount.id, discount.name, discount.description, discount.cost, discount.picture_link FROM discount INNER JOIN company ON company.id = discount.companyId WHERE company.company_typeId = ?", [cRows[0].id], (err, rows, results) => {
                    if (err) {
                        res.status(410).jsonp(err);
                        next(err);
                    } else {
                        if (rows[0]) {
                            res.status(200).jsonp(rows);
                        } else {
                            res.status(404).jsonp("Discount not found!");
                        }
                    }
                });
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


router.get('/api/search/discount/c/h/:city', (req, res, next) => {
    try {
        db.query("SELECT discount.id, discount.name, discount.description, discount.cost, discount.picture_link FROM discount INNER JOIN company_location ON company_location.companyId = discount.companyId WHERE company_location.city = ? AND discount.active = ? ORDER BY DESC discount.times_used", [req.params.city, '1'], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if (rows[0]) {
                    res.status(200).jsonp(rows);
                } else {
                    res.status(404).jsonp("Discount not found!");
                }
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});
*/

/* Company Search */
/* Get all companies from a city */
router.get('/api/search/company/parameters', (req, res, next) => {
    try {
        /* supported parameters :
         * - name : name / part of the name of the company
         * - type : type of the company
         * - city : city where the company is based
         * - page : to get by 10 more restaurants (page 1 is the first 10, page 2 is the next 10 ...)
         */
        
        let parameters = {
            city: req.query.city ? req.query.city : null,
            name: req.query.name ?  '%' + req.query.name + '%' : null,
            type: req.query.type ? req.query.type : null,
            page_p1: req.query.page ? req.query.page * 10 - 10 : 0,
            page_p2: req.query.page ? req.query.page * 10 : 10
        }

        if(parameters.city == null && parameters.name == null && parameters.type == null){
            res.status(400).jsonp("To make a research, please provide at least one parameter.");
        } else {
            db.query("SELECT company.id, company.company_type, company.name, company.logo_link, company.description, company.logo_link, company_location.street_number, company_location.street_name FROM company INNER JOIN company_location ON company_location.company = company.id WHERE (company_location.city = ? OR ? IS NULL) AND company.active = 1 AND company.verified = 1 AND (company.name LIKE ? OR ? IS NULL) AND (company.company_type = ? OR ? IS NULL) ORDER BY company.registration_date ASC LIMIT ?, ?", [parameters.city, parameters.city, parameters.name, parameters.name, parameters.type, parameters.type, parameters.page_p1, parameters.page_p2], (err, rows, results) => {
                if (err) {
                    res.status(410).jsonp(err);
                    next(err);
                } else {
                    if (rows[0]) {
                        res.status(200).jsonp(rows);
                    } else {
                        res.status(404).jsonp("Company not found!");
                    }
                }
            });
        }        
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;