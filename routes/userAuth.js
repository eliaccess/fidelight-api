const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../modules/dbConnect');
const dbAuth = require('../modules/dbConnectAuth');
const { check, validationResult } = require('express-validator');
var emailFunctions = require('../modules/emailFunctions');

// Token expiration for users can be changed here
function getAccessToken(id, type){
    // PUT BACK IN PROD THE EXPIRESIN TO 1h
    return jwt.sign({id: id, type: type}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'365d'});
}

function getRefreshToken(id, type){
    return jwt.sign({id: id, type: type}, process.env.REFRESH_TOKEN_SECRET);
}

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

router.post("/v1/user/register", regValidate, async (req, res, next) => {
    try {
        validationResult(req).throw();
        if(req.body.password == null){
            res.status(500).jsonp({msg:"Password can not be null."});
            return 2;
        } else {
            const BCRYPT_SALT_ROUNDS = 12;
            const qrCode = qrGen(10);
            let regData = {
                surname: req.body.surname,
                name: req.body.name,
                hash_pwd: bcrypt.hashSync(req.body.password, BCRYPT_SALT_ROUNDS),
                salt: BCRYPT_SALT_ROUNDS,
                email: req.body.email,
                phone: req.body.phone,
                birthdate: req.body.birthdate,
                registration_date: new Date(),
                qr_key: qrCode,
                verified: 0,
                active: 2
            };

            //Verifying that the user doesn't exist in table then inserting the data
            db.query("SELECT * FROM user WHERE email IS NOT NULL AND BINARY email = ? OR phone IS NOT NULL AND BINARY phone = ?", [regData.email, regData.phone], async (err, rows, results) => {
                if (err) {
                    res.status(410).jsonp({msg:err});
                    next(err);
                } else {
                    if (rows[0]) {
                        res.status(409).jsonp({msg:"Your email address or phone number is already registered !"});
                    } else {
                        db.query("INSERT INTO user SET ?", [regData], async (iErr, result) => {
                            if (err) {
                                res.status(410).jsonp({msg:err});
                                next(err);
                            } else {
                                //Adding the user to default user type
                                let insertedId = result.insertId;
                                db.query("SELECT * FROM user_type WHERE BINARY name = 'Default'", async (err, rows2, results2) => {
                                    if (err) {
                                        res.status(410).jsonp({msg:err});
                                        next(err);
                                    } else {
                                        let regData2 = {
                                            user: result.insertId,
                                            user_type: rows2[0].id
                                        };
                                        db.query("INSERT INTO user_category SET ?", [regData2], async (iErr, result2) => {
                                            if (err) {
                                                res.status(410).jsonp({msg:err});
                                                next(err);
                                            }
                                            else{
                                                refToken = getRefreshToken(result.insertId, 'user');
                                                let saveRefToken = {
                                                    id: result.insertId,
                                                    refresh_token: refToken
                                                }
                                                let token = getAccessToken(result.insertId, 'user');
                                                dbAuth.query("INSERT INTO user_refresh_token SET ?", [saveRefToken], async (err, rows3, results) => {
                                                    if(err){
                                                        let emailToken = getEmailToken(insertedId, 'user');
                                                        let linkConf = "https://api.fidelight.fr/v1/user/verify/" + emailToken
                                                        let content = await emailFunctions.generateConfirmationEmailUser(req.body.name, req.body.surname, linkConf);
                                                        let mailOptions = await emailFunctions.generateEmailOptions(req.body.email, content);
                                                        let resultEmail = await emailFunctions.sendEmail(mailOptions).catch(e => console.log("Error:", e.message));

                                                        if (resultEmail){
                                                            let msg = "Email sent to " + mailOptions.to + ". Please confirm your account by clicking on the link in that email.";
                                                            res.status(200).jsonp({data:{id: result.insertId, qrCode: qrCode + '.' + result.insertId, accessToken: token}, msg:msg});
                                                        } else {
                                                            console.log("Error: mail not sent");
                                                            let msg = "Account created, but impossible to sent a confirmation email to " + mailOptions.to + ". Please contact support.";
                                                            res.status(500).jsonp({data:{id: result.insertId, qrCode: qrCode + '.' + result.insertId, accessToken: token}, msg:msg});
                                                        }
                                                        next(err);
                                                    } else {
                                                        let emailToken = getEmailToken(insertedId, 'user');
                                                        let linkConf = "https://api.fidelight.fr/v1/user/verify/" + emailToken
                                                        let content = await emailFunctions.generateConfirmationEmailUser(req.body.name, req.body.surname, linkConf);
                                                        let mailOptions = await emailFunctions.generateEmailOptions(req.body.email, content);
                                                        let resultEmail = await emailFunctions.sendEmail(mailOptions).catch(e => console.log("Error:", e.message));

                                                        if (resultEmail){
                                                            let msg = "Email sent to " + mailOptions.to + ". Please confirm your account by clicking on the link in that email.";
                                                            res.status(200).jsonp({data:{id: result.insertId, qrCode: qrCode + '.' + result.insertId, accessToken: token, refreshToken: refToken}, msg:msg});
                                                        } else {
                                                            console.log("Error: mail not sent");
                                                            let msg = "Account created, but impossible to sent a confirmation email to " + mailOptions.to + ". Please contact support.";
                                                            res.status(500).jsonp({data:{id: result.insertId, qrCode: qrCode + '.' + result.insertId, accessToken: token, refreshToken: refToken}, msg:msg});
                                                        }
                                                        next(err);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }
    } catch (err) {
        res.status(400).json({msg:err});
    }
});

let refToken = [
    check('refreshToken').exists()
];

router.post('/v1/user/token/', refToken, (req, res, next) => {
    try{
        dbAuth.query("SELECT id FROM user_refresh_token WHERE refresh_token = ?", [req.body.refresh_token], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if(rows[0]){
                    res.status(200).jsonp({data:{accessToken: getAccessToken(rows[0].id, 'user')}, msg:"success"});
                } else {
                    res.status(403).jsonp({msg:"Refresh token is not valid."});
                }
            }
        });
    } catch(err){
        res.status(400).json({msg:err});
    }
});

let logAuth = [
    check('email', 'Username Must Be an Email Address').isEmail(),
    check('password').exists()
];

router.post('/v1/user/login', logAuth, (req, res, next) => {
    try {
        validationResult(req).throw();
        db.query("SELECT * FROM user WHERE BINARY email = ?", [req.body.email], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp({msg:err});
                next(err);
            } else {
                if (rows[0]) {
                    hashed_pwd = Buffer.from(rows[0].hash_pwd, 'base64').toString('utf-8');
                    if (bcrypt.compareSync(req.body.password, hashed_pwd)) {
                        const token = getAccessToken(rows[0].id, 'user');
                        dbAuth.query("SELECT refresh_token FROM user_refresh_token WHERE id = ?", [rows[0].id], (err, rows2, results) => {
                            if(err){
                                res.status(410).jsonp({msg:err});
                                next(err);
                            } else {
                                if(rows2[0]) res.status(200).jsonp({data:{id: rows[0].id, qrCode: rows[0].qr_key, accessToken: token, refreshToken: rows2[0].refresh_token}, msg:"success"});
                                else{
                                    refToken = getRefreshToken(rows[0].id, 'user');
                                    let saveRefToken = {
                                        id: rows[0].id,
                                        refresh_token: refToken
                                    }
                                    dbAuth.query("INSERT INTO user_refresh_token SET ?", [saveRefToken], (err, rows3, results) => {
                                        if(err){
                                            res.status(410).jsonp({msg:err});
                                            next(err);
                                        } else {
                                            res.status(200).jsonp({data:{id: rows[0].id, qrCode: rows[0].qr_key + '.' + rows[0].id, accessToken: token, refreshToken: refToken}, msg:"success"});
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


let socialAuth = [
    check('userId').exists(),
    check('provider').exists(),
    check('email', 'Username Must Be an Email Address').isEmail(),
    check('name').exists()
];

router.post('/v1/user/social/', socialAuth, async (req, res, next) => {
    try {
        validationResult(req).throw();

        if(req.body.provider == 'google'){
            db.query("SELECT * FROM user_social WHERE BINARY email = ? AND social_id = ? AND provider = 'google'", [req.body.email, req.body.userId], async (err, rows, results) => {
                if (err) {
                    res.status(410).jsonp({msg:err});
                    next(err);
                } else {
                    if (rows[0]) {
                        // The account exists, then we just give back a token
                        const token = getAccessToken(rows[0].user, 'user');
                        dbAuth.query("SELECT refresh_token FROM user_refresh_token WHERE id = ?", [rows[0].user], async (err, rows2, results) => {
                            if(err){
                                res.status(410).jsonp({msg:err});
                                next(err);
                            } else {
                                if(rows2[0]) res.status(200).jsonp({data:{id: rows[0].user, qrCode: rows[0].qr_key, accessToken: token, refreshToken: rows2[0].refresh_token}, msg:"success"});
                                else{
                                    refToken = getRefreshToken(rows[0].user, 'user');
                                    let saveRefToken = {
                                        id: rows[0].user,
                                        refresh_token: refToken
                                    }
                                    dbAuth.query("INSERT INTO user_refresh_token SET ?", [saveRefToken], async (err, rows3, results) => {
                                        if(err){
                                            res.status(410).jsonp({msg:err});
                                            next(err);
                                        } else {
                                            res.status(200).jsonp({data:{id: rows[0].user, qrCode: rows[0].qr_key + '.' + rows[0].user, accessToken: token, refreshToken: refToken}, msg:"success"});
                                        }
                                    });
                                }
                            }
                        });
                    } else {
                        db.query("SELECT * FROM user WHERE BINARY email = ?", [req.body.email], async (err, rows2, results) => {
                            if(err){
                                res.status(410).jsonp({msg:err});
                                next(err);
                            } else {
                                if(rows[0]){
                                    // The account doesn't exist but the email is used, then we tell it to the user
                                    res.status(409).jsonp({msg:"Your email is already registered, but not linked to this Google account!"});
                                } else {
                                    // The account doesn't exist, then we create the account and we give back a token
                                    const qrCode = qrGen(10);

                                    let regData = {
                                        surname: null,
                                        name: req.body.name,
                                        hash_pwd: null,
                                        salt: 0,
                                        email: req.body.email,
                                        phone: null,
                                        birthdate: null,
                                        registration_date: new Date(),
                                        qr_key: qrCode,
                                        verified: 0,
                                        active: 2
                                    };
                                    
                                    db.query("INSERT INTO user SET ?", [regData], async (iErr, result) => {
                                        if (iErr) {
                                            res.status(410).jsonp({msg:iErr});
                                            next(iErr);
                                        } else {
                                            //Adding the user to default user type
                                            db.query("SELECT * FROM user_type WHERE BINARY name = 'Default'", async (err, rows2, results2) => {
                                                if (err) {
                                                    res.status(410).jsonp({msg:err});
                                                    next(err);
                                                } else {
                                                    let regData2 = {
                                                        user: result.insertId,
                                                        user_type: rows2[0].id
                                                    };

                                                    let socData = {
                                                        user: result.insertId,
                                                        social_id: req.body.userId,
                                                        email: req.body.email,
                                                        provider: 'google'
                                                    }

                                                    db.query("INSERT INTO user_category SET ?", [regData2], async (iErr, result2) => {
                                                        if (iErr) {
                                                            res.status(410).jsonp({msg:iErr});
                                                            next(iErr);
                                                        }
                                                        else{
                                                            db.query("INSERT INTO user_social SET ?", [socData], async (iErr, result2) => {
                                                                if(iErr){
                                                                    res.status(410).jsonp({msg:iErr});
                                                                    next(iErr);
                                                                } else {
                                                                    refToken = getRefreshToken(result.insertId, 'user');
                                                                    let saveRefToken = {
                                                                        id: result.insertId,
                                                                        refresh_token: refToken
                                                                    }
                                                                    let token = getAccessToken(result.insertId, 'user');
                                                                    dbAuth.query("INSERT INTO user_refresh_token SET ?", [saveRefToken], async (err, rows3, results) => {
                                                                        if(err){
                                                                            let emailToken = getEmailToken(insertedId, 'user');
                                                                            let linkConf = "https://api.fidelight.fr/v1/user/verify/" + emailToken
                                                                            let content = await emailFunctions.generateConfirmationEmailUser(req.body.name, null, linkConf);
                                                                            let mailOptions = await emailFunctions.generateEmailOptions(req.body.email, content);
                                                                            let resultEmail = await emailFunctions.sendEmail(mailOptions).catch(e => console.log("Error:", e.message));

                                                                            if (resultEmail){
                                                                                let msg = "Email sent to " + mailOptions.to + ". Please confirm your account by clicking on the link in that email.";
                                                                                res.status(200).jsonp({data:{id: result.insertId, qrCode: qrCode + '.' + result.insertId, accessToken: token}, msg:msg});
                                                                            } else {
                                                                                console.log("Error: mail not sent");
                                                                                let msg = "Account created, but impossible to sent a confirmation email to " + mailOptions.to + ". Please contact support.";
                                                                                res.status(500).jsonp({data:{id: result.insertId, qrCode: qrCode + '.' + result.insertId, accessToken: token}, msg:msg});
                                                                            }
                                                                            next(err);
                                                                        } else {
                                                                            let emailToken = getEmailToken(insertedId, 'user');
                                                                            let linkConf = "https://api.fidelight.fr/v1/user/verify/" + emailToken
                                                                            let content = await emailFunctions.generateConfirmationEmailUser(req.body.name, null, linkConf);
                                                                            let mailOptions = await emailFunctions.generateEmailOptions(req.body.email, content);
                                                                            let resultEmail = await emailFunctions.sendEmail(mailOptions).catch(e => console.log("Error:", e.message));

                                                                            if (resultEmail){
                                                                                let msg = "Email sent to " + mailOptions.to + ". Please confirm your account by clicking on the link in that email.";
                                                                                res.status(200).jsonp({data:{id: result.insertId, qrCode: qrCode + '.' + result.insertId, accessToken: token, refreshToken: refToken}, msg:msg});
                                                                            } else {
                                                                                console.log("Error: mail not sent");
                                                                                let msg = "Account created, but impossible to sent a confirmation email to " + mailOptions.to + ". Please contact support.";
                                                                                res.status(500).jsonp({data:{id: result.insertId, qrCode: qrCode + '.' + result.insertId, accessToken: token, refreshToken: refToken}, msg:msg});
                                                                            }
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });
        } else if (req.body.provider == 'facebook'){
            db.query("SELECT * FROM user_social WHERE BINARY email = ? AND social_id = ? AND provider = 'facebook'", [req.body.email, req.body.userId], async (err, rows, results) => {
                if (err) {
                    res.status(410).jsonp({msg:err});
                    next(err);
                } else {
                    if (rows[0]) {
                        // The account exists, then we just give back a token
                        const token = getAccessToken(rows[0].user, 'user');
                        dbAuth.query("SELECT refresh_token FROM user_refresh_token WHERE id = ?", [rows[0].user], async (err, rows2, results) => {
                            if(err){
                                res.status(410).jsonp({msg:err});
                                next(err);
                            } else {
                                if(rows2[0]) res.status(200).jsonp({data:{id: rows[0].user, qrCode: rows[0].qr_key, accessToken: token, refreshToken: rows2[0].refresh_token}, msg:"success"});
                                else{
                                    refToken = getRefreshToken(rows[0].user, 'user');
                                    let saveRefToken = {
                                        id: rows[0].user,
                                        refresh_token: refToken
                                    }
                                    dbAuth.query("INSERT INTO user_refresh_token SET ?", [saveRefToken], async (err, rows3, results) => {
                                        if(err){
                                            res.status(410).jsonp({msg:err});
                                            next(err);
                                        } else {
                                            res.status(200).jsonp({data:{id: rows[0].user, qrCode: rows[0].qr_key + '.' + rows[0].user, accessToken: token, refreshToken: refToken}, msg:"success"});
                                        }
                                    });
                                }
                            }
                        });
                    } else {
                        db.query("SELECT * FROM user WHERE BINARY email = ?", [req.body.email], async (err, rows2, results) => {
                            if(err){
                                res.status(410).jsonp({msg:err});
                                next(err);
                            } else {
                                if(rows[0]){
                                    // The account doesn't exist but the email is used, then we tell it to the user
                                    res.status(409).jsonp({msg:"Your email is already registered, but not linked to this Facebook account!"});
                                } else {
                                    // The account doesn't exist, then we create the account and we give back a token
                                    const qrCode = qrGen(10);

                                    let regData = {
                                        surname: null,
                                        name: req.body.name,
                                        hash_pwd: null,
                                        salt: 0,
                                        email: req.body.email,
                                        phone: null,
                                        birthdate: null,
                                        registration_date: new Date(),
                                        qr_key: qrCode,
                                        verified: 0,
                                        active: 2
                                    };
                                    
                                    db.query("INSERT INTO user SET ?", [regData], async (iErr, result) => {
                                        if (iErr) {
                                            res.status(410).jsonp({msg:iErr});
                                            next(iErr);
                                        } else {
                                            //Adding the user to default user type
                                            db.query("SELECT * FROM user_type WHERE BINARY name = 'Default'", async (err, rows2, results2) => {
                                                if (err) {
                                                    res.status(410).jsonp({msg:err});
                                                    next(err);
                                                } else {
                                                    let regData2 = {
                                                        user: result.insertId,
                                                        user_type: rows2[0].id
                                                    };

                                                    let socData = {
                                                        user: result.insertId,
                                                        social_id: req.body.userId,
                                                        email: req.body.email,
                                                        provider: 'facebook'
                                                    }

                                                    db.query("INSERT INTO user_category SET ?", [regData2], async (iErr, result2) => {
                                                        if (iErr) {
                                                            res.status(410).jsonp({msg:iErr});
                                                            next(iErr);
                                                        }
                                                        else{
                                                            db.query("INSERT INTO user_social SET ?", [socData], async (iErr, result2) => {
                                                                if(iErr){
                                                                    res.status(410).jsonp({msg:iErr});
                                                                    next(iErr);
                                                                } else {
                                                                    refToken = getRefreshToken(result.insertId, 'user');
                                                                    let saveRefToken = {
                                                                        id: result.insertId,
                                                                        refresh_token: refToken
                                                                    }
                                                                    let token = getAccessToken(result.insertId, 'user');
                                                                    dbAuth.query("INSERT INTO user_refresh_token SET ?", [saveRefToken], async (err, rows3, results) => {
                                                                        if(err){
                                                                            let emailToken = getEmailToken(insertedId, 'user');
                                                                            let linkConf = "https://api.fidelight.fr/v1/user/verify/" + emailToken
                                                                            let content = await emailFunctions.generateConfirmationEmailUser(req.body.name, null, linkConf);
                                                                            let mailOptions = await emailFunctions.generateEmailOptions(req.body.email, content);
                                                                            let resultEmail = await emailFunctions.sendEmail(mailOptions).catch(e => console.log("Error:", e.message));

                                                                            if (resultEmail){
                                                                                let msg = "Email sent to " + mailOptions.to + ". Please confirm your account by clicking on the link in that email.";
                                                                                res.status(200).jsonp({data:{id: result.insertId, qrCode: qrCode + '.' + result.insertId, accessToken: token}, msg:msg});
                                                                            } else {
                                                                                console.log("Error: mail not sent");
                                                                                let msg = "Account created, but impossible to sent a confirmation email to " + mailOptions.to + ". Please contact support.";
                                                                                res.status(500).jsonp({data:{id: result.insertId, qrCode: qrCode + '.' + result.insertId, accessToken: token}, msg:msg});
                                                                            }
                                                                            next(err);
                                                                        } else {
                                                                            let emailToken = getEmailToken(insertedId, 'user');
                                                                            let linkConf = "https://api.fidelight.fr/v1/user/verify/" + emailToken
                                                                            let content = await emailFunctions.generateConfirmationEmailUser(req.body.name, null, linkConf);
                                                                            let mailOptions = await emailFunctions.generateEmailOptions(req.body.email, content);
                                                                            let resultEmail = await emailFunctions.sendEmail(mailOptions).catch(e => console.log("Error:", e.message));

                                                                            if (resultEmail){
                                                                                let msg = "Email sent to " + mailOptions.to + ". Please confirm your account by clicking on the link in that email.";
                                                                                res.status(200).jsonp({data:{id: result.insertId, qrCode: qrCode + '.' + result.insertId, accessToken: token, refreshToken: refToken}, msg:msg});
                                                                            } else {
                                                                                console.log("Error: mail not sent");
                                                                                let msg = "Account created, but impossible to sent a confirmation email to " + mailOptions.to + ". Please contact support.";
                                                                                res.status(500).jsonp({data:{id: result.insertId, qrCode: qrCode + '.' + result.insertId, accessToken: token, refreshToken: refToken}, msg:msg});
                                                                            }
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });
        } else {
            res.status(404).jsonp({msg: "Provider not found"});
        }
    } catch (err) {
        res.status(400).json({msg:err});
    }
});

module.exports = router;