const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const mongodb = require('mongodb');
const path = require('path');

let app = express();

app.use(logger('dev'));
app.use(helmet());
app.use(express.static('public'));

let portNum = 3000;

app.listen(portNum);

console.log(`Listening on port ${portNum}...\n\n`);
