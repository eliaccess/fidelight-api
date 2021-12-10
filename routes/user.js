const express = require('express');
const {format} = require('util');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../modules/dbConnect');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const midWare = require('../modules/middleware');
var emailFunctions = require('../modules/emailFunctions');

let passAuth = [
    check('newPassword').exists(),
    check('oldPassword').exists(),
    midWare.checkToken
];

router.put('/v1/user/password', passAuth, (req, res, next) => {
    try {
        if(req.decoded.type != 'user'){
            res.status(403).jsonp({msg:'Access forbidden'});
            return 2;
        } else {
            validationResult(req).throw();

            db.query("SELECT * FROM user WHERE id = ?", [req.decoded.id], (err, rows, results) => {
                if (err) {
                    res.status(410).jsonp({msg:err});
                    next(err);
                } else {
                    if (rows[0]) {
                        // verify if the password is already setup, else we change it
                        if(rows[0].hash_pwd == null){
                            if(req.body.oldPassword == null){
                                db.query("UPDATE user SET ? WHERE id = ?", [regData, req.decoded.id], (iErr, iRows, iResult) => {
                                    if (iErr) {
                                        res.status(410).jsonp({msg:iErr});
                                        next(iErr);
                                    } else {
                                        res.status(200).jsonp({msg: "Password successfully set up!"});
                                    }
                                });
                            } else {
                                res.status(410).jsonp({msg: "Wrong old password! Please set you password before editing it."});
                            }
                        } else {
                            if(req.body.oldPassword == null){
                                res.status(410).jsonp({msg:"Please provide your old password!"});
                            } else {
                                const BCRYPT_SALT_ROUNDS = 12;
                                let regData = {
                                    hash_pwd: bcrypt.hashSync(req.body.newPassword, BCRYPT_SALT_ROUNDS),
                                    salt: BCRYPT_SALT_ROUNDS
                                };
                                hashed_pwd = Buffer.from(rows[0].hash_pwd, 'base64').toString('utf-8');
                                if (bcrypt.compareSync(req.body.oldPassword, hashed_pwd)) {
                                    db.query("UPDATE user SET ? WHERE id = ?", [regData, req.decoded.id], (iErr, iRows, iResult) => {
                                        if (iErr) {
                                            res.status(410).jsonp({msg:iErr});
                                            next(iErr);
                                        } else {
                                            res.status(200).jsonp({msg: "Password successfully modified!"});
                                        }
                                    });
                                } else {
                                    res.status(410).jsonp({msg:"Wrong old password!"});
                                }
                            }
                        }
                    } else {
                        res.status(410).jsonp({msg:"Authentication failed!"});
                    }
                }
            });
        }
    } catch (err) {
        res.status(400).json({msg:err});
    }
});

router.get('/v1/user/profile', midWare.checkToken, (req, res, next) => {
    try {
        if(req.decoded.type != 'user'){
            res.status(403).jsonp({msg:'Access forbidden'});
            return 2;
        }
        db.query("SELECT * FROM user WHERE id = ?", [req.decoded.id], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp({msg:err});
                next(err);
            } else {
                if (rows[0]) {
                    let birthdate = rows[0].birthdate ? rows[0].birthdate.toISOString().split("T")[0] : null;
                    let passwordSet = false;
                    if(rows[0].hash_pwd != null){
                        passwordSet = true
                    }
                    db.query("SELECT * FROM user_social WHERE user = ?", [req.decoded.id], (err, rows2, results) => {
                        if(err){
                            res.status(200).jsonp({data:{id: rows[0].id, surname: rows[0].surname, name: rows[0].name, qrCode: rows[0].qr_key, phone: rows[0].phone, email: rows[0].email, birthdate: birthdate, passwordSet: passwordSet, google: false, facebook: false}, msg:"success"});
                            next(err);
                        } else {
                            if(rows2[0]){
                                let google = false;
                                let facebook = false;
                                rows2.forEach(element => {
                                    if(element.provider == 'google') google = true;
                                    else if(element.provider == 'facebook') facebook = true;
                                });
                                res.status(200).jsonp({data:{id: rows[0].id, surname: rows[0].surname, name: rows[0].name, qrCode: rows[0].qr_key, phone: rows[0].phone, email: rows[0].email, birthdate: birthdate, passwordSet: passwordSet, google: google, facebook: facebook}, msg:"success"});
                            } else {
                                res.status(200).jsonp({data:{id: rows[0].id, surname: rows[0].surname, name: rows[0].name, qrCode: rows[0].qr_key, phone: rows[0].phone, email: rows[0].email, birthdate: birthdate, passwordSet: passwordSet, google: false, facebook: false}, msg:"success"});
                            }
                        }
                    });
                } else {
                    res.status(404).jsonp({msg:"Profile not found!"});
                }
            }
        });
    } catch (err) {
        res.status(400).json({msg:err});
    }
});


router.put('/v1/user/profile', midWare.checkToken, (req, res, next) => {
    try {
        if(req.decoded.type != 'user'){
            res.status(403).jsonp({msg:'Access forbidden'});
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
                res.status(410).jsonp({msg:err});
                next(err);
            } else {
                res.status(200).jsonp({msg:"Profile updated successfully!"});
            }
        });
    } catch (err) {
        res.status(400).json({msg:err});
    }
});

router.delete("/v1/user/register", midWare.checkToken, (req, res, next) => {
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
                res.status(410).jsonp({msg:err});
                next(err);
            }
        });

        db.query("DELETE FROM user_like WHERE user = ?", [req.decoded.id], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp({msg:err});
                next(err);
            }
        });

        db.query("UPDATE user SET ? WHERE id = ?", [regData, req.decoded.id], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp({msg:err});
                next(err);
            } else {
                res.status(200).jsonp({msg:"Account successfully deleted!"});
            }
        });
    } catch (err) {
        res.status(400).json({msg:err});
    }
});

let likeAuth = [
    check('company').exists(),
    midWare.checkToken
];


router.post('/v1/user/like/', likeAuth, (req, res, next) => {
    try {
        if(req.decoded.type != 'user'){
            res.status(403).jsonp({msg:'Access forbidden'});
            return 2;
        }
        db.query("SELECT * FROM company WHERE id = ?", [req.body.company], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp({msg:err});
                next(err);
            } else {
                if (rows[0]) {
                    db.query("SELECT * FROM user_like WHERE user = ?", [req.decoded.id], (err, rows, results) => {
                        if (err) {
                            res.status(410).jsonp({msg:err});
                            next(err);
                        } else {
                            if(rows[0]){
                                var alreadyLiked = 0;
                                if (rows.length < 20){
                                    rows.forEach(element => {
                                        if(element.company == req.body.company) alreadyLiked = 1;
                                    });

                                    if(alreadyLiked == 1) res.status(200).jsonp({msg:"You already liked this company!"});
                                    else{
                                        let likeData = {
                                            user: req.decoded.id,
                                            company: req.body.company
                                        };
                                        db.query("INSERT INTO user_like SET ?", [likeData], (err, rows, results) => {
                                            if (err) {
                                                res.status(410).jsonp({msg:err});
                                                next(err);
                                            } else {
                                                res.status(200).jsonp({msg:"Company successfully added to your likes!"});
                                            }
                                        });
                                    }
                                } else {
                                    res.status(409).jsonp({msg:"You have reached the max likes amount (20)!"});
                                }
                            } else {
                                let likeData = {
                                    user: req.decoded.id,
                                    company: req.body.company
                                };
                                db.query("INSERT INTO user_like SET ?", [likeData], (err, rows, results) => {
                                    if (err) {
                                        res.status(410).jsonp({msg:err});
                                        next(err);
                                    } else {
                                        res.status(200).jsonp({msg:"Company successfully added to your likes!"});
                                    }
                                });
                            }
                        }
                    });
                } else {
                    res.status(404).jsonp({msg:"Company not found!"});
                }
            }
        });
    } catch (err) {
        res.status(400).json({msg:err});
    }
});

router.delete('/v1/user/like/', likeAuth, (req, res, next) => {
    try {
        if(req.decoded.type != 'user'){
            res.status(403).jsonp({msg:'Access forbidden'});
            return 2;
        }
        db.query("SELECT * FROM user_like WHERE user = ? AND company = ?", [req.decoded.id, req.body.company], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp({msg:err});
                next(err);
            } else {
                if(!rows[0]){
                    res.status(200).jsonp("This company is not in your likes!");
                } else {
                    db.query("DELETE FROM user_like WHERE user = ? AND company = ?", [req.decoded.id, req.body.company], (err, rows, results) => {
                        if (err) {
                            res.status(410).jsonp({msg:err});
                            next(err);
                        } else {
                            res.status(200).jsonp({msg:"Company successfully removed from your likes!"});
                        }
                    });
                }
            }
        });
    } catch (err) {
        res.status(400).json({msg:err});
    }
});

router.get('/v1/user/like/', midWare.checkToken, (req, res, next) => {
    try {
        if(req.decoded.type != 'user'){
            res.status(403).jsonp({msg:'Access forbidden'});
            return 2;
        }
        db.query("SELECT company.id AS id, company.name AS name, company.description AS description, company.logo_link AS logoUrl FROM user_like LEFT JOIN company ON user_like.company = company.id WHERE user = ? AND company.active = 1", [req.decoded.id], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp({msg:err});
                next(err);
            } else if (rows[0]){
                const bucketName = "fidelight-api";
                var counter = 0;
                rows.forEach(company => {
                    rows[counter].isFavorite = true;
                    if(company.logoUrl == null){
                        rows[counter].logoUrl = null;
                    } else {
                        rows[counter].logoUrl = format(
                            `https://storage.googleapis.com/${bucketName}/${company.logoUrl}`
                        );
                    }
                    counter++;
                });

                res.status(200).jsonp({data:rows, msg:"success"});
            } else {
                res.status(404).jsonp({msg:"No company liked yet!"});
            }
        });
    } catch (err) {
        res.status(400).json({msg:err});
    }
});

router.get('/v1/user/verify/:token', (req, res, next) => {
    try {
        const decodedToken = jwt.verify(req.params.token, process.env.EMAIL_TOKEN_SECRET);

        if(decodedToken.type == 'user' && decodedToken.id){
            db.query("SELECT verified, active FROM user WHERE id = ?", [decodedToken.id], (err, rows, results) => {
                if (err) {
                    res.status(410).jsonp({msg:err});
                    next(err);
                } else if(rows[0]){
                    // route for new accounts
                    if((rows[0].verified != 1) && (rows[0].active == 2)){
                        db.query("UPDATE user SET verified = 1, active = 1 WHERE id = ?", [decodedToken.id], (err, rows, results) => {
                            if (err) {
                                res.status(410).jsonp({msg:err});
                                next(err);
                            } else {
                                res.status(200).jsonp({msg:'Your account has been verified !'});
                            }
                        });
                    // route for active / banned accounts
                    } else if (rows[0].verified != 1){
                        db.query("UPDATE user SET verified = 1 WHERE id = ?", [decodedToken.id], (err, rows, results) => {
                            if (err) {
                                res.status(410).jsonp({msg:err});
                                next(err);
                            } else {
                                res.status(200).jsonp({msg:'Your account has been verified !'});
                            }
                        });
                    // route for verified accounts
                    } else {
                        res.status(403).json({msg:'Your account has already been verified.'});
                    }
                } else {
                    res.status(404).json({msg:'An issue occured finding your account. Please contact the support.'});
                }
            });
        } else {
            res.status(401).json({msg:'Please provide a valide token.'});
        }
    } catch (err) {
        res.status(400).json({msg:err});
    }
});

let socialAuth = [
    check('userId').exists(),
    check('provider').exists(),
    check('email', 'Username Must Be an Email Address').isEmail(),
    check('name').exists(),
    midWare.checkToken
];

router.post('/v1/user/connect/social/', socialAuth, async (req, res, next) => {
    try {
        if(req.decoded.type != 'user'){
            res.status(403).jsonp({msg:'Access forbidden'});
            return 2;
        }

        validationResult(req).throw();

        if(req.body.provider == 'google' || req.body.provider == 'facebook'){
            db.query("SELECT * FROM user_social WHERE BINARY email = ? AND social_id = ? AND provider = ?", [req.body.email, req.body.userId, req.body.provider], async (err, rows, results) => {
                if (err) {
                    res.status(410).jsonp({msg:err});
                    next(err);
                } else {
                    if (rows[0]) {
                        // The account exists, then we just give back a token
                        if(rows[0].user == req.decoded.id){
                            res.status(200).jsonp({msg:"Your " + req.body.provider + " account is already linked to your Fidelight account."});
                        } else {
                            res.status(409).jsonp({msg:"This " + req.body.provider + " account is already linked to another Fidelight account."});
                        }
                    } else {
                        let socData = {
                            user: req.decoded.id,
                            social_id: req.body.userId,
                            email: req.body.email,
                            provider: req.body.provider
                        }

                        db.query("INSERT INTO user_social SET ?", [socData], async (iErr, result2) => {
                            if(iErr){
                                res.status(410).jsonp({msg:iErr});
                                next(iErr);
                            } else {
                                let content = await emailFunctions.generateLinkedSocialAccountEmail(req.body.provider);
                                let mailOptions = await emailFunctions.generateEmailOptions(req.body.email, content);
                                let resultEmail = await emailFunctions.sendEmail(mailOptions).catch(e => console.log("Error:", e.message));

                                res.status(200).jsonp({msg:"Account successfully linked."});
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

let delSocialAuth = [
    check('provider').exists(),
    midWare.checkToken
];

router.delete('/v1/user/connect/social/', delSocialAuth, async (req, res, next) => {
    try {
        if(req.decoded.type != 'user'){
            res.status(403).jsonp({msg:'Access forbidden'});
            return 2;
        }

        validationResult(req).throw();

        if(req.body.provider == 'google' || req.body.provider == 'facebook'){
            db.query("SELECT * FROM user_social WHERE user = ? AND provider = ?", [req.decoded.id, req.body.provider], async (err, rows, results) => {
                if (err) {
                    res.status(410).jsonp({msg:err});
                    next(err);
                } else {
                    if (rows[0]) {
                        db.query("SELECT hash_pwd FROM user WHERE id = ?", [req.decoded.id], async (err, rows, results) => {
                            if(err){
                                res.status(410).jsonp({msg:err});
                                next(err);
                            } else {
                                if(rows[0].hash_pwd == null){
                                    res.status(403).jsonp({msg:"Please set up your password before unlinking your " + req.body.provider + " account."});
                                } else {
                                    db.query("DELETE FROM user_social WHERE user = ? AND provider = ?", [req.decoded.id, req.body.provider], async (err, rows, results) => {
                                        if(err){
                                            res.status(410).jsonp({msg:err});
                                            next(err);
                                        } else {
                                            res.status(200).jsonp({msg:"Your " + req.body.provider + " account was unlinked from your Fidelight account."});
                                        }
                                    });
                                }
                            }
                        });  
                    } else {
                        res.status(404).jsonp({msg:"No " + req.body.provider + " account linked to this Fidelight account."});
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
