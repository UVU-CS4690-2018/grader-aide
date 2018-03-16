const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const path = require('path');

// controllers/routes
const assignmentRouter = require('./routes/assignment.routes.js');

// db
const db = require('./db');

// load .env variables
require('./config/config');

let app = express();

// middleware
app.use(logger('dev'));
app.use(helmet());
app.use(express.static('public'));

app.use('/api', assignmentRouter);

const port = process.env.PORT || 3001;

db
  .connect()
  .then(() => {
    console.log('\nconnection to database established\n');

    app.listen(port, () => {
      console.log(`Listening on http://localhost:${port}\n`);
    });
  })
  .catch((err) => {
    console.log('\nUnable to establish connection to the database\n');
    console.log(err);
    process.exit(1);
  });
