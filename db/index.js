const mongoClient = require('mongodb').MongoClient;

// holds global instance of db connection
state = {
  db: null
};

// takes the name of a collection and returns a connection to that collection on mlab dev db
async function connect() {
  const client = await mongoClient.connect(process.env.MONGODB_URI);

  // right now just hardcoding dev database
  state.db = client.db('grader-aide-dev');
}

// returns db connection itself if you do not want to specift a collection
function get() {
  return state.db;
}

// returns a database collection (table) to perform operations on
function collection(c) {
  return state.db.collection(c);
}

async function close() {
  if (!state.db) return;

  await state.db.close();

  state.db = null;
}

module.exports = { connect, get, collection, close };
