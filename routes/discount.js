const express = require('express');
const router = express.Router();
const db = require('../modules/dbConnect');
const midWare = require('../modules/middleware');
const { check, validationResult } = require('express-validator');

router.get('/api/discount/type', (req, res, next) => {
    try {
        db.query("SELECT * discount_type", (err, rows, result) => {
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




let disValidate = [
    check('company').exists(),
    check('discount_type').exists(),
    check('cost').exists(),
    check('name').exists(),
    check('description').exists(),
    check('product').exists(),
    check('per_day').exists(),
    check('value').exists(),
    midWare.checkToken
];
router.post('/api/company/discount', disValidate, (req, res, next) => {
    try {
        const perDay = req.body.per_day;
        const dstInfo = {
            companyId: req.body.company,
            discount_typeId: req.body.discount_type,
            times_used: 0,
            cost: req.body.cost,
            name: req.body.name,
            description: req.body.description,
            picture_link: "",
            product: req.body.product,
            nb_max: req.body.nb_max,
            creation_date: new Date(),
            start_date: req.body.start_date,
            expiration_date: req.body.expiration_date,
            per_day: (Array.isArray(perDay)) ? 1 : 0,
            active: 1
        }
        db.query("INSERT INTO discount SET ?", [dstInfo], (err, result) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                const dstRpt = {
                    discountId: result.insertId,
                    monday: perDay.monday,
                    tuesday: perDay.tuesday,
                    wednesday: perDay.wednesday,
                    thursday: perDay.thursday,
                    friday: perDay.friday,
                    saturday: perDay.saturday,
                    sunday: perDay.sunday
                };

                db.query("INSERT INTO discount_repetition SET ?", [dstRpt], (rErr, rResult) => {
                    if (rErr) {
                        res.status(410).jsonp(rErr);
                        next(rErr);
                    } else {
                        const dstValue = req.body.value;
                        dstValue.forEach(el => {
                            const dValue = {
                                user_typeId: el.type,
                                discountId: result.insertId,
                                value: el.value
                            };

                            db.query("INSERT INTO discount_value SET ?", [dValue], (vErr, vResult) => {
                                if (vErr) {
                                    res.status(410).jsonp(vErr);
                                    next(vErr);
                                }
                            });
                        });

                        res.status(200).jsonp("Discount added successfully!");
                    }
                });
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


let upDisValidate = [
    check('discount_type').exists(),
    check('cost').exists(),
    check('name').exists(),
    check('description').exists(),
    check('product').exists(),
    check('per_day').exists(),
    check('value').exists(),
    midWare.checkToken
];

router.put('/api/company/discount/:discountId', upDisValidate, (req, res, next) => {
    try {
        const perDay = req.body.per_day;
        const dstInfo = {
            companyId: req.body.company,
            discount_typeId: req.body.discount_type,
            times_used: 0,
            cost: req.body.cost,
            name: req.body.name,
            description: req.body.description,
            picture_link: "",
            product: req.body.product,
            nb_max: req.body.nb_max,
            creation_date: new Date(),
            start_date: req.body.start_date,
            expiration_date: req.body.expiration_date,
            per_day: (Array.isArray(perDay)) ? 1 : 0,
            active: 1
        }
        db.query("UPDATE discount SET ? WHERE id = ?", [dstInfo, req.params.discountId], (err, result) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                const dstRpt = {
                    monday: perDay.monday,
                    tuesday: perDay.tuesday,
                    wednesday: perDay.wednesday,
                    thursday: perDay.thursday,
                    friday: perDay.friday,
                    saturday: perDay.saturday,
                    sunday: perDay.sunday
                };

                db.query("UPDATE discount_repetition SET ? WHERE discountId = ?", [dstRpt, req.params.discountId], (rErr, rResult) => {
                    if (rErr) {
                        res.status(410).jsonp(rErr);
                        next(rErr);
                    } else {
                        const dstValue = req.body.value;
                        dstValue.forEach(el => {
                            const dValue = {
                                user_typeId: el.type,
                                value: el.value
                            };

                            db.query("UPDATE discount_value SET ? WHERE discountId = ?", [dValue, req.params.discountId], (vErr, vResult) => {
                                if (vErr) {
                                    res.status(410).jsonp(vErr);
                                    next(vErr);
                                }
                            });
                        });

                        res.status(200).jsonp("Discount updated successfully!");
                    }
                });
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


router.get('/api/company/discount', midWare.checkToken, (req, res, next) => {
    try {
        db.query("SELECT * FROM discount INNER JOIN discount_repetition ON discount_repetition.discountId = discount.id INNER JOIN discount_value ON discount_value.discountId = discount.id", (err, rows, result) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if (rows[0])
                    res.status(200).jsonp({discounts: rows});
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


router.get('/api/company/discount/:discountId', midWare.checkToken, (req, res, next) => {
    try {
        db.query("SELECT * FROM discount INNER JOIN discount_repetition ON discount_repetition.discountId = discount.id INNER JOIN discount_value ON discount_value.discountId = discount.id WHERE discount.id = ?", [req.params.discountId], (err, rows, result) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if (rows[0])
                    res.status(200).jsonp({discounts: rows});
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


router.delete('/api/company/discount/:discountId', midWare.checkToken, (req, res, next) => {
    try {
        db.query("DELETE FROM discount WHERE id = ?", [req.params.discountId], (err, result) => {
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


router.post('/api/company/discount/use/:userId ', midWare.checkToken, (req, res, next) => {
    try {
        
    } catch (err) {
        res.status(400).json(err);
    }
});


module.exports = router;