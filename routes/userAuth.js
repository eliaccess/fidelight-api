const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../modules/dbConnect');
const dbAuth = require('../modules/dbConnectAuth');
const { check, validationResult } = require('express-validator');
const googleApi = require('./googleAuth');
const url = require('url');
/*
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
*/

// Token expiration for users can be changed here
function getAccessToken(id, type){
    return jwt.sign({id: id, type: type}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'1h'});
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
            active: 1
        };

        //Verifying that the user doesn't exist in table then inserting the data
        db.query("SELECT * FROM user WHERE email IS NOT NULL AND BINARY email = ? OR phone IS NOT NULL AND BINARY phone = ?", [regData.email, regData.phone], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp({msg:err});
                next(err);
            } else {
                if (rows[0]) {
                    res.status(409).jsonp("Your email address or phone number is already registered !");
                } else {
                    db.query("INSERT INTO user SET ?", [regData], (iErr, result) => {
                        if (err) {
                            res.status(410).jsonp({msg:err});
                            next(err);
                        } else {
                            //Adding the user to default user type
                            db.query("SELECT * FROM user_type WHERE BINARY name = 'Default'", (err, rows2, results2) => {
                                if (err) {
                                    res.status(410).jsonp({msg:err});
                                    next(err);
                                } else {
                                    let regData2 = {
                                        user: result.insertId,
                                        user_type: rows2[0].id
                                    };
                                    db.query("INSERT INTO user_category SET ?", [regData2], (iErr, result2) => {
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
                                            dbAuth.query("INSERT INTO user_refresh_token SET ?", [saveRefToken], (err, rows3, results) => {
                                                if(err){
                                                    res.status(200).jsonp({data:{id: result.insertId, qrCode: qrCode + '.' + result.insertId, accessToken: token}, msg:"success"});
                                                    next(err);
                                                } else {
                                                    res.status(200).jsonp({data:{id: result.insertId, qrCode: qrCode + '.' + result.insertId, accessToken: token, refreshToken: refToken}, msg:"success"});
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
    } catch (err) {
        res.status(400).json({msg:err});
    }
});

// Routes for Google OAuth2
const scopes = ['email', 'profile'];

exports.requestGmailAuth = function (req, res, next){
    let url = googleApi.generateUrl(scopes);
    res.status(200).jsonp(url);
}

exports.getGmailUserInfo = async function (req, res, next){
    const qs = new url.URL(req.url, process.env.DEFAULT_AUTH_SERVER).searchParams;
    let code = qs.get('code');

    if(!code){
        next(new Error('No code provided'))
    }

    googleApi.getUserInfo(code)
        .then(function(response){
            try {
                validationResult(req).throw();
                const qrCode = qrGen(10);
                let regData = {
                    surname: response.usrData.given_name,
                    name: response.usrData.family_name,
                    hash_pwd: 0,
                    salt: "no",
                    email: response.usrData.email,
                    registration_date: new Date(),
                    qr_key: qrCode,
                    google_token: response.refresh_token,
                    profile_picture_link: response.usrData.picture,
                    verified: response.usrData.verified_email ? 1 : 0,
                    active: 1
                };
        
                //Verifying that the user doesn't exist in table then inserting the data
                db.query("SELECT * FROM user WHERE email IS NOT NULL AND BINARY email = ? OR phone IS NOT NULL AND BINARY phone = ?", [regData.email, regData.phone], (err, rows, results) => {
                    if (err) {
                        res.status(410).jsonp(err);
                        next(err);
                    } else {
                        if (rows[0]) {
                            /* If the account already exists, then we login the user */
                            const token = getAccessToken(rows[0].id, 'user');

                            dbAuth.query("SELECT refresh_token FROM user_refresh_token WHERE id = ?", [rows[0].id], (err, rows2, results) => {
                                if(err){
                                    res.status(410).jsonp(err);
                                    next(err);
                                } else {
                                    if(rows2[0]) res.status(200).jsonp({id: rows[0].id, qrCode: rows[0].qr_key + '.' + rows[0].id, access_token: token, refresh_token: rows2[0].refresh_token});
                                    else{
                                        refToken = getRefreshToken(rows[0].id, 'user');
                                        let saveRefToken = {
                                            id: rows[0].id,
                                            refresh_token: refToken
                                        }
                                        dbAuth.query("INSERT INTO user_refresh_token SET ?", [saveRefToken], (err, rows3, results) => {
                                            if(err){
                                                res.status(410).jsonp(err);
                                                next(err);
                                            } else {
                                                res.status(200).jsonp({id: rows[0].id, qrCode: rows[0].qr_key + '.' + rows[0].id, access_token: token, refresh_token: refToken});
                                            }
                                        });
                                    }
                                }
                            });
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
                                                    refToken = getRefreshToken(result.insertId, 'user');
                                                    let saveRefToken = {
                                                        id: result.insertId,
                                                        refresh_token: refToken
                                                    }
                                                    let token = getAccessToken(result.insertId, 'user');
                                                    dbAuth.query("INSERT INTO user_refresh_token SET ?", [saveRefToken], (err, rows3, results) => {
                                                        if(err){
                                                            res.status(200).jsonp({id: result.insertId, qr_key: qrCode + '.' + result.insertId, access_token: token});
                                                            next(err);
                                                        } else {
                                                            res.status(200).jsonp({id: result.insertId, qrCode: qrCode + '.' + result.insertId, access_token: token, refresh_token: refToken});
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
            } catch (err) {
                res.status(400).json(err);
            }
        }).catch(function(e){
            next(new Error(e.message))
            res.status(500).jsonp("An issue occured when trying to create your account. Please try again later.");
    });
}

router.get('/api/user/gauth/authenticate/', exports.getGmailUserInfo);

router.get('/api/user/gauth', exports.requestGmailAuth);

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

/*
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});


passport.use(
    new FacebookStrategy(
        {
            clientID: "FACEBOOK_CLIENT_ID",
            clientSecret: "process.env.FACEBOOK_SECRET",
            callbackURL: "process.env.FACEBOOK_REDIRECT_URI",
            profileFields: ["email", "name"]
        },
        function(accessToken, refreshToken, profile, done) {
            try{
                const { email, first_name, last_name } = profile._json;
                const userData = {
                    email: email,
                    surname: first_name,
                    lastname: last_name
                };

                const qrCode = qrGen(10);
                let regData = {
                    surname: userData.surname,
                    name: userData.lastname,
                    hash_pwd: 0,
                    salt: "no",
                    email: userData.email ? userData.email : null,
                    registration_date: new Date(),
                    qr_key: qrCode,
                    facebook_token: refreshToken,
                    verified: userData.email ? 1 : 0,
                    active: 1
                };
                
                if(!userData.email){
                    done(new Error("Your Facebook account does not have a verified account."));
                } else {
                    //Verifying that the user doesn't exist in table then inserting the data
                    db.query("SELECT * FROM user WHERE email IS NOT NULL AND BINARY email = ?", [regData.email], (err, rows, results) => {
                        if (err) {
                            res.status(410).jsonp(err);
                            next(err);
                        } else {
                            if (rows[0]) {
                                // If the account already exists, then we login the user 
                                const token = jwt.sign({ id: rows[0].id, sName: rows[0].surname, name: rows[0].name, type: 'user'}, config.secret);
                                done(null, token, 'test');
                            } else {
                                db.query("INSERT INTO user SET ?", [regData], (iErr, result) => {
                                    if (err) {
                                        done(new Error(err));
                                        next(err);
                                    } else {
                                        //Adding the user to default user type
                                        db.query("SELECT * FROM user_type WHERE BINARY name = 'Default'", (err, rows2, results2) => {
                                            if (err) {
                                                done(new Error(err));
                                                next(err);
                                            } else {
                                                let regData2 = {
                                                    user: result.insertId,
                                                    user_type: rows2[0].id
                                                };
                                                db.query("INSERT INTO user_category SET ?", [regData2], (iErr, result2) => {
                                                    if (err) {
                                                        done(new Error(err));
                                                        next(err);
                                                    }
                                                    else{
                                                        const token = jwt.sign({ id: result.insertId, sName: userData.surname, name: userData.lastname, type: 'user'}, config.secret);
                                                        done(null, token, 'test');
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
                done(err);
            }
        }
    )
);

router.get('/api/user/fauth', passport.authenticate("facebook", {scope: ['email', 'public_profile']}));

router.get('/api/user/fauth/authenticate', passport.authenticate("facebook", {
        scope: ['email', 'public_profile'],
        //successRedirect: "/api/user/fauth/authenticate/success/",
        failureRedirect: "/api/user/fauth/authenticate/failure/"
    }, (error, token, res) => {
        // Successful authentication, redirect home.
        console.log(error, token, res);
        try{
            if(error) throw(error);
            else res.status(200).jsonp(token);
        } catch (err) {
            res.status(400).json(err);
        }
    })
);


router.get('/api/user/fauth/authenticate/failure/', (req, res) => {
    res.status(500).send("An error occured. Please try again later.");
});

router.get('/api/user/fauth/authenticate/success/', (req, res) => {
    res.status(200).send("Success");
});
*/

module.exports = router;