const db = require('../db');

async function getAssignments() {
  const collection = db.collection('assignments');

  return await collection.find({}).toArray();
}

module.exports = { getAssignments };
