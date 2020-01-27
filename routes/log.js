const express = require('express');
const router = express.Router();

const db = require('../models/index.js');
const deviceLog = db.device_log;
const lightningLog = db.lightning_log;

/**
 * req.body
 *   request bodyのkey-valueペア(body-parser middlewareが必要)
 * req.cookies
 *   cookieのkey-valueペア(cookie-parser middlewareが必要)
 * req.params
 *   url path パラメータの key-value ペア
 *   /books/:idで/books/1の場合req.params.id => 1
 * req.query
 *   リクエストパラメータのkey-valueペア
 *   /books?order=ascの場合req.query.order => asc
 * req.get
 *   HTTPヘッダーの値を取得する
 * req.session
 *   セッションのkey-valueペア(express-session middlewareが必要)
 */

// return api info
router.get('/', function(req, res, next) {
    res.json({
        version: 0.1,
        name:"log",
        available: ["device", "lightning"]
    });
});

/**
 * DEVICE LOG
 */

router.get('/device', function(req, res, next) {
    res.json({
        name:"device",
        available: ["create", "read"]
    });
});

// log device info
router.post('/device/create', function(req, res, next) {

    const hash = req.body.device;
    const lat = req.body.lat;
    const lon = req.body.lon;
    const alt = req.body.alt;
    const point = { type: 'Point', coordinates: [lat, lon, alt]};
    const loggedAt = req.body.loggedAt;

    //TODO: check hash exists

    deviceLog.create(
        {
            device: hash,
            geo: point,
            loggedAt: loggedAt
        })
        .then(device => {
            res.json({ error: 0 });
        });
});

/**
 * Read recent device access log
 */
router.post('/device/read', function(req, res, next) {
    deviceLog.findAll({ attributes: ['id', 'device', 'geo', 'loggedAt'], limit: 10, order:[['id', 'DESC']] })
        .then(device => {
            res.json(device);
        });
});

/**
 * LIGHTNING
 */

router.get('/lightning', function(req, res, next) {
    res.json({
        name:"lightning",
        available: ["create", "read"]
    });
});

router.post('/lightning/create', function(req, res, next) {

    const hash = req.body.device;
    const lat = req.body.lat;
    const lon = req.body.lon;
    const alt = req.body.alt;
    const point = { type: 'Point', coordinates: [lat, lon, alt]};
    const type = req.body.type;
    const energy = req.body.energy;
    const distance = req.body.distance;
    const loggedAt = req.body.loggedAt;

    //TODO: check hash exists

    lightningLog.create(
        {
            device: hash,
            geo: point,
            interrupt_type: type,
            energy: energy,
            distance: distance,
            loggedAt: loggedAt
        })
        .then(device => {
            res.json({ error: 0 });
        });
});

/**
 * get list of recent lightning log
 * curl -X POST http://lightning-detector.herokuapp.com/log/lightning/read/
 */
router.post('/lightning/read', function(req, res, next) {
    lightningLog.findAll({ attributes: ['id', 'device', 'geo', 'interrupt_type','energy', 'distance', 'loggedAt'], limit: 10, order:[['id', 'DESC']] })
        .then(device => {
            res.json(device);
        });
});


module.exports = router;