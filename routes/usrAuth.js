const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../modules/dbConnect');
const config = require('../modules/secret');
const midWare = require('../modules/middleware');
const { check, validationResult } = require('express-validator');


let regValidate = [
    check('email', 'Username Must Be an Email Address').isEmail(),
    check('surname').exists(),
    check('password').exists(),
    check('birthdate').exists()
];

function qrGen(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }


router.post("/api/user/register", regValidate, (req, res, next) => {
    try {
        validationResult(req).throw();
        const BCRYPT_SALT_ROUNDS = 12;
        const qrCode = qrGen(10);
        let regData = {
            surname: req.body.surname,
            name: req.body.name,
            phone: req.body.phone,
            hash_pwd: bcrypt.hashSync(req.body.password, BCRYPT_SALT_ROUNDS),
            salt: BCRYPT_SALT_ROUNDS,
            email: req.body.email,
            phone: req.body.phone,
            birthdate: req.body.birthdate,
            registration_date: new Date(),
            qr_key: qrCode,
            verified: '0',
            active: '1'
        };

        //Verifying that the user doesn't exist in table then inserting the data
        db.query("SELECT * FROM user WHERE email IS NOT NULL AND BINARY email = ? OR phone IS NOT NULL AND BINARY phone = ?", [regData.email, regData.phone], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if (rows[0]) {
                    res.status(410).jsonp("Your email address or phone number is already registered !");
                } else {
                    db.query("INSERT INTO user SET ?", [regData], (iErr, result) => {
                        if (err) {
                            res.status(410).jsonp(err);
                            next(err);
                        } else {
                            //Adding the user to default user type
                            db.query("SELECT * FROM user_type WHERE BINARY name = 'Default'", (err, rows2, results2) => {
                                if (err) {
                                    res.status(410).jsonp(err);
                                    next(err);
                                } else {
                                    let regData2 = {
                                        user: result.insertId,
                                        user_type: rows2[0].id
                                    };
                                    db.query("INSERT INTO user_category SET ?", [regData2], (iErr, result2) => {
                                        if (err) {
                                            res.status(410).jsonp(err);
                                            next(err);
                                        }
                                        else{
                                            const token = jwt.sign({ id: result.insertId, sName: req.body.surname, name:  req.body.name, type: 'user'}, config.secret);
                                            res.status(200).jsonp({id: result.insertId, qr_key: qrCode, token: token});
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


let tokenAuth = [
    check('token').exists(),
    check('email', 'Username Must Be an Email Address').isEmail(),
    check('surname').exists(),
    check('name').exists(),
    check('birthdate').exists()
];

router.get('/api/user/register/gauth', tokenAuth, (req, res, next) => {
    try {
        validationResult(req).throw();
        let regData = {
            surname: req.body.surname,
            name: req.body.name,
            email: req.body.email,
            birthdate: req.body.birthdate,
            registration_date: new Date(),
            google_token: req.body.token,
            verified: '0',
            active: '0'
        };

        db.query("SELECT * FROM user WHERE BINARY google_token = ?", [req.body.token], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if (rows[0]) {
                    res.status(410).jsonp("Your are already registered!");
                } else {
                    
                    db.query("INSERT INTO user SET ?", [regData], (iErr, result) => {
                        if (err) {
                            res.status(410).jsonp(err);
                            next(err);
                        } else {

                            res.status(200).jsonp("Register successfully!");
                        }
                    });
                }
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/api/user/register/fauth', tokenAuth, (req, res, next) => {
    try {
        validationResult(req).throw();
        let regData = {
            surname: req.body.surname,
            name: req.body.name,
            email: req.body.email,
            birthdate: req.body.birthdate,
            registration_date: new Date(),
            facebook_token: req.body.token,
            verified: '0',
            active: '0'
        };

        db.query("SELECT * FROM user WHERE BINARY facebook_token = ?", [req.body.token], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if (rows[0]) {
                    res.status(410).jsonp("Your are already registered!");
                } else {
                    
                    db.query("INSERT INTO user SET ?", [regData], (iErr, result) => {
                        if (err) {
                            res.status(410).jsonp(err);
                            next(err);
                        } else {

                            res.status(200).jsonp("Register successfully!");
                        }
                    });
                }
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
            birthdate: "",
            qr_key: "",
            verified: '0',
            active: '0'
        };

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

let logAuth = [
    check('email', 'Username Must Be an Email Address').isEmail(),
    check('password').exists()
];

router.post('/api/user/login', logAuth, (req, res, next) => {
    try {
        validationResult(req).throw();
        db.query("SELECT * FROM user WHERE BINARY email = ?", [req.body.email], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if (rows[0]) {
                    hashed_pwd = Buffer.from(rows[0].hash_pwd, 'base64').toString('utf-8');
                    if (bcrypt.compareSync(req.body.password, hashed_pwd)) {
                        const token = jwt.sign({ id: rows[0].id, sName: rows[0].surname, name: rows[0].name, type: 'user'}, config.secret);
                        res.status(200).jsonp({token: token });
                    } else {
                        res.status(410).jsonp("Authentication failed!");
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
                                const token = jwt.sign({ id: rows[0].id, sName: rows[0].surname, name: rows[0].name }, config.secret);
                                res.status(200).jsonp({token: token });
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