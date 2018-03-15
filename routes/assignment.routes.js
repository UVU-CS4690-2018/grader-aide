const router = require('express').Router();

router.get('/assignment', function(req, res) {
  res.json({
    assignmentID: '3b706b34-8bc4-4b30-aea7-9a3f9018f8fc',
    assignmentName: 'Lab 1',
    totalPts: 150,
    rules: [
      {
        id: 'ce5e019c-44e7-4c75-8309-496599bd7c64',
        pts: -1,
        desc: 'Test test test',
        checked: false
      },
      {
        id: '1678d1d2-fdec-41c7-8982-3d7e42eb4c99',
        pts: -5,
        desc: 'Hello World',
        checked: false
      },
      {
        id: 'bd2ab547-10c9-45e0-8169-c8e7355a5e4e',
        pts: 1,
        desc: 'Extra credit',
        checked: false
      }
    ],
    comments: [
      {
        id: '4163d23c-6bff-43ea-90b4-751012e52582',
        desc: 'This is comment one',
        checked: false
      },
      {
        id: '006bfd49-04de-408c-8817-b5733777fb23',
        desc: 'lorem ipsum',
        checked: false
      },
      {
        id: '241a2814-ec4f-448c-a8d8-6ebb7d4b35a2',
        desc: 'A bird in the hand is worth two in the bush',
        checked: false
      }
    ]
  });
});

module.exports = router;
