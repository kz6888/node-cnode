var express = require('express');
var router = express.Router();
var userCtrl=require("../controller/userControllers");
var userCheck=require("../config/userCheck");

/* GET users listing. */
// 在这的分之前面都要加users
// 注册
router.get('/reg',userCtrl.reg);
router.post('/doreg',userCtrl.doreg);
// 邮箱验证
router.get('/active',userCtrl.active);
// :uid是一个变量路径
router.get('/activeok/:uid',userCtrl.activeok);


// 登陆开始
router.get('/login',userCtrl.login);
router.post('/dologin',userCtrl.dologin);

// 设置
router.get('/setting',userCheck,userCtrl.setting);
router.post('/dosetting',userCheck,userCtrl.dosetting);
router.post('/doosetting',userCheck,userCtrl.doosetting);

// 退出
router.get('/signout',userCtrl.signout);


 


module.exports = router;
