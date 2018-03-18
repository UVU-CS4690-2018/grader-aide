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

router.post('/assignments', (req, res) => {
  Assignments.createAssignment(req.body)
    .then((assignmentId) => {
      res.json({ assignmentId });
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json({
        error: 'unable to create assignment'
      });
    });
});

router.delete('/assignments/:id', (req, res) => {
  const { id } = req.params;

  Assignments.destroyAssignment(id)
    .then(log)
    .catch((err) => {
      console.log(err);

      res.status(500).json({
        error: 'unable to remove assignment'
      });
    });
});

router.put('/assignments/:id', (req, res) => {
  const { id } = req.params;

  Assignments.udpateAssignmentById(id, req.body)
    .then(() => res.status(204).send())
    .catch((err) => {
      console.log(err);

      res.status(500).json({
        error: 'unable to udpate assignment'
      });
    });
});

module.exports = router;
