/**
 * Created by Стас on 05.12.2017.
 */
const express = require('express');
let httpApp = express();

httpApp.get('*', function(req, res, next) {
  if (req.secure) {
    next();
  } else {
    res.redirect('https://' + req.headers.host + req.url);
  }
});

module.exports = httpApp;
