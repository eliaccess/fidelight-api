const express = require('express');
//const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../modules/dbConnect');
//const config = require('../modules/secret');
const { check, validationResult } = require('express-validator');
const midWare = require('../modules/middleware');

let passAuth = [
    check('password').exists(),
    check('previous_password').exists()
];

router.put('/api/user/password', passAuth, midWare.checkToken, (req, res, next) => {
    try {
        if(req.decoded.type != 'user'){
            res.status(403).jsonp('Access forbidden');
            return 2;
        }
        validationResult(req).throw();
        const BCRYPT_SALT_ROUNDS = 12;
        let regData = {
            hash_pwd: bcrypt.hashSync(req.body.password, BCRYPT_SALT_ROUNDS),
            salt: BCRYPT_SALT_ROUNDS
        };

        db.query("SELECT * FROM user WHERE id = ?", [req.decoded.id], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if (rows[0]) {
                    hashed_pwd = Buffer.from(rows[0].hash_pwd, 'base64').toString('utf-8');
                    if (bcrypt.compareSync(req.body.previous_password, hashed_pwd)) {
                        db.query("UPDATE user SET ? WHERE id = ?", [regData, req.decoded.id], (iErr, iRows, iResult) => {
                            if (iErr) {
                                res.status(410).jsonp(iErr);
                                next(iErr);
                            } else {
                                //const token = jwt.sign({ id: rows[0].id, sName: rows[0].surname, name: rows[0].name }, config.secret);
                                res.status(200).jsonp({"message": "Successfully changed"});
                            }
                        });
                    } else {
                        res.status(410).jsonp("Wrong old password!");
                    }
                } else {
                    res.status(410).jsonp("Authentication failed!");
                }
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/api/user/profile', midWare.checkToken, (req, res, next) => {
    try {
        if(req.decoded.type != 'user'){
            res.status(403).jsonp('Access forbidden');
            return 2;
        }
        db.query("SELECT * FROM user WHERE id = ?", [req.decoded.id], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if (rows[0]) {
                    res.status(200).jsonp({surname: rows[0].surname, name: rows[0].name, phone: rows[0].phone, email: rows[0].email, birthdate: rows[0].birthdate});
                } else {
                    res.status(404).jsonp("Profile not found!");
                }
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


router.put('/api/user/profile', midWare.checkToken, (req, res, next) => {
    try {
        if(req.decoded.type != 'user'){
            res.status(403).jsonp('Access forbidden');
            return 2;
        }
        let usrData = {
            surname: req.body.surname,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            birthdate: req.body.birthdate
        };
        db.query("UPDATE user SET ? WHERE id = ?", [usrData, req.decoded.id], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                res.status(200).jsonp("Profile updated successfully!");
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete("/api/user/register", midWare.checkToken, (req, res, next) => {
    try {
        let regData = {
            surname: "",
            name: "",
            phone: "",
            hash_pwd: "",
            email: "",
            birthdate: new Date(),
            qr_key: "",
            verified: '0',
            active: '0'
        };

        db.query("DELETE FROM balance WHERE user = ?", [req.decoded.id], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            }
        });

        db.query("DELETE FROM user_like WHERE user = ?", [req.decoded.id], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            }
        });

        db.query("UPDATE user SET ? WHERE id = ?", [regData, req.decoded.id], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                res.status(200).jsonp("Account Deleted Successfully!");
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

let likeAuth = [
    check('company').exists(),
    midWare.checkToken
];

router.post('/api/user/like/', likeAuth, (req, res, next) => {
    try {
        if(req.decoded.type != 'user'){
            res.status(403).jsonp('Access forbidden');
            return 2;
        }
        db.query("SELECT * FROM company WHERE id = ?", [req.body.company], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if (rows[0]) {
                    db.query("SELECT * FROM user_like WHERE user = ?", [req.decoded.id], (err, rows, results) => {
                        if (err) {
                            res.status(410).jsonp(err);
                            next(err);
                        } else {
                            if(rows[0]){
                                var alreadyLiked = 0;
                                if (rows.length < 20){
                                    rows.forEach(element => {
                                        if(element.company == req.body.company) alreadyLiked = 1;
                                    });

                                    if(alreadyLiked == 1) res.status(200).jsonp("You already liked this company!");
                                    else{
                                        let likeData = {
                                            user: req.decoded.id,
                                            company: req.body.company
                                        };
                                        db.query("INSERT INTO user_like SET ?", [likeData], (err, rows, results) => {
                                            if (err) {
                                                res.status(410).jsonp(err);
                                                next(err);
                                            } else {
                                                res.status(200).jsonp("Company successfully added to your likes!");
                                            }
                                        });
                                    }
                                } else {
                                    res.status(409).jsonp("You have reached the max likes amount (20)!");
                                }
                            } else {
                                let likeData = {
                                    user: req.decoded.id,
                                    company: req.body.company
                                };
                                db.query("INSERT INTO user_like SET ?", [likeData], (err, rows, results) => {
                                    if (err) {
                                        res.status(410).jsonp(err);
                                        next(err);
                                    } else {
                                        res.status(200).jsonp("Company successfully added to your likes!");
                                    }
                                });
                            }
                        }
                    });
                } else {
                    res.status(404).jsonp("Company not found!");
                }
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/api/user/like/:companyId', midWare.checkToken, (req, res, next) => {
    try {
        if(req.decoded.type != 'user'){
            res.status(403).jsonp('Access forbidden');
            return 2;
        }
        db.query("SELECT * FROM user_like WHERE user = ? AND company = ?", [req.decoded.id, req.params.companyId], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if(!rows[0]){
                    res.status(200).jsonp("This company is not in your likes!");
                } else {
                    db.query("DELETE FROM user_like WHERE user = ? AND company = ?", [req.decoded.id, req.params.companyId], (err, rows, results) => {
                        if (err) {
                            res.status(410).jsonp(err);
                            next(err);
                        } else {
                            res.status(200).jsonp("Company successfully removed from your likes!");
                        }
                    });
                }
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/api/user/like/', midWare.checkToken, (req, res, next) => {
    try {
        if(req.decoded.type != 'user'){
            res.status(403).jsonp('Access forbidden');
            return 2;
        }
        db.query("SELECT company.id FROM user_like LEFT JOIN company ON user_like.company = company.id WHERE user = ? AND company.active = 1", [req.decoded.id], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                res.status(200).jsonp(rows);
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

/*
let vrAuth = [
    check('qrCode').exists(),
    midWare.checkToken
];
*/

/*
router.post('/api/user/disconnect', midWare.checkToken, (req, res, next) => {
    try {
        res.status(200).jsonp("Token deleted successfully!");
    } catch (err) {
        res.status(400).json(err);
    }
});
*/

/*
let passAuth = [
    check('password').exists(),
    check('email', 'Username Must Be an Email Address').isEmail()
];

router.put('/api/user/password', passAuth, (req, res, next) => {
    try {
        validationResult(req).throw();
        const BCRYPT_SALT_ROUNDS = 12;
        let regData = {
            hash_pwd: bcrypt.hashSync(req.body.password, BCRYPT_SALT_ROUNDS),
        };

        db.query("UPDATE user SET ? WHERE email = ?", [regData, req.body.email], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                db.query("SELECT * FROM user WHERE email = ?", [req.body.email], (iErr, iRows, iResult) => {
                    if (iErr) {
                        res.status(410).jsonp(iErr);
                        next(iErr);
                    } else {
                        const token = jwt.sign({ id: iRows[0].id, sName: iRows[0].surname, name:  iRows[0].name}, config.secret);
                        res.status(200).jsonp({token: token});
                    }
                });
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});*/

/*
router.post('/api/user/verify', vrAuth, (req, res, next) => {
    try {
        validationResult(req).throw();
        db.query("SELECT * FROM user WHERE id = ?", [req.decoded.id], (err, rows, result) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if (rows[0]) {
                    if (rows[0].qr_key == req.body.qrCode) {
                        db.query("UPDATE user SET ? WHERE id = ?", [{ verified: '1' }, req.decoded.id], (err, result) => {
                            if (err) {
                                res.status(410).jsonp(err);
                            } else {
                                res.status(200).jsonp("You are successfully verified!");
                            }
                        });
                    } else {
                        res.status(410).jsonp("Verification failed!");
                    }
                } else {
                    res.status(410).jsonp("Invalid User!");
                }
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});
*/

/*
router.get('/api/user/type', (req, res, next) => {
    try {
        db.query("SELECT * FROM user_type", (err, rows, result) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if (rows[0]) {
                    res.status(200).jsonp(rows);
                } else {
                    res.status(410).jsonp("User type not found!");
                }
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});
*/

module.exports = router;