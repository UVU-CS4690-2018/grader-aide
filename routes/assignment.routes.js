const router = require('express').Router();

const Assignments = require('../models/assignments.model');

router.get('/assignments', function(req, res) {
  Assignments.getAssignments()
    .then(res.json.bind(res))
    .catch((err) => {
      console.log(err);

      res.status(500).json({
        error: 'server error occured while trying to retrieve assignments'
      });
    });
});

// get assignment by id

// create new assignment

// delete assignment

// update existing assignment

module.exports = router;
