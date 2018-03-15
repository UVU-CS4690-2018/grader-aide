const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const mongo = require('mongodb').MongoClient;
const path = require('path');
require('./config/config')

let app = express();

// db connection
// todo setup mongodb connection so that we create a new connection every time the db is used and disconnect every time we finishj
mongo.connect(process.env.MONGODB_URI)
  .then((client) => console.log('connected to db'))
  .catch(console.log)

// middleware
app.use(logger('dev'));
app.use(helmet());
app.use(express.static('public'));

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}\n\n`);
});
