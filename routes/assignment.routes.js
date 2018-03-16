const router = require('express').Router();

const db = require('../db');

router.get('/assignment', function(req, res) {
  db
    .connect('assignments')
    .then((collection) => collection.find({}).toArray())
    .then(res.json.bind(res))
    .catch(console.log);
});

module.exports = router;
