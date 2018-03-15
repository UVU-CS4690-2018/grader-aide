const mongo = require('mongodb').MongoClient;

module.exports = mongo.connect(process.env.MONGODB_URI);
