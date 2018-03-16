const mongoClient = require('mongodb').MongoClient;

// takes the name of a collection and returns a connection to that collection on mlab dev db
function connect(collection) {
  return mongoClient
    .connect(process.env.MONGODB_URI)
    .then((client) => client.db('grader-aide-dev'))
    .then((db) => db.collection(collection));
}

function close() {}

module.exports = { connect };
