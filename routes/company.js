const express = require('express');
const router = express.Router();
const db = require('../modules/dbConnect');
const midWare = require('../modules/middleware');
const { check, validationResult } = require('express-validator');

router.get('/api/company/type', (req, res, next) => {
    try {
        db.query("SELECT * FROM company_type", (err, rows, result) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if (rows[0]) {
                    res.status(200).jsonp(rows);
                } else {
                    res.status(410).jsonp("Company type not found!");
                }
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


function logGen(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }


 let regValidate = [
    check('email', 'Username Must Be an Email Address').isEmail(),
    check('name').exists(),
    check('password').exists(),
    check('description').exists(),
    check('phone').exists(),
    check('company_type').exists().isNumeric(),
    check('siret').exists(),
    check('street_number').exists(),
    check('street_name').exists(),
    check('city').exists(),
    check('country').exists()
];


router.post('/api/company/register', regValidate, (req, res, next) => {
    try {
        validationResult(req).throw();
        const BCRYPT_SALT_ROUNDS = 12;
        const logGen = logGen(10);
        const regData = {
            login: logGen,
            name: req.body.name,
            hash_pwd: bcrypt.hashSync(req.body.password, BCRYPT_SALT_ROUNDS),
            salt: BCRYPT_SALT_ROUNDS,
            email: req.body.email,
            description: req.body.description,
            phone: req.body.phone,
            registration_date: new Date(),
            background_picture: "",
            logo_link: '',
            paying_method: 0,
            company_type: req.body.company_type
        };
        db.query("SELECT * FROM company WHERE BINARY email = ?", [req.body.email], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if (rows[0]) {
                    res.status(410).jsonp("Your email address already registered... Try different email!");
                } else {
                    db.query("INSERT INTO company SET ?", [regData], (iErr, result) => {
                        if (iErr) {
                            res.status(410).jsonp(iErr);
                            next(iErr);
                        } else {
                            const usrData = {
                                companyId: req.body.result.insertId,
                                phone: req.body.phone,
                                siret: req.body.siret,
                                longitude: "",
                                latitude: '',
                                street_number: req.body.street_number,
                                street_name: req.body.street_name,
                                city: req.body.city,
                                country: req.body.country,
                                billing_address: "0"
                            };
                            db.query("INSERT INTO company_location SET ?", [usrData], (iaErr, logResult) => {
                                if (iaErr) {
                                    res.status(410).jsonp(iaErr);
                                    next(iaErr);
                                } else {
                                    const token = jwt.sign({ id: result.insertId, login: logGen, name: req.body.name }, config.secret);
                                    res.status(200).jsonp({ login: logGen, token: token });
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
    check('email', 'Username Must Be an Email Address').isEmail(),
    check('password').exists()
];

router.get('/api/company/login', tokenAuth, (req, res, next) => {
    try {
        validationResult(req).throw();

        db.query("SELECT * FROM company WHERE BINARY email = ?", [req.body.email], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if (rows[0]) {
                    if (bcrypt.compareSync(req.body.password, rows[0].hash_pwd)) {
                        const token = jwt.sign({ id: rows[0].id, login: rows[0].login, name: rows[0].name }, config.secret);
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


router.get('/api/company/profile/:companyId', midWare.checkToken, (req, res, next) => {
    try {
        db.query("SELECT * FROM company WHERE id = ?", [req.decoded.id], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if (rows[0]) {
                    companyInfo = {
                        name: rows[0].name,
                        phone: rows[0].phone,
                        email: rows[0].email,
                        registration_date: rows[0].registration_date,
                        description: rows[0].description,
                        logo: rows[0].logo_link,
                        background_picture: rows[0].background_picture
                    }
                    res.status(200).jsonp(companyInfo);
                } else {
                    res.status(404).jsonp("Profile not found!");
                }
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


let updateProf = [
    check('email', 'Username Must Be an Email Address').isEmail(),
    check('phone').exists(),
    check('description').exists(),
    check('country').exists(),
    check('city').exists(),
    check('street_name').exists(),
    check('street_number').exists(),
    midWare.checkToken
];

router.put('/api/company/profile/:companyId', updateProf, (req, res, next) => {
    try {
        validationResult(req).throw();
        companyInfo = {
            phone: req.body.phone,
            email: req.body.email,
            description: req.body.description,
        };

        cLocInfo = {
            country: req.body.country,
            city: req.body.city,
            street_name: req.body.street_name,
            street_number: req.body.street_number
        };

        db.query("UPDATE company SET ? WHERE id = ?", [companyInfo, req.params.companyId], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                db.query("UPDATE company_location SET ? WHERE companyId = ?", [cLocInfo, req.params.companyId], (err, rows, results) => {
                    if (err) {
                        res.status(410).jsonp(err);
                        next(err);
                    } else {
                        res.status(200).jsonp("Company profile updated successfully!");
                    }
                });
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


module.exports = router;