const router = require('express').Router();

const Assignments = require('../models/assignments.model');

// fixme just for dev. can be removed when finished
function log(data) {
  console.log(data);
  return data;
}

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

router.get('/assignments/:id', (req, res) => {
  const { id } = req.params;

  Assignments.getAssignmentById(id)
    .then((assignment) => {
      if (!assignment) res.status(400).json({ error: 'assignment at given id does not exist' });

      res.json(assignment);
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json({
        error: 'server error occured while trying to retrieve assignments'
      });
    });
});

// create new assignment
router.post('/assignments', (req, res) => {
  console.log(req.body);
});

// delete assignment

// update existing assignment

module.exports = router;
