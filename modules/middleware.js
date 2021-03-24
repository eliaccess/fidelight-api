let jwt = require('jsonwebtoken');
const config = require('./secret');

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

  

  if (token) {
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).jsonp('Unauthorized access!');
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).jsonp('Invalid request... Authentication missing');
  }
};

module.exports = {
  checkToken: checkToken
}