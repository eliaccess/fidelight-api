//require('zone.js/dist/zone-node');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const passport = require('passport');

//const {enableProdMode} = require('@angular/core');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.disable('x-powered-by');


/* Include routes */
const usrAuth = require('./routes/userAuth');
const compAuth = require('./routes/companyAuth');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token,authorization');

  console.log(`${new Date().toString()} => ${req.originalUrl}`);
  next();
});

/* Addings routes to app */
app.use(usrAuth);
app.use(compAuth);


app.use('/', express.static(path.join(__dirname, 'public')));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

//All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

app.use((req, res, next) => {
  res.status(404).jsonp('Unauthorized request!')
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).jsonp('Internal server error!');
});

app.listen(8001, () => {
  console.log('server started port:8001');
});