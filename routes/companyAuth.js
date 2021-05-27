const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../modules/secret');
const db = require('../modules/dbConnect');
const bcrypt = require('bcryptjs');
const dbAuth = require('../modules/dbConnectAuth');
const { check, validationResult } = require('express-validator');

// Token expiration for companies can be changed here
function getAccessToken(id, type){
    return jwt.sign({id: id, type: type}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'1h'});
}

function getRefreshToken(id, type){
    return jwt.sign({id: id, type: type}, process.env.REFRESH_TOKEN_SECRET);
}

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
    check('street_number').exists(),
    check('street_name').exists(),
    check('city').exists(),
    check('country').exists()
];

router.post('/v1/company/register', regValidate, (req, res, next) => {
    try {
        validationResult(req).throw();
        
        db.query("SELECT * FROM company WHERE BINARY email = ?", [req.body.email], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if (rows[0]) {
                    res.status(410).jsonp("Your email address is already registered !");
                } else {
                    const BCRYPT_SALT_ROUNDS = 12;
                    logGened = logGen(10);                    
                    
                    const regData = {
                        login: logGened,
                        name: req.body.name,
                        hash_pwd: bcrypt.hashSync(req.body.password, BCRYPT_SALT_ROUNDS),
                        salt: BCRYPT_SALT_ROUNDS,
                        email: req.body.email,
                        description: req.body.description,
                        phone: req.body.phone,
                        registration_date: new Date(),
                        background_picture: '',
                        logo_link: '',
                        paying_method: null,
                        company_type: req.body.company_type,
                        verified: 0,
                        active: 0
                    };
                    db.query("INSERT INTO company SET ?", [regData], (iErr, result) => {
                        if (iErr) {
                            res.status(410).jsonp(iErr);
                            next(iErr);
                        } else {
                            const usrData = {
                                company: result.insertId,
                                phone: req.body.phone,
                                siret: req.body.siret,
                                street_number: req.body.street_number,
                                street_name: req.body.street_name,
                                city: req.body.city,
                                country: req.body.country,
                                billing_adress: 1
                            };
                            db.query("INSERT INTO company_location SET ?", [usrData], (iaErr, logResult) => {
                                if (iaErr) {
                                    res.status(410).jsonp(iaErr);
                                    next(iaErr);
                                } else {
                                    refToken = getRefreshToken(result.insertId, 'company');
                                    let token = getAccessToken(result.insertId, 'company');

                                    let saveRefToken = {
                                        id: result.insertId,
                                        refresh_token: refToken
                                    }
                                    
                                    dbAuth.query("INSERT INTO user_refresh_token SET ?", [saveRefToken], (err, rows3, results) => {
                                        if(err){
                                            res.status(200).jsonp({id: result.insertId, login: logGened, access_token: token});
                                            next(err);
                                        } else {
                                            res.status(200).jsonp({id: result.insertId, login: logGened, access_token: token, refresh_token: refToken});
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
        console.log(err);
        res.status(400).json(err);
    }
});

let tokenAuth = [
    check('email', 'Username Must Be an Email Address').isEmail(),
    check('password').exists()
];

router.post('/v1/company/login', tokenAuth, (req, res, next) => {
    try {
        validationResult(req).throw();

        db.query("SELECT * FROM company WHERE BINARY email = ?", [req.body.email], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if (rows[0]) {
                    hashed_pwd = Buffer.from(rows[0].hash_pwd, 'base64').toString('utf-8');
                    if (bcrypt.compareSync(req.body.password, hashed_pwd)) {
                        const token = getAccessToken(rows[0].id, 'company');
                        dbAuth.query("SELECT refresh_token FROM company_refresh_token WHERE id = ?", [rows[0].id], (err, rows2, results) => {
                            if(err){
                                res.status(410).jsonp(err);
                                next(err);
                            } else {
                                if(rows2[0]) res.status(200).jsonp({id: rows[0].id, access_token: token, refresh_token: rows2[0].refresh_token});
                                else{
                                    refToken = getRefreshToken(rows[0].id, 'company');
                                    let saveRefToken = {
                                        id: rows[0].id,
                                        refresh_token: refToken
                                    }
                                    dbAuth.query("INSERT INTO company_refresh_token SET ?", [saveRefToken], (err, rows3, results) => {
                                        if(err){
                                            res.status(410).jsonp(err);
                                            next(err);
                                        } else {
                                            res.status(200).jsonp({id: rows[0].id, access_token: token, refresh_token: refToken});
                                        }
                                    });
                                }
                            }
                        });
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

let refToken = [
    check('refresh_token').exists()
];

router.post('/v1/company/token/', refToken, (req, res, next) => {
    try{
        dbAuth.query("SELECT id FROM company_refresh_token WHERE refresh_token = ?", [req.body.refresh_token], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if(rows[0]){
                    res.status(200).jsonp({access_token: getAccessToken(rows[0].id, 'company')});
                } else {
                    res.status(403).jsonp("Refresh token is not valid.");
                }
            }
        });
    } catch(err){
        res.status(400).json(err);
    }
});

module.exports = router;