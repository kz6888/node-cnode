var express = require('express');
var router = express.Router();
var indexCtrl=require("../controller/indexControllers");


/* GET home page. */
router.get('/',indexCtrl.index);
router.get('/about',indexCtrl.about);
router.get('/api',indexCtrl.api);
router.get('/getstart',indexCtrl.getstart);

router.get('/Mytopic',indexCtrl.Mytopic);

module.exports = router;
 