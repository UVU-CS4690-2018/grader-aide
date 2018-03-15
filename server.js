const assignmentRouter = require('./routes/assignment.routes.js');

const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const path = require('path');
require('./config/config');

let app = express();

// middleware
app.use(logger('dev'));
app.use(helmet());
app.use(express.static('public'));

app.use('/api', assignmentRouter);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}\n`);
});
