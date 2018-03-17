const db = require('../db');
const ObjectId = require('mongodb').ObjectID;

async function getAssignments() {
  const collection = db.collection('assignments');

  return await collection.find({}).toArray();
}

async function getAssignmentById(_id) {
  const collection = db.collection('assignments');

  return await collection.findOne({ _id: ObjectId(_id) });
}

async function createAssignment(assignment) {
  const collection = db.collection('assignments');

  const { result, insertedId } = await collection.insertOne(assignment);

  if (!result.ok) throw new Error('unable to save assignment');

  return insertedId;
}

async function destroyAssignment(_id) {
  console.log('id from request', _id);
  const collection = db.collection('assignments');

  return await collection.deleteOne({ _id: ObjectId(_id) });
}

module.exports = { getAssignments, getAssignmentById, createAssignment, destroyAssignment };
