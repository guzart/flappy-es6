'use strict';

var fs = require('fs');

fs.readdirSync('./gulp/tasks/')
  .forEach(function (file) {
    require('./tasks/' + file);
  });
