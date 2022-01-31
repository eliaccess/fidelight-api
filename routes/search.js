const express = require('express');
const {format} = require('util');
const router = express.Router();
const db = require('../modules/dbConnect');
const midWare = require('../modules/middleware');
const { check, validationResult } = require('express-validator');


/* Get all companies from a city, name, and/or type */
router.get('/v1/search/company/parameters', midWare.checkToken, (req, res, next) => {
    try {
        /* supported parameters :
         * - name : name / part of the name of the company
         * - type : type of the company
         * - city : city where the company is based
         * - page : to get by 10 more restaurants (page 1 is the first 10, page 2 is the next 10 ...)
         */
        
        let parameters = {
            city: req.query.city ? req.query.city : null,
            name: req.query.name ?  '%' + req.query.name + '%' : null,
            type: req.query.type ? req.query.type : null,
            page_p1: req.query.page ? req.query.page * 10 - 10 : 0,
            page_p2: req.query.page ? req.query.page * 10 : 10
        }

        if(parameters.city == null && parameters.name == null && parameters.type == null){
            res.status(400).jsonp({msg:"To make a research, please provide at least one parameter."});
        } else {
            db.query("SELECT company.id AS id, company.company_type AS typeId, company.name AS name, company.logo_link AS logoUrl, company.description AS description, company_location.street_number AS streetNumber, company_location.street_name AS streetName, company_location.city AS city FROM company INNER JOIN company_location ON company_location.company = company.id WHERE (company_location.city = ? OR ? IS NULL) AND company.active = 1 AND company.verified = 1 AND (company.name LIKE ? OR ? IS NULL) AND (company.company_type = ? OR ? IS NULL) ORDER BY company.registration_date ASC LIMIT ?, ?", [parameters.city, parameters.city, parameters.name, parameters.name, parameters.type, parameters.type, parameters.page_p1, parameters.page_p2], (err, rows, results) => {
                if (err) {
                    res.status(410).jsonp({msg:"An error has occured. Please contact our support or try again later."});
                    next(err);
                } else {
                    if (rows[0]) {
                        const bucketName = "fidelight-api";
                        var counter = 0;
                        rows.forEach(company => {
                            if(company.logoUrl == null){
                            } else {
                                rows[counter].logoUrl = format(
                                    `https://storage.googleapis.com/${bucketName}/${company.logoUrl}`
                                );
                            }
                            counter++;
                        });
                        res.status(200).jsonp({data: rows, msg: "Research done."});
                    } else {
                        res.status(404).jsonp({msg:"Company not found!"});
                    }
                }
            });
        }        
    } catch (err) {
        res.status(400).json({msg:"An error has occured. Please contact our support or try again later."});
        next(err);
    }
});

module.exports = router;