let jwt = require('jsonwebtoken');
require('dotenv').config();
const config = require('./secret');

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

  if (token) {
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        if(err.name == 'TokenExpiredError') return res.status(401).jsonp({msg:'Your token expired.'});
        else return res.status(403).jsonp({msg:'Unauthorized access.'});
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).jsonp({msg:'Authentication missing'});
  }
};

module.exports = {
  checkToken: checkToken
};