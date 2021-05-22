const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../modules/secret');
const db = require('../modules/dbConnect');
const bcrypt = require('bcryptjs');
const midWare = require('../modules/middleware');
const { check, validationResult } = require('express-validator');
const fs = require('fs');
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'images/companies/');
    },
    filename: function(req, file, cb){
        cb(null, 'company_' + new Date().toISOString() + '_' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    onError : function(err, next) {
        console.log('error', err);
        next(err);
    },
    fileFilter: fileFilter
});

router.get('/api/company/type', midWare.checkToken, (req, res, next) => {
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

let postSchedule = [
    check('schedule').exists(),
    midWare.checkToken
];

/*
router.post('/api/company/schedule/', postSchedule, (req, res, next) => {
    try {
        validationResult(req).throw();
        if(req.decoded.type != 'company'){
            res.status(403).jsonp('Access forbidden');
            return 2;
        } else {
            db.query("SELECT id FROM company_location WHERE company = ? AND billing_adress = 1", [req.decoded.id], (err, rows, results) => {
                if (err) {
                    res.status(410).jsonp(err);
                    next(err);
                } else if (rows[0]){
                    db.query("SELECT * FROM schedule WHERE company_location = ?", [rows[0].id], (err, rows, results) => {
                        if(err){
                            res.status(410).jsonp(err);
                            next(err);
                        }
                        else {
                            // Creating the structure from schedule
                            var schedule = {};
                            schedule.forEach(element => {
                                if(!element.day || typeof element.day != 'number' || element.day > 7 || element.day <= 0);
                                else if((!element.open && !element.close) || typeof element.day != 'number' || element.day > 7 || element.day <= 0) ;
                                else {
                                    let scheduleData = {
                                        day: Math.trunc(element.day),
                                    }
                                }
                            });

                            if (rows[0]) {

                            } else {

                            }
                        }
                    });
                } else {
                    res.status(404).jsonp("You have no company location!");
                }
            });
        }
    } catch (err) {
        res.status(400).json(err);
    }
});
*/

router.post(('/api/company/logo/'), upload.single('logo'), midWare.checkToken, (req, res, next) => {
    try {
        validationResult(req).throw();
        if(req.decoded.type != 'company'){
            res.status(403).jsonp('Access forbidden');
            return 2;
        } else {
            if(req.file){
                /* checking of the company exists */
                db.query("SELECT * FROM company WHERE id = ?", [req.decoded.id], (err, rows, results) => {
                    if (err) {
                        res.status(410).jsonp(err);
                        next(err);
                    } else if (rows[0]){
                        /* if a logo already exists, then we replace it, else we just create one */
                        if(rows[0].logo_link){
                            fs.unlink(rows[0].logo_link, function(err, rows){
                                if(err && err.code !== "ENOENT"){
                                    res.status(410).jsonp(err);
                                    next(err);
                                } else {
                                    db.query("UPDATE company SET logo_link = ? WHERE id = ?", [req.file.path, req.decoded.id], (err, rows, results) => {
                                        if (err) {
                                            res.status(410).jsonp(err);
                                            next(err);
                                        } else {
                                            res.status(200).jsonp("Logo added successfully!");
                                        }
                                    });
                                }
                            });
                        } else {
                            db.query("UPDATE company SET logo_link = ? WHERE id = ?", [req.file.path, req.decoded.id], (err, rows, results) => {
                                if (err) {
                                    res.status(410).jsonp(err);
                                    next(err);
                                } else {
                                    res.status(200).jsonp('Logo added successfully!');
                                }
                            });
                        }
                    } else {
                        res.status(410).jsonp('Company does not exist!');
                    }
                });
            } else {
                res.status(400).jsonp('The file needs to be PNG, JPEG or JPG');
            }
        }
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.delete(('/api/company/logo/'), midWare.checkToken, (req, res, next) => {
    try {
        validationResult(req).throw();
        if(req.decoded.type != 'company'){
            res.status(403).jsonp('Access forbidden');
            return 2;
        } else {
            db.query("SELECT * FROM company WHERE id = ?", [req.decoded.id], (err, rows, results) => {
                if (err) {
                    res.status(410).jsonp(err);
                    next(err);
                } else if (rows[0]){
                    /* if a logo already exists, then we replace it, else we just create one */
                    if(rows[0].logo_link){
                        fs.unlink(rows[0].logo_link, function(err, rows){
                            if(err && err.code !== "ENOENT"){
                                res.status(410).jsonp(err);
                                next(err);
                            } else {
                                db.query("UPDATE company SET logo_link = '' WHERE id = ?", [req.decoded.id], (err, rows, results) => {
                                    if (err) {
                                        res.status(410).jsonp(err);
                                        next(err);
                                    } else {
                                        res.status(200).jsonp('Logo deleted successfully!');
                                    }
                                });
                            }
                        });
                    } else {
                        res.status(200).jsonp('No logo to delete !');
                    }
                } else {
                    res.status(410).jsonp('Company does not exist!');
                }
            });
        }
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.post(('/api/company/background/'), upload.single('background_picture'), midWare.checkToken, (req, res, next) => {
    try {
        validationResult(req).throw();
        if(req.decoded.type != 'company'){
            res.status(403).jsonp('Access forbidden');
            return 2;
        } else {
            if(req.file){
                /* checking of the company exists */
                db.query("SELECT * FROM company WHERE id = ?", [req.decoded.id], (err, rows, results) => {
                    if (err) {
                        res.status(410).jsonp(err);
                        next(err);
                    } else if (rows[0]){
                        /* if a background picture already exists, then we replace it, else we just create one */
                        if(rows[0].background_picture){
                            fs.unlink(rows[0].background_picture, function(err, rows){
                                if(err && err.code !== "ENOENT"){
                                    res.status(410).jsonp(err);
                                    next(err);
                                } else {
                                    db.query("UPDATE company SET background_picture = ? WHERE id = ?", [req.file.path, req.decoded.id], (err, rows, results) => {
                                        if (err) {
                                            res.status(410).jsonp(err);
                                            next(err);
                                        } else {
                                            res.status(200).jsonp("Background picture added successfully!");
                                        }
                                    });
                                }
                            });
                        } else {
                            db.query("UPDATE company SET background_picture = ? WHERE id = ?", [req.file.path, req.decoded.id], (err, rows, results) => {
                                if (err) {
                                    res.status(410).jsonp(err);
                                    next(err);
                                } else {
                                    res.status(200).jsonp("Background picture added successfully!");
                                }
                            });
                        }
                    } else {
                        res.status(410).jsonp('Company does not exist!');
                    }
                });
            } else {
                res.status(400).jsonp('The file needs to be PNG, JPEG or JPG');
            }
        }
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.delete(('/api/company/background/'), midWare.checkToken, (req, res, next) => {
    try {
        validationResult(req).throw();
        if(req.decoded.type != 'company'){
            res.status(403).jsonp('Access forbidden');
            return 2;
        } else {
            db.query("SELECT * FROM company WHERE id = ?", [req.decoded.id], (err, rows, results) => {
                if (err) {
                    res.status(410).jsonp(err);
                    next(err);
                } else if (rows[0]){
                    /* if a background picture already exists, then we replace it, else we just create one */
                    if(rows[0].background_picture){
                        fs.unlink(rows[0].background_picture, function(err, rows){
                            if(err && err.code !== "ENOENT"){
                                res.status(410).jsonp(err);
                                next(err);
                            } else {
                                db.query("UPDATE company SET background_picture = '' WHERE id = ?", [req.decoded.id], (err, rows, results) => {
                                    if (err) {
                                        res.status(410).jsonp(err);
                                        next(err);
                                    } else {
                                        res.status(200).jsonp('Background picture deleted successfully!');
                                    }
                                });
                            }
                        });
                    } else {
                        res.status(200).jsonp('No background picture to delete !');
                    }
                } else {
                    res.status(410).jsonp('Company does not exist!');
                }
            });
        }
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

/* IF ADDING PICTURES IN DISCOUNTS THEN NEEDS TO DELETE THEM NOW */
router.delete('/api/company/register', midWare.checkToken, (req, res, next) => {
    try {
        validationResult(req).throw();
        if(req.decoded.type != 'company'){
            res.status(403).jsonp('Access forbidden');
            return 2;
        } else {
            db.query("SELECT * FROM company WHERE BINARY id = ?", [req.decoded.id], (err, rows, results) => {
                if (err) {
                    res.status(410).jsonp(err);
                    next(err);
                } else if (rows[0]){
                    if(rows[0].active == 0){
                        res.status(410).jsonp("Inactive accounts can not be deleted!");
                    } else {
                        /* Deleting the logo and background picture of the company */
                        fs.unlink(rows[0].logo_link, function(err, rows){
                            if(err && err.code !== "ENOENT"){
                                res.status(410).jsonp(err);
                                next(err);
                            }
                        });

                        fs.unlink(rows[0].background_picture, function(err, rows){
                            if(err && err.code !== "ENOENT"){
                                res.status(410).jsonp(err);
                                next(err);
                            }
                        });

                        /* Deleting the company from users liked companies */
                        db.query("DELETE FROM user_like WHERE company = ?", [req.decoded.id], (err, rows, results) => {
                            if(err){
                                res.status(410).jsonp(err);
                                next(err);
                            }
                        });

                        /* Deleting company private information */
                        db.query("UPDATE company SET login='', hash_pwd='', salt='', email='', description='', phone='', background_picture='', logo_link='', active=0 WHERE BINARY id = ?", [req.decoded.id], (err, rows, results) => {
                            if(err){
                                res.status(410).jsonp(err);
                                next(err);
                            }
                            else{
                                /* Deleting locations photo locations */
                                db.query("SELECT id FROM company_location WHERE company = ?", [req.decoded.id], (err, rows2, results) => {
                                    if(err){
                                        res.status(410).jsonp(err);
                                        next(err);
                                    } else {
                                        if(rows2){
                                            rows2.forEach(line => {
                                                /* Getting every picture link to delete them */
                                                db.query("SELECT picture_link FROM company_location_picture WHERE company_location = ?", [line.id], (err, rows3, results) => {
                                                    if(err){
                                                        res.status(410).jsonp(err);
                                                        next(err);
                                                    } else {
                                                        if(rows3){
                                                            rows3.forEach(picture => {
                                                                /* Deleting every picture */
                                                                fs.unlink(picture.link_picture, function(err, rows){
                                                                    if(err && err.code !== "ENOENT"){
                                                                        res.status(410).jsonp(err);
                                                                        next(err);
                                                                    } else {
                                                                        db.query("DELETE FROM company_location_picture WHERE company_location = ?", [line.id], (err, rows, results) => {
                                                                            if(err){
                                                                                res.status(410).jsonp(err);
                                                                                next(err);
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            });
                                                        }
                                                    }
                                                });
                                            });
                                        }
                                        
                                        /* removing company location private information */
                                        db.query("UPDATE company_location SET phone='', siret='', longitude=null, latitude=null, street_number='', street_name='' WHERE company = ?", [req.decoded.id], (err, rows, results) => {
                                            if(err){
                                                res.status(410).jsonp(err);
                                                next(err);
                                            } else {
                                                /* Deleting users balances in that company */
                                                db.query("DELETE FROM balance WHERE company = ?", [req.decoded.id], (err, rows, results) => {
                                                    if(err){
                                                        res.status(410).jsonp(err);
                                                        next(err);
                                                    } else {
                                                        /* Deleting discounts and discounts information from the company */
                                                        db.query("SELECT * FROM discount WHERE company = ? AND active = 1", [req.decoded.id], (err, results) => {
                                                            if(err){
                                                                res.status(410).jsonp(err);
                                                                next(err);
                                                            } else {
                                                                if(results[0]){
                                                                    results.forEach(element => {
                                                                        db.query("DELETE FROM discount_repetition WHERE discount = ?", [element.id], (err, result) => {
                                                                            if (err) {
                                                                                res.status(410).jsonp(err);
                                                                                next(err);
                                                                            } else {
                                                                                db.query("DELETE FROM discount_value WHERE discount = ?", [element.id], (err, result) => {
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
                                                                                        db.query("UPDATE discount SET ? WHERE id = ?", [dstInfo, element.id], (err, result) => {
                                                                                            if (err) {
                                                                                                res.status(410).jsonp(err);
                                                                                                next(err);
                                                                                            } else {
                                                                                                res.status(200).jsonp("Account deleted successfully!");
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                });
                                                                            }
                                                                        });
                                                                    });
                                                                } else {
                                                                    res.status(200).jsonp("Account deleted successfully!");
                                                                    return 2;
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
                } else {
                    res.status(410).jsonp("Authentication failed!");
                }
            });
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/api/company/profile/:companyId', midWare.checkToken, (req, res, next) => {
    try {
        if(req.decoded.type == 'company' && (req.decoded.id == req.params.companyId || req.params.companyId == 'me')){
            db.query("SELECT company.name AS name, company.phone AS phone, company.email AS email, company.registration_date AS registration_date, company.description AS description, company.logo_link AS logo, company.background_picture AS background_picture, company_location.id AS company_location, company_location.street_number AS street_number, company_location.street_name AS street_name, company_location.city AS city, company_location.country AS country FROM company LEFT JOIN company_location ON company_location.company = company.id WHERE company.id = ? AND company_location.billing_adress = 1", [req.decoded.id], (err, rows, results) => {
                if (err) {
                    res.status(410).jsonp(err);
                    next(err);
                } else {
                    if (rows[0]) {
                        let companyInfo = {
                            name: rows[0].name,
                            phone: rows[0].phone,
                            email: rows[0].email,
                            registration_date: rows[0].registration_date,
                            description: rows[0].description,
                            logo: rows[0].logo,
                            background_picture: rows[0].background_picture,
                            street_number: rows[0].street_number,
                            street_name: rows[0].street_name,
                            city: rows[0].city,
                            country: rows[0].country,
                        }
                        /* Adding the schedule of the company if it exists */
                        db.query("SELECT day, am, open, close FROM schedule WHERE company_location = ? ORDER BY day ASC", [rows[0].company_location], (err, rows2, results) => {
                            if(err){
                                res.status(410).jsonp(err);
                                next(err);
                            } else {
                                if(rows2[0]){
                                    companyInfo.schedule = rows2;
                                    res.status(200).jsonp(companyInfo);
                                } else {
                                    res.status(200).jsonp(companyInfo);
                                }
                            }
                        });
                    } else {
                        res.status(404).jsonp("Profile not found!");
                    }
                }
            });
        } else {
            db.query("SELECT company.name AS name, company.phone AS phone, company.email AS email, company.registration_date AS registration_date, company.description AS description, company.logo_link AS logo, company.background_picture AS background_picture, company_location.id AS company_location, company_location.street_number AS street_number, company_location.street_name AS street_name, company_location.city AS city, company_location.country AS country FROM company LEFT JOIN company_location ON company_location.company = company.id WHERE company.id = ? AND company_location.billing_adress = 1", [req.params.companyId], (err, rows, results) => {
                if (err) {
                    res.status(410).jsonp(err);
                    next(err);
                } else {
                    if (rows[0]) {
                        let companyInfo = {
                            name: rows[0].name,
                            phone: rows[0].phone,
                            registration_date: rows[0].registration_date,
                            description: rows[0].description,
                            logo: rows[0].logo,
                            background_picture: rows[0].background_picture,
                            street_number: rows[0].street_number,
                            street_name: rows[0].street_name,
                            city: rows[0].city,
                            country: rows[0].country,
                        }
                        /* Adding the schedule of the company if it exists */
                        db.query("SELECT day, am, open, close FROM schedule WHERE company_location = ? ORDER BY day ASC", [rows[0].company_location], (err, rows2, results) => {
                            if(err){
                                res.status(410).jsonp(err);
                                next(err);
                            } else {
                                if(rows2[0]){
                                    companyInfo.schedule = rows2;
                                    res.status(200).jsonp(companyInfo);
                                } else {
                                    res.status(200).jsonp(companyInfo);
                                }
                            }
                        });
                    } else {
                        res.status(404).jsonp("Profile not found!");
                    }
                }
            });
        }
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

router.put('/api/company/profile/', updateProf, (req, res, next) => {
    try {
        validationResult(req).throw();
        if(req.decoded.type != 'company'){
            res.status(403).jsonp('Access forbidden');
            return 2;
        } else {
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

            db.query("UPDATE company SET ? WHERE id = ?", [companyInfo, req.decoded.id], (err, rows, results) => {
                if (err) {
                    res.status(410).jsonp(err);
                    next(err);
                } else {
                    db.query("UPDATE company_location SET ? WHERE company = ?", [cLocInfo, req.decoded.id], (err, rows, results) => {
                        if (err) {
                            res.status(410).jsonp(err);
                            next(err);
                        } else {
                            res.status(200).jsonp("Company profile updated successfully!");
                        }
                    });
                }
            });
        }
    } catch (err) {
        res.status(400).json(err);
    }
});


let passAuth = [
    check('password').exists(),
    check('previous_password').exists()
];

router.put('/api/company/password', passAuth, midWare.checkToken, (req, res, next) => {
    try {
        validationResult(req).throw();
        if(req.decoded.type != 'company'){
            res.status(403).jsonp('Access forbidden');
            return 2;
        } else {
            const BCRYPT_SALT_ROUNDS = 12;
            let regData = {
                hash_pwd: bcrypt.hashSync(req.body.password, BCRYPT_SALT_ROUNDS),
                salt: BCRYPT_SALT_ROUNDS
            };

            db.query("SELECT * FROM company WHERE id = ?", [req.decoded.id], (err, rows, results) => {
                if (err) {
                    res.status(410).jsonp(err);
                    next(err);
                } else {
                    if (rows[0]) {
                        hashed_pwd = Buffer.from(rows[0].hash_pwd, 'base64').toString('utf-8');
                        if (bcrypt.compareSync(req.body.previous_password, hashed_pwd)) {
                            db.query("UPDATE company SET ? WHERE id = ?", [regData, req.decoded.id], (iErr, iRows, iResult) => {
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
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

/*
router.get('/api/company/location/:companyLocId', midWare.checkToken, (req, res, next) => {
    try {
        db.query("SELECT * FROM company_location INNER JOIN company ON company.id = company_location.companyId INNER JOIN company_location_pictures ON company_location_pictures.company_locationId = company_location.id WHERE company_location.id = ?", [req.decoded.id], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                db.query("SELECT * FROM schedule WHERE company_locationId = ?", [req.body.companyLocId], (sErr, sRows, sResult) => {
                    if (sErr) {
                        res.status(410).jsonp(sErr);
                        next(sErr);
                    } else {
                        if (rows[0]) {
                            companyInfo = {
                                country: rows[0].country,
                                city: rows[0].city,
                                street_name: rows[0].street_name,
                                street_number: rows[0].street_number,
                                logo: rows[0].logo_link,
                                background_picture: rows[0].background_picture,
                                company_location_pictures: [rows[0].picture_link],
                                schedule: [sRows]
                            }
                            res.status(200).jsonp(companyInfo);
                        } else {
                            res.status(404).jsonp("Company information not found!");
                        }
                    }
                });
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


let cpyLocValidate = [
    check('phone').exists(),
    check('siret').exists(),
    check('street_number').exists(),
    check('street_name').exists(),
    check('city').exists(),
    check('country').exists()
];


router.post('/api/company/location', cpyLocValidate, (req, res, next) => {
    try {
        validationResult(req).throw();
        const locData = {
            companyId: req.decoded.id,
            phone: req.body.phone,
            siret: req.body.siret,
            street_number: req.body.street_number,
            street_name: req.body.street_name,
            city: req.body.city,
            country: req.body.country,
            billing_address: 0
        };
        db.query("SELECT * FROM company_location WHERE BINARY siret = ?", [req.body.siret], (err, rows, results) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if (rows[0]) {
                    res.status(410).jsonp("Your SIRET number is already registered !");
                } else {
                    db.query("INSERT INTO company_location SET ?", [locData], (iErr, result) => {
                        if (iErr) {
                            res.status(410).jsonp(iErr);
                            next(iErr);
                        } else {
                            res.status(200).jsonp("Company location added successfully!");
                        }
                    });
                }
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


let upCpyLocValidate = [
    check('phone').exists(),
    check('street_number').exists(),
    check('street_name').exists(),
    check('city').exists(),
    check('country').exists()
];


router.put('/api/company/location/:companyLocId', upCpyLocValidate, (req, res, next) => {
    try {
        validationResult(req).throw();
        const locData = {
            phone: req.body.phone,
            street_number: req.body.street_number,
            street_name: req.body.street_name,
            city: req.body.city,
            country: req.body.country
        };

        db.query("UPDATE company_location SET ? WHERE id = ?", [locData, req.params.companyLocId], (iErr, result) => {
            if (iErr) {
                res.status(410).jsonp(iErr);
                next(iErr);
            } else {
                res.status(200).jsonp("Company location updated successfully!");
            }
        });

    } catch (err) {
        res.status(400).json(err);
    }
});


router.delete('/api/company/location/:companyLocId', midWare.checkToken, (req, res, next) => {
    try {
        validationResult(req).throw();
       
        db.query("DELETE company_location WHERE id = ?", [req.params.companyLocId], (iErr, iResult) => {
            if (iErr) {
                res.status(410).jsonp(iErr);
                next(iErr);
            } else {
                db.query("DELETE company_location_pictures WHERE company_locationId = ?", [req.params.companyLocId], (err, result) => {
                    if (err) {
                        res.status(410).jsonp(err);
                        next(err);
                    } else {
                        res.status(200).jsonp("Company location deleted successfully!");
                    }
                });
            }
        });

    } catch (err) {
        res.status(400).json(err);
    }
});



router.post('/api/company/location/picture/:companyLocId', midWare.checkToken, (req, res, next) => {
    try {
        let locImg = {
            company_locationId: req.params.companyLocId,
            picture_link: req.body.picture
        }
        db.query("INSERT INTO company_location_pictures SET ?", [locImg], (err, result) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                res.status(200).jsonp("Company location picture added successfully!");
            }
        });

    } catch (err) {
        res.status(400).json(err);
    }
});


router.delete('/api/company/location/picture/:companyLocPicId', midWare.checkToken, (req, res, next) => {
    try {
        db.query("DELETE company_location_pictures WHERE id = ?", [req.params.companyLocPicId], (err, result) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                res.status(200).jsonp("Company location picture deleted successfully!");
            }
        });

    } catch (err) {
        res.status(400).json(err);
    }
});
*/
module.exports = router;