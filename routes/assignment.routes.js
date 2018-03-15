const router = require('express').Router();

const db = require('../db/mongo');

router.get('/assignment', function(req, res) {
  console.log(db);
  //db()
  // .then(console.log)
  // .catch(console.log);
});

module.exports = router;
