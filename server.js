console.log('\nLoading Server');

// load modules
let express = require('express');
let logger = require('morgan');
let compression = require('compression');
let favicon = require('serve-favicon');
let bodyParser = require('body-parser');
let path = require('path');
let helmet = require('helmet');

let app = express();

// express middleware
app.use(logger('dev'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(compression());
//for mime type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
//for mime type application/json
app.use(bodyParser.json());
app.use(helmet());

//TODO handle REST stuff now

app.use(express.static(`${__dirname}/public`)); 

app.get('*', function(req, res) {
  res.status(404).send(`Tim asked for a file that doesn't exist. You are a hoser.`)
  
})


app.listen(8080);