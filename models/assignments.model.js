const db = require('../db');

async function getAssignments() {
  const collection = db.collection('assignments');

  return await collection.find({}).toArray();
}

async function getAssignmentById(_id) {
  const collection = db.collection('assignments');

  return await collection.findOne({ _id });
}

module.exports = { getAssignments, getAssignmentById };
