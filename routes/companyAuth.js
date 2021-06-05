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
    check('companyType').exists().isNumeric(),
    check('streetNumber').exists(),
    check('streetName').exists(),
    check('city').exists(),
    check('country').exists()
];

router.post('/v1/company/register', regValidate, (req, res, next) => {
    try {
        validationResult(req).throw();
        
        db.query("SELECT * FROM company WHERE BINARY email = ?", [req.body.email], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp({msg:err});
                next(err);
            } else {
                if (rows[0]) {
                    res.status(409).jsonp({msg:"Your email address is already registered !"});
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
                        company_type: req.body.companyType,
                        verified: 0,
                        active: 0
                    };
                    db.query("INSERT INTO company SET ?", [regData], (iErr, result) => {
                        if (iErr) {
                            res.status(410).jsonp({msg:iErr});
                            next(iErr);
                        } else {
                            const usrData = {
                                company: result.insertId,
                                phone: req.body.phone,
                                siret: req.body.siret,
                                street_number: req.body.streetNumber,
                                street_name: req.body.streetName,
                                city: req.body.city,
                                country: req.body.country,
                                billing_adress: 1
                            };
                            db.query("INSERT INTO company_location SET ?", [usrData], (iaErr, logResult) => {
                                if (iaErr) {
                                    res.status(410).jsonp({msg:iaErr});
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
                                            res.status(200).jsonp({data:{id: result.insertId, login: logGened, accessToken: token}, msg:"Account successfully created!"});
                                            next(err);
                                        } else {
                                            res.status(200).jsonp({data:{id: result.insertId, login: logGened, accessToken: token, refreshToken: refToken}, msg:"Account successfully created!"});
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
        res.status(400).json({msg:err});
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
                res.status(410).jsonp({msg:err});
                next(err);
            } else {
                if (rows[0]) {
                    hashed_pwd = Buffer.from(rows[0].hash_pwd, 'base64').toString('utf-8');
                    if (bcrypt.compareSync(req.body.password, hashed_pwd)) {
                        const token = getAccessToken(rows[0].id, 'company');
                        dbAuth.query("SELECT refresh_token FROM company_refresh_token WHERE id = ?", [rows[0].id], (err, rows2, results) => {
                            if(err){
                                res.status(410).jsonp({msg:err});
                                next(err);
                            } else {
                                if(rows2[0]) res.status(200).jsonp({data:{id: rows[0].id, accessToken: token, refreshToken: rows2[0].refresh_token}, msg:"Successfully logged in."});
                                else{
                                    refToken = getRefreshToken(rows[0].id, 'company');
                                    let saveRefToken = {
                                        id: rows[0].id,
                                        refresh_token: refToken
                                    }
                                    dbAuth.query("INSERT INTO company_refresh_token SET ?", [saveRefToken], (err, rows3, results) => {
                                        if(err){
                                            res.status(410).jsonp({msg:err});
                                            next(err);
                                        } else {
                                            res.status(200).jsonp({data:{id: rows[0].id, accessToken: token, refreshToken: refToken}, msg:"Successfully logged in."});
                                        }
                                    });
                                }
                            }
                        });
                    } else {
                        res.status(410).jsonp({msg:"Authentication failed!"});
                    }
                } else {
                    res.status(410).jsonp({msg:"Authentication failed!"});
                }
            }
        });
    } catch (err) {
        res.status(400).json({msg:err});
    }
});

let refToken = [
    check('refreshToken').exists()
];

router.post('/v1/company/token/', refToken, (req, res, next) => {
    try{
        dbAuth.query("SELECT id FROM company_refresh_token WHERE refresh_token = ?", [req.body.refreshToken], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp({msg:err});
                next(err);
            } else {
                if(rows[0]){
                    res.status(200).jsonp({data:{accessToken: getAccessToken(rows[0].id, 'company')}, msg:"success"});
                } else {
                    res.status(403).jsonp({msg:"Refresh token is not valid."});
                }
            }
        });
    } catch(err){
        res.status(400).json({msg:err});
    }
});

module.exports = router;