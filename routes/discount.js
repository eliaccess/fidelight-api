const express = require('express');
const router = express.Router();
const db = require('../modules/dbConnect');
const midWare = require('../modules/middleware');
const { check, validationResult } = require('express-validator');


router.get('/api/discount/type', midWare.checkToken,(req, res, next) => {
    try {
        validationResult(req).throw();
        db.query("SELECT * FROM discount_type", (err, rows, result) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if (rows[0]) {
                    res.status(200).jsonp(rows);
                } else {
                    res.status(410).jsonp("Discount type not found!");
                }
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


let disValidate = [
    check('discount_type').exists(),
    check('cost').exists(),
    check('name').exists(),
    check('description').exists(),
    check('product').exists(),
    check('per_day').exists(),
    check('value').exists(),
    midWare.checkToken
];

/* TODO: add the user type support */
router.post('/api/discount', disValidate, (req, res, next) => {
    try {
        validationResult(req).throw();
        if(req.decoded.type != 'company'){
            res.status(403).jsonp('Access forbidden');
            return 2;
        }

        const perDay = req.body.per_day;
        const dstInfo = {
            company: req.decoded.id,
            discount_type: req.body.discount_type,
            times_used: 0,
            cost: req.body.cost,
            name: req.body.name,
            description: req.body.description,
            picture_link: "",
            product: req.body.product,
            nb_max: req.body.nb_max,
            creation_date: new Date(),
            start_date: (req.body.start_date) ? req.body.start_date : new Date,
            expiration_date: req.body.expiration_date,
            //per_day: (Array.isArray(perDay)) ? 1 : 0,
            per_day: 1,
            active: 1
        }

        db.query("INSERT INTO discount SET ?", [dstInfo], (err, result) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                const dstRpt = {
                    discount: result.insertId,
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
                        const dValue = {
                            user_type: 1,
                            discount: result.insertId,
                            value: req.body.value
                        }
                        db.query("INSERT INTO discount_value SET ?", [dValue], (vErr, vResult) => {
                            if (vErr) {
                                res.status(410).jsonp(vErr);
                                next(vErr);
                            } else {
                                res.status(200).jsonp({transaction: result.insertId});
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

/* This version is made to work with user types with a code like :
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
*/


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

router.put('/api/discount/:discountId', upDisValidate, (req, res, next) => {
    try {
        validationResult(req).throw();
        if(req.decoded.type != 'company'){
            res.status(403).jsonp('Access forbidden');
            return 2;
        }

        db.query("SELECT * FROM discount WHERE company = ? AND id = ? AND active = 1", [req.decoded.id, req.params.discountId], (err, results) => {
            if(err){
                res.status(410).jsonp(err);
                next(err);
            } else {
                if(!results[0]){
                    res.status(403).jsonp("Impossible to edit this discount : it doesn't exist, or you are not its owner.");
                    return 2;
                } else if (req.body.nb_max != 0 && results[0].nb_used >= req.body.nb_max) {
                    res.status(403).jsonp("Cannot change the max usage number of the discount : it was used more or equally that amount of time.");
                    return 2;
                } else {
                    const perDay = req.body.per_day;
                    const dstInfo = {
                        discount_type: req.body.discount_type,
                        cost: req.body.cost,
                        name: req.body.name,
                        description: req.body.description,
                        picture_link: "",
                        product: req.body.product,
                        nb_max: req.body.nb_max,
                        creation_date: new Date(),
                        start_date: (req.body.start_date) ? req.body.start_date : new Date,
                        expiration_date: req.body.expiration_date,
                        //per_day: (Array.isArray(perDay)) ? 1 : 0,
                        per_day: 1
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

                            db.query("UPDATE discount_repetition SET ? WHERE discount = ?", [dstRpt, req.params.discountId], (rErr, rResult) => {
                                if (rErr) {
                                    res.status(410).jsonp(rErr);
                                    next(rErr);
                                } else {
                                    const dValue = {
                                        user_type: 1,
                                        value: req.body.value
                                    }
                                    db.query("UPDATE discount_value SET ? WHERE discount = ?", [dValue, req.params.discountId], (vErr, vResult) => {
                                        if (vErr) {
                                            res.status(410).jsonp(vErr);
                                            next(vErr);
                                        } else {
                                            res.status(200).jsonp("Discount updated successfully!");
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

/* Gets all the discounts
router.get('/api/discount', midWare.checkToken, (req, res, next) => {
    try {
        db.query("SELECT * FROM discount INNER JOIN discount_repetition ON discount_repetition.discount = discount.id INNER JOIN discount_value ON discount_value.discount = discount.id", (err, rows, result) => {
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
});*/

router.get('/api/discount/company/:companyId', midWare.checkToken, (req, res, next) => {
    try {
        const date_day = new Date();
        db.query("SELECT * FROM discount INNER JOIN discount_repetition ON discount_repetition.discount = discount.id INNER JOIN discount_value ON discount_value.discount = discount.id WHERE (discount.company = ?) AND (discount.expiration_date IS NULL OR discount.expiration_date > ?) AND (discount.start_date <= ?) AND (discount.nb_max IS NULL OR discount.nb_max > discount.times_used) AND (discount.active = 1)", [req.params.companyId, date_day, date_day], (err, rows, result) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if (rows[0]){
                    res.status(200).jsonp({discounts: rows});
                } else {
                    res.status(404).jsonp("No discount available for that company.");
                }
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

/* If not always per_day or several values (user_types), then this part need to be changed */
router.get('/api/discount/:discountId', midWare.checkToken, (req, res, next) => {
    try {
        db.query("SELECT discount.company AS company, discount.discount_type AS discount_type, discount.times_used AS times_used, discount.cost AS cost, discount.name AS name, discount.description AS description, discount.picture_link AS picture_link, discount.product AS product, discount.nb_max AS nb_max, discount.creation_date AS creation_date, discount.start_date AS start_date, discount.expiration_date AS expiration_date, discount_repetition.monday AS monday, discount_repetition.tuesday AS tuesday, discount_repetition.wednesday AS wednesday, discount_repetition.thursday AS thursday, discount_repetition.friday AS friday, discount_repetition.saturday AS saturday, discount_repetition.sunday AS sunday, discount_value.value AS value FROM discount INNER JOIN discount_repetition ON discount_repetition.discount = discount.id INNER JOIN discount_value ON discount_value.discount = discount.id WHERE discount.id = ? AND discount.active = 1", [req.params.discountId], (err, rows, result) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if (rows[0]){
                    res.status(200).jsonp({id: req.params.discountId, company: rows[0].company, discount_type: rows[0].discount_type, times_used: rows[0].times_used, cost: rows[0].cost, name: rows[0].name, description: rows[0].description, picture_link: rows[0].picture_link, product: rows[0].product, nb_max: rows[0].nb_max, creation_date: rows[0].creation_date, start_date: rows[0].start_date, expiration_date: rows[0].expiration_date, per_day: {monday: rows[0].monday, tuesday: rows[0].tuesday, wednesday: rows[0].wednesday, thursday: rows[0].thursday, friday: rows[0].friday, saturday: rows[0].saturday, sunday: rows[0].sunday}, value: rows[0].value});
                } else {
                    res.status(404).jsonp("Discount not found.");
                }
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


router.delete('/api/discount/:discountId', midWare.checkToken, (req, res, next) => {
    try {
        validationResult(req).throw();
        if(req.decoded.type != 'company'){
            res.status(403).jsonp('Access forbidden');
            return 2;
        }

        db.query("SELECT * FROM discount WHERE company = ? AND id = ? AND active = 1", [req.decoded.id, req.params.discountId], (err, results) => {
            if(err){
                res.status(410).jsonp(err);
                next(err);
            } else {
                if(!results[0]){
                    res.status(404).jsonp("Impossible to delete this discount : it doesn't exist, was already deleted, or you are not its owner.");
                    return 2;
                } else if (req.body.nb_max != 0 && results[0].nb_used >= req.body.nb_max) {
                    res.status(403).jsonp("Cannot change the max usage number of the discount : it was used more or equally that amount of time.");
                    return 2;
                } else {
                    db.query("DELETE FROM discount_repetition WHERE discount = ?", [req.params.discountId], (err, result) => {
                        if (err) {
                            res.status(410).jsonp(err);
                            next(err);
                        } else {
                            db.query("DELETE FROM discount_value WHERE discount = ?", [req.params.discountId], (err, result) => {
                                if (err) {
                                    res.status(410).jsonp(err);
                                    next(err);
                                } else {
                                    const dstInfo = {
                                        description: "",
                                        picture_link: "",
                                        expiration_date: new Date(),
                                        per_day: 0,
                                        active: 0
                                    }
                                    db.query("UPDATE discount SET ? WHERE id = ?", [dstInfo, req.params.discountId], (err, result) => {
                                        if (err) {
                                            res.status(410).jsonp(err);
                                            next(err);
                                            return 2;
                                        } else {
                                            res.status(200).jsonp("Discount deleted successfully!");
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


let useDis = [
    check('user').exists(),
    check('discount').exists(),
    midWare.checkToken
];

/* Add nb used +1 left */
router.post('/api/discount/use/', useDis, (req, res, next) => {
    try {
        /* steps :
        - verifying that the discount exists, and is active
        - verify the amount of points the user has and compare it to the discount's cost
        - edit the balance of the user
        - create a transaction
        - increase the used amount */

        if(req.decoded.type != 'company'){
            res.status(403).jsonp('Access forbidden');
            return 2;
        }

        validationResult(req).throw();

        const date_today = new Date();
        const words = req.body.user.split('.');
        const userId = words[1];
        const userQr = words[0];

        db.query("SELECT * FROM user WHERE id = ? and qr_key = ?", [userId, userQr], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else if (rows[0]){
                /* Getting the cost and value of the discount */
                db.query("SELECT discount.cost, discount_value.value FROM discount INNER JOIN discount_value ON discount_value.discount = discount.id WHERE (discount.id = ?) AND (discount.expiration_date IS NULL OR discount.expiration_date > ?) AND (discount.start_date <= ?) AND (discount.nb_max IS NULL OR discount.nb_max > discount.times_used) AND (discount.active = 1)", [req.body.discount, date_today, date_today], (err, rows2, results2) => {
                    if (err) {
                        res.status(410).jsonp(err);
                        next(err);
                    } else if (rows2[0]){
                        /* Verifying if the user has a wallet in that company, if not then creating it */
                        db.query("SELECT points FROM balance WHERE company = ? AND user = ?", [req.decoded.id, userId], (err, rows3, results3) => {
                            if(err){
                                res.status(410).jsonp(err);
                                next(err);
                            } else {
                                /* if it exists : checking the points amount */
                                if(rows3[0]){
                                    if(rows3[0].points - rows2[0].cost >= 0){
                                        let blcData = {
                                            points: (rows3[0].points - rows2[0].cost)
                                        };
                                        db.query("UPDATE balance SET ? WHERE company = ? AND user = ?", [blcData, req.decoded.id, userId], (err, rows4, results4) => {
                                            if(err){
                                                res.status(410).jsonp(err);
                                                next(err);
                                            } else {
                                                /* Creating the transaction */
                                                let trData = {
                                                    user: userId,
                                                    value: rows2[0].cost,
                                                    seller: null,
                                                    discount: req.body.discount,
                                                    date: new Date(),
                                                    company: req.decoded.id,
                                                    nb_used: 1,
                                                    money_saved: 0,
                                                };

                                                db.query("INSERT INTO transaction SET ?", trData, (err, rows, results) => {
                                                    if (err) {
                                                        res.status(410).jsonp(err);
                                                        next(err);
                                                    } else {
                                                        db.query("UPDATE discount SET times_used = times_used + 1 WHERE id = ?", [req.body.discount], (err, rows2, results) => {
                                                            if (err) {
                                                                res.status(410).jsonp(err);
                                                                next(err);
                                                            } else {
                                                                
                                                                res.status(200).jsonp({transaction: rows.insertId});
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    } else {
                                        res.status(409).jsonp("Not enough points on the virtual card to do this action.");
                                    }
                                } else {
                                    /* Creating the wallet, and if the discount is free then the user can use the offer (0 points on the balance by default) */
                                    let blcData = {
                                        user: userId,
                                        company: req.decoded.id,
                                        points: 0
                                    };
                                    db.query("INSERT INTO balance SET ?", blcData, (err, rows3, results3) => {
                                        if(err){
                                            res.status(410).jsonp(err);
                                            next(err);
                                        } else {
                                            if(rows2[0].cost == 0){ 
                                                /* Creating the transaction */
                                                let trData = {
                                                    user: userId,
                                                    value: rows2[0].cost,
                                                    seller: null,
                                                    discount: req.body.discount,
                                                    date: new Date(),
                                                    company: req.decoded.id,
                                                    nb_used: 1,
                                                    money_saved: 0,
                                                };

                                                db.query("INSERT INTO transaction SET ?", trData, (err, rows, results) => {
                                                    if (err) {
                                                        res.status(410).jsonp(err);
                                                        next(err);
                                                    } else {
                                                        db.query("UPDATE discount SET times_used = times_used + 1 WHERE id = ?", [req.body.discount], (err, rows2, results) => {
                                                            if (err) {
                                                                res.status(410).jsonp(err);
                                                                next(err);
                                                            } else {
                                                                
                                                                res.status(200).jsonp({transaction: rows.insertId});
                                                            }
                                                        });
                                                    }
                                                });
                                            } else {
                                                res.status(409).jsonp("Not enough points on the virtual card to do this action.");
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    } else {
                        console.log(rows2[0]);
                        res.status(403).jsonp('Discount does not exist, expired or max amount was reached.');
                        return 2;
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