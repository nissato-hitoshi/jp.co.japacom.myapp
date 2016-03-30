var express = require('express');
var router = express.Router();

/* コントローラー定義の読込 */
var models = require('./controllers/models.api.js');

/* URL マッピング */
// Models用 Restful Web Apiサービス
router.get('/api/:models/:_id', models.one);
router.get('/api/:models', models.query);
router.post('/api/:models', models.save);
router.put('/api/:models/:_id', models.update);
router.delete('/api/:models/:_id', models.delete);

module.exports = router;
