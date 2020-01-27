const express = require('express');
const router = express.Router();

// use database
const db = require('../models/index.js');
const deviceLog = db.device_log;
const lightningLog = db.lightning_log;

/* root */
router.get('/', function(req, res, next) {
    res.json({
        version: 0.1,
        name:"/",
        available: ["devices", "lightnings"]
    });
});

/**
 * DEVICE MAP
 */
router.get('/devices', function(req, res, next) {
    const query =
        'SELECT * FROM device_logs AS dl1' +
        ' WHERE EXISTS' +
        '   (SELECT * FROM (SELECT device, MAX("loggedAt") AS logged_at FROM device_logs GROUP BY device) AS dl2' +
        '     WHERE dl1.device=dl2.device AND dl1."loggedAt" = dl2.logged_at)' +
        ' ORDER BY dl1."loggedAt" DESC';

    db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT})
        .then( devices => {
            res.render('deviceMap', {
                title: 'Device Map',
                apiKey: process.env.GOOGLE_API_KEY,
                devices: devices,
            });
        });
});

/**
 * LIGHTNING MAP
 */
router.get('/lightnings', function(req, res, next) {
    const query =
        'SELECT * FROM lightning_logs AS ll1' +
        // ' WHERE ll1."loggedAt" > (NOW() - INTERVAL \'24 HOURS\')' +
        ' ORDER BY ll1."loggedAt" DESC LIMIT 100';

    db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT})
        .then( lightnings => {
            res.render('lightningMap', {
                title: 'Lightning History',
                apiKey: process.env.GOOGLE_API_KEY,
                lightnings: lightnings,
            });
        });
});

module.exports = router;
