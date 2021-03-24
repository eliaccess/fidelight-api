const express = require('express');
const router = express.Router();
const db = require('../modules/dbConnect');
const midWare = require('../modules/middleware');
const { check, validationResult } = require('express-validator');

/* Discount Search */
router.get('/api/search/discount/c/t/:city', (req, res, next) => {
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


/* Company Search */
router.get('/api/search/company/c/t/:city', (req, res, next) => {
    try {
        db.query("SELECT company.id, company.name, company.description, company.logo_link, company_location.street_number, company_location.street_name FROM company INNER JOIN company_location ON company_location.companyId = company.id WHERE company_location.city = ? ", [req.params.city], (err, rows, results) => {
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
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/api/search/company/c/:city', (req, res, next) => {
    try {
        db.query("SELECT company.id, company.name, company.description, company.logo_link, company_location.street_number, company_location.street_name FROM company INNER JOIN company_location ON company_location.companyId = company.id WHERE company_location.city = ? ", [req.params.city], (err, rows, results) => {
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
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/api/search/company/c/t/:city', (req, res, next) => {
    try {
        db.query("SELECT company.id, company.name, company.description, company.logo_link, company_location.street_number, company_location.street_name FROM company INNER JOIN company_location ON company_location.companyId = company.id WHERE company_location.city = ? ", [req.params.city], (err, rows, results) => {
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
    } catch (err) {
        res.status(400).json(err);
    }
});


router.get('/api/search/company/t/:type', (req, res, next) => {
    try {
        db.query("SELECT id FROM company_type WHERE name = ?", [req.params.type], (cErr, cRows, cResults) => {
            if (cErr) {
                res.status(410).jsonp(cErr);
                next(cErr);
            } else {
                db.query("SELECT company.id, company.name, company.description, company.logo_link, company_location.street_number, company_location.street_name FROM company INNER JOIN company_location ON company_location.companyId = company.id WHERE company.company_typeId = ?", [cRows[0].id], (err, rows, results) => {
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
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;