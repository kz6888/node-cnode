var express = require('express');
var router = express.Router();
var topicCtrl=require("../controller/topicControllers");
var userCheck=require("../config/userCheck");
// 话题模型
router.get('/create',userCheck,topicCtrl.create);
router.post('/docreate',userCheck,topicCtrl.docreate);
router.get('/show/:tid',topicCtrl.show);

//回复模型
router.post('/reply',userCheck,topicCtrl.reply);




module.exports = router;
