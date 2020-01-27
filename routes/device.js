const express = require('express');
const router = express.Router();

const db = require('../models/index.js');
const device = db.device;

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
        name:"device",
        available: ["create", "read"]
    });
});

/**
 * Generate a hash for new device
 */
router.post('/create', function(req, res, next) {
    const hash = new Date().getTime().toString(16)  + Math.floor(1000 * Math.random()).toString(16);
    device.create({hash: hash})
        .then(device => {
            res.json({ hash: device.hash });
        });
});

/**
 * Get list of devices recently registered
 */
router.post('/read', function(req, res, next) {
    device.findAll({ attributes: ['id', ['hash', 'device'], 'createdAt'], limit: 10, order:[['id', 'DESC']] })
        .then(device => {
            res.json(device);
        });
});

module.exports = router;