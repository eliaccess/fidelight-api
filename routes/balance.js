const express = require('express');
const router = express.Router();
const db = require('../modules/dbConnect');
const midWare = require('../modules/middleware');
const { check, validationResult } = require('express-validator');

let cmpBal = [
    check('companyId').exists(),
    midWare.checkToken
];

router.get('/v1/user/balance/:companyId', cmpBal, (req, res, next) => {
    try {
        if(req.decoded.type != 'user'){
            res.status(403).jsonp('Access forbidden');
            return 2;
        }
        validationResult(req).throw();
        db.query("SELECT * FROM balance WHERE id = ? AND companyId = ?", [req.decoded.id, req.params.companyId], (err, rows, result) => {
            if (err) {
                res.status(410).jsonp(err);
                next(err);
            } else {
                if (rows[0]) {
                    res.status(200).jsonp({balance: rows[0].points});
                } else {
                    res.status(404).jsonp("Balance not found!");
                }
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;