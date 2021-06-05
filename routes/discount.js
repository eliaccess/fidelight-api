const express = require('express');
const router = express.Router();
const db = require('../modules/dbConnect');
const midWare = require('../modules/middleware');
const { check, validationResult } = require('express-validator');
const con = require('../modules/dbConnect');


router.get('/v1/discount/type', midWare.checkToken,(req, res, next) => {
    try {
        validationResult(req).throw();
        db.query("SELECT * FROM discount_type", (err, rows, result) => {
            if (err) {
                res.status(410).jsonp({msg:err});
                next(err);
            } else {
                if (rows[0]) {
                    res.status(200).jsonp({data:rows, msg:"success"});
                } else {
                    res.status(410).jsonp({msg:"Discount type not found!"});
                }
            }
        });
    } catch (err) {
        res.status(400).json({msg:err});
    }
});


let disValidate = [
    check('discountType').exists(),
    check('cost').exists(),
    check('name').exists(),
    check('description').exists(),
    check('product').exists(),
    check('perDay').exists(),
    check('value').exists(),
    midWare.checkToken
];

/* TODO: add the user type support */
router.post('/v1/discount', disValidate, (req, res, next) => {
    try {
        validationResult(req).throw();
        if(req.decoded.type != 'company'){
            res.status(403).jsonp({msg:'Access forbidden'});
            return 2;
        } else {
            const perDay = req.body.perDay;
            const dstInfo = {
                company: req.decoded.id,
                discount_type: req.body.discountType,
                times_used: 0,
                cost: req.body.cost,
                name: req.body.name,
                description: req.body.description,
                picture_link: "",
                product: req.body.product,
                nb_max: req.body.nbMax,
                creation_date: new Date(),
                start_date: (req.body.startDate) ? req.body.startDate : new Date,
                expiration_date: req.body.expirationDate,
                //per_day: (Array.isArray(perDay)) ? 1 : 0,
                per_day: 1,
                active: 1
            }

            db.query("INSERT INTO discount SET ?", [dstInfo], (err, result) => {
                if (err) {
                    res.status(410).jsonp({msg:err});
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
                            res.status(410).jsonp({msg:rErr});
                            next(rErr);
                        } else {
                            const dValue = {
                                user_type: 1,
                                discount: result.insertId,
                                value: req.body.value
                            }
                            db.query("INSERT INTO discount_value SET ?", [dValue], (vErr, vResult) => {
                                if (vErr) {
                                    res.status(410).jsonp({msg:vErr});
                                    next(vErr);
                                } else {
                                    res.status(200).jsonp({data:{discount: result.insertId}, msg:"Discount successfully created!"});
                                }
                            });
                        }
                    });
                }
            });
        }
    } catch (err) {
        res.status(400).json({msg:err});
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
    check('discountType').exists(),
    check('cost').exists(),
    check('name').exists(),
    check('description').exists(),
    check('product').exists(),
    check('perDay').exists(),
    check('value').exists(),
    midWare.checkToken
];

router.put('/v1/discount/:discountId', upDisValidate, (req, res, next) => {
    try {
        validationResult(req).throw();
        if(req.decoded.type != 'company'){
            res.status(403).jsonp({msg:'Access forbidden'});
            return 2;
        }

        db.query("SELECT * FROM discount WHERE company = ? AND id = ? AND active = 1", [req.decoded.id, req.params.discountId], (err, results) => {
            if(err){
                res.status(410).jsonp({msg:err});
                next(err);
            } else {
                if(!results[0]){
                    res.status(403).jsonp({msg:"Impossible to edit this discount : it doesn't exist, or you are not its owner."});
                    return 2;
                } else if (req.body.nbMax != 0 && results[0].nb_used >= req.body.nbMax) {
                    res.status(403).jsonp({msg:"Cannot change the max usage number of the discount : it was used more or equally that amount of time."});
                    return 2;
                } else {
                    const perDay = req.body.perDay;
                    const dstInfo = {
                        discount_type: req.body.discountType,
                        cost: req.body.cost,
                        name: req.body.name,
                        description: req.body.description,
                        picture_link: "",
                        product: req.body.product,
                        nb_max: req.body.nbMax,
                        creation_date: new Date(),
                        start_date: (req.body.startDate) ? req.body.startDate : new Date,
                        expiration_date: req.body.expirationDate,
                        //per_day: (Array.isArray(perDay)) ? 1 : 0,
                        per_day: 1
                    }

                    db.query("UPDATE discount SET ? WHERE id = ?", [dstInfo, req.params.discountId], (err, result) => {
                        if (err) {
                            res.status(410).jsonp({msg:err});
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
                                    res.status(410).jsonp({msg:rErr});
                                    next(rErr);
                                } else {
                                    const dValue = {
                                        user_type: 1,
                                        value: req.body.value
                                    }
                                    db.query("UPDATE discount_value SET ? WHERE discount = ?", [dValue, req.params.discountId], (vErr, vResult) => {
                                        if (vErr) {
                                            res.status(410).jsonp({msg:vErr});
                                            next(vErr);
                                        } else {
                                            res.status(200).jsonp({msg:"Discount successfully updated!"});
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
        res.status(400).json({msg:err});
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

router.get('/v1/discount/company/:companyId', midWare.checkToken, (req, res, next) => {
    try {
        const date_day = new Date();
        db.query("SELECT discount.company AS company, discount.discount_type AS discountType, discount.times_used AS timesUsed, discount.cost AS cost, discount.name AS name, discount.description AS description, discount.picture_link AS pictureLink, discount.product AS product, discount.nb_max AS nbMax, discount.creation_date AS creationDate, discount.start_date AS startDate, discount.expiration_date AS expirationDate, discount_repetition.monday AS monday, discount_repetition.tuesday AS tuesday, discount_repetition.wednesday AS wednesday, discount_repetition.thursday AS thursday, discount_repetition.friday AS friday, discount_repetition.saturday AS saturday, discount_repetition.sunday AS sunday, discount_value.value AS value FROM discount INNER JOIN discount_repetition ON discount_repetition.discount = discount.id INNER JOIN discount_value ON discount_value.discount = discount.id WHERE (discount.company = ?) AND (discount.expiration_date IS NULL OR discount.expiration_date > ?) AND (discount.start_date <= ?) AND (discount.nb_max IS NULL OR discount.nb_max > discount.times_used) AND (discount.active = 1)", [req.params.companyId, date_day, date_day], (err, rows, result) => {
            if (err) {
                res.status(410).jsonp({msg:err});
                next(err);
            } else {
                if (rows[0]){
                    res.status(200).jsonp({data:{discounts: rows}, msg: "success"});
                } else {
                    res.status(404).jsonp({msg:"No discount available for that company."});
                }
            }
        });
    } catch (err) {
        res.status(400).json({msg:err});
    }
});

/* If not always per_day or several values (user_types), then this part need to be changed */
router.get('/v1/discount/:discountId', midWare.checkToken, (req, res, next) => {
    try {
        db.query("SELECT discount.company AS company, discount.discount_type AS discountType, discount.times_used AS timesUsed, discount.cost AS cost, discount.name AS name, discount.description AS description, discount.picture_link AS pictureLink, discount.product AS product, discount.nb_max AS nbMax, discount.creation_date AS creationDate, discount.start_date AS startDate, discount.expiration_date AS expirationDate, discount_repetition.monday AS monday, discount_repetition.tuesday AS tuesday, discount_repetition.wednesday AS wednesday, discount_repetition.thursday AS thursday, discount_repetition.friday AS friday, discount_repetition.saturday AS saturday, discount_repetition.sunday AS sunday, discount_value.value AS value FROM discount INNER JOIN discount_repetition ON discount_repetition.discount = discount.id INNER JOIN discount_value ON discount_value.discount = discount.id WHERE discount.id = ? AND discount.active = 1", [req.params.discountId], (err, rows, result) => {
            if (err) {
                res.status(410).jsonp({msg:err});
                next(err);
            } else {
                if (rows[0]){
                    res.status(200).jsonp({data:{id: req.params.discountId, company: rows[0].company, discountType: rows[0].discountType, timesUsed: rows[0].timesUsed, cost: rows[0].cost, name: rows[0].name, description: rows[0].description, pictureLink: rows[0].pictureLink, product: rows[0].product, nbMax: rows[0].nbMax, creationDate: rows[0].creationDate, startDate: rows[0].startDate, expirationDate: rows[0].expirationDate, perDay: {monday: rows[0].monday, tuesday: rows[0].tuesday, wednesday: rows[0].wednesday, thursday: rows[0].thursday, friday: rows[0].friday, saturday: rows[0].saturday, sunday: rows[0].sunday}, value: rows[0].value}, msg:"success"});
                } else {
                    res.status(404).jsonp({msg:"Discount not found."});
                }
            }
        });
    } catch (err) {
        res.status(400).json({msg:err});
    }
});


router.delete('/v1/discount/:discountId', midWare.checkToken, (req, res, next) => {
    try {
        validationResult(req).throw();
        if(req.decoded.type != 'company'){
            res.status(403).jsonp({msg:'Access forbidden'});
            return 2;
        }

        db.query("SELECT * FROM discount WHERE company = ? AND id = ? AND active = 1", [req.decoded.id, req.params.discountId], (err, results) => {
            if(err){
                res.status(410).jsonp({msg:err});
                next(err);
            } else {
                if(!results[0]){
                    res.status(404).jsonp({msg:"Impossible to delete this discount : it doesn't exist, was already deleted, or you are not its owner."});
                    return 2;
                } else {
                    db.query("DELETE FROM discount_repetition WHERE discount = ?", [req.params.discountId], (err, result) => {
                        if (err) {
                            res.status(410).jsonp({msg:err});
                            next(err);
                        } else {
                            db.query("DELETE FROM discount_value WHERE discount = ?", [req.params.discountId], (err, result) => {
                                if (err) {
                                    res.status(410).jsonp({msg:err});
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
                                            res.status(410).jsonp({msg:err});
                                            next(err);
                                            return 2;
                                        } else {
                                            res.status(200).jsonp({msg:"Discount deleted successfully!"});
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
        res.status(400).json({msg:err});
    }
});


let useDis = [
    check('user').exists(),
    check('discount').exists(),
    midWare.checkToken
];


router.post('/v1/discount/use/', useDis, (req, res, next) => {
    try {
        /* steps :
        - verifying that the discount exists, and is active
        - verify the per_day and the actual day to see if it is active today
        - verify the amount of points the user has and compare it to the discount's cost
        - edit the balance of the user
        - create a transaction
        - increase the used amount */
        validationResult(req).throw();
        if(req.decoded.type != 'company'){
            res.status(403).jsonp({msg:'Access forbidden'});
            return 2;
        } else {
            const date_today = new Date();
            const words = req.body.user.split('.');
            const userId = words[1];
            const userQr = words[0];

            db.query("SELECT * FROM user WHERE id = ? and qr_key = ?", [userId, userQr], (err, rows, results) => {
                if (err) {
                    res.status(410).jsonp({msg:err});
                    next(err);
                } else if (rows[0]){
                    /* Getting the cost and value of the discount */
                    db.query("SELECT discount.cost AS cost, discount.per_day AS per_day, discount_value.value AS value, discount_repetition.monday AS monday, discount_repetition.tuesday AS tuesday, discount_repetition.wednesday AS wednesday, discount_repetition.thursday AS thursday, discount_repetition.friday AS friday, discount_repetition.saturday AS saturday, discount_repetition.sunday AS sunday FROM discount INNER JOIN discount_value ON discount_value.discount = discount.id LEFT JOIN discount_repetition ON discount_repetition.discount = discount.id WHERE (discount.id = ?) AND (discount.expiration_date IS NULL OR discount.expiration_date > ?) AND (discount.start_date <= ?) AND (discount.nb_max IS NULL OR discount.nb_max > discount.times_used) AND (discount.active = 1)", [req.body.discount, date_today, date_today], (err, rows2, results2) => {
                        if (err) {
                            res.status(410).jsonp({msg:err});
                            next(err);
                        } else if (rows2[0]){
                            /* Verifying if the discount is available today if per_day is active */
                            if(rows2[0].per_day){
                                var week = {0: rows2[0].sunday, 1: rows2[0].monday, 2: rows2[0].tuesday, 3: rows2[0].wednesday, 4: rows2[0].thursday, 5: rows2[0].friday, 6: rows2[0].saturday};
                                if(week[date_today.getDay()]){
                                    /* Verifying if the user has a wallet in that company, if not then creating it */
                                    db.query("SELECT points FROM balance WHERE company = ? AND user = ?", [req.decoded.id, userId], (err, rows3, results3) => {
                                        if(err){
                                            res.status(410).jsonp({msg:err});
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
                                                            res.status(410).jsonp({msg:err});
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
                                                                    res.status(410).jsonp({msg:err});
                                                                    next(err);
                                                                } else {
                                                                    db.query("UPDATE discount SET times_used = times_used + 1 WHERE id = ?", [req.body.discount], (err, rows2, results) => {
                                                                        if (err) {
                                                                            res.status(410).jsonp({msg:err});
                                                                            next(err);
                                                                        } else {
                                                                            
                                                                            res.status(200).jsonp({data:{transaction: rows.insertId}, msg:"Transaction successfully done."});
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
                                                        res.status(410).jsonp({msg:err});
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
                                                                    res.status(410).jsonp({msg:err});
                                                                    next(err);
                                                                } else {
                                                                    db.query("UPDATE discount SET times_used = times_used + 1 WHERE id = ?", [req.body.discount], (err, rows2, results) => {
                                                                        if (err) {
                                                                            res.status(410).jsonp({msg:err});
                                                                            next(err);
                                                                        } else {
                                                                            
                                                                            res.status(200).jsonp({data:{transaction: rows.insertId}, msg:"Transaction successfully done."});
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        } else {
                                                            res.status(409).jsonp({msg:"Not enough points on the virtual card to do this action."});
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    });
                                } else {
                                    res.status(403).jsonp({msg:'This discount is not available today.'});
                                }
                            } else {
                                /* Verifying if the user has a wallet in that company, if not then creating it */
                                db.query("SELECT points FROM balance WHERE company = ? AND user = ?", [req.decoded.id, userId], (err, rows3, results3) => {
                                    if(err){
                                        res.status(410).jsonp({msg:err});
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
                                                        res.status(410).jsonp({msg:err});
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
                                                                res.status(410).jsonp({msg:err});
                                                                next(err);
                                                            } else {
                                                                db.query("UPDATE discount SET times_used = times_used + 1 WHERE id = ?", [req.body.discount], (err, rows2, results) => {
                                                                    if (err) {
                                                                        res.status(410).jsonp({msg:err});
                                                                        next(err);
                                                                    } else {
                                                                        
                                                                        res.status(200).jsonp({data:{transaction: rows.insertId}, msg:"Transaction successfully done."});
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
                                                    res.status(410).jsonp({msg:err});
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
                                                                res.status(410).jsonp({msg:err});
                                                                next(err);
                                                            } else {
                                                                db.query("UPDATE discount SET times_used = times_used + 1 WHERE id = ?", [req.body.discount], (err, rows2, results) => {
                                                                    if (err) {
                                                                        res.status(410).jsonp({msg:err});
                                                                        next(err);
                                                                    } else {
                                                                        
                                                                        res.status(200).jsonp({data:{transaction: rows.insertId}, msg:"Transaction successfully done."});
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    } else {
                                                        res.status(409).jsonp({msg:"Not enough points on the virtual card to do this action."});
                                                    }
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        } else {
                            console.log(rows2[0]);
                            res.status(403).jsonp({msg:'Discount does not exist, expired or max amount was reached.'});
                        }
                    });
                } else {
                    res.status(403).jsonp({msg:'User key does not exist'});
                }
            });
        }
    } catch (err) {
        res.status(400).json({msg:err});
    }
});

function getTopSixFromOffers(data){
    let indexes = [];
    count = 0
    // Getting the 6 top sold discounts
    data.forEach(element => {
        if(indexes.length < 6) indexes.push(element.discount);
        else {
            subcount = 0;
            indexes.forEach(recordedIndex => {
                console.log(data[recordedIndex]);
                if(data[recordedIndex].times_used >= element.times_used);
                else indexes[subcount] = element.discount;
                subcount += 1;
            });
        }
        count += 1;
    });

    // TODO: ORDER THEM

    return indexes;
}

router.get('/v1/discount/hotdeals/:city', midWare.checkToken, (req, res, next) => {
    try {
        /* steps :
        - verifying that the discount exists, and is active
        - verify the per_day and the actual day to see if it is active today
        - verify the amount of points the user has and compare it to the discount's cost
        - edit the balance of the user
        - create a transaction
        - increase the used amount */
        validationResult(req).throw();
        let offers = [];
        today = new Date();

        db.query("SELECT id, times_used FROM discount WHERE company = ANY (SELECT company.id FROM company_location INNER JOIN company ON company_location.company = company.id WHERE company_location.city = ? AND company.active = 1 ORDER BY company.registration_date ASC) AND discount.active = 1 AND (discount.expiration_date IS NULL OR discount.expiration_date > ?) AND (discount.start_date <= ?) ORDER BY times_used ASC LIMIT 6", [req.params.city, today, today], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp({msg:err});
                next(err);
            } else if (rows[0]){
                rows.forEach(element => {
                    offers.push({
                        discount: element.id,
                        times_used: element.times_used
                    });
                });
                topIndexes = getTopSixFromOffers(offers);
                let topDiscounts = [];
                
                topIndexes.forEach(ind => {
                    topDiscounts.push({discount: ind});
                });
                res.status(200).jsonp({data:topDiscounts, msg:"success"});
            } else {
                res.status(404).jsonp({msg:"No discount available in this city"});
            }
        });
    } catch (err) {
        res.status(400).json({msg:err});
    }
});

module.exports = router;