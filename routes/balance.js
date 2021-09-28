const express = require('express');
const router = express.Router();
const db = require('../modules/dbConnect');
const midWare = require('../modules/middleware');
const { check, validationResult } = require('express-validator');


router.get('/v1/user/balance/:companyId', midWare.checkToken, (req, res, next) => {
    try {
        if(req.decoded.type != 'user'){
            res.status(403).jsonp({msg:'Access forbidden'});
            return 2;
        }
        validationResult(req).throw();
        db.query("SELECT * FROM balance WHERE id = ? AND companyId = ?", [req.decoded.id, req.params.companyId], (err, rows, result) => {
            if (err) {
                res.status(410).jsonp({msg:err});
                next(err);
            } else {
                if (rows[0]) {
                    res.status(200).jsonp({data:{points: rows[0].points}, msg:"success"});
                } else {
                    res.status(404).jsonp({msg:"Balance in this company not found!"});
                }
            }
        });
    } catch (err) {
        res.status(400).json({msg:err});
    }
});

module.exports = router;