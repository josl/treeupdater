#!/usr/bin/env node
'use strict';
var meow = require('meow');
var treeupdater = require('./');

var cli = meow({
  help: [
    'Usage',
    '  treeupdater <input>',
    '',
    'Example',
    '  treeupdater Unicorn'
  ].join('\n')
});

treeupdater(cli.input[0]);
