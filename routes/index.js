const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    version: 0.1,
    name:"/",
    available: ["device", "log", "map"]
  });
});

module.exports = router;
