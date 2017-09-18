var multer=require("multer");
var timeStamp=require("time-stamp");
var uId=require("uid");
var path=require("path");


function uploadFile(filename,savepath){
  // form上面加过表名文件上传的属性,可以跟body-parser共用
  //form上面加过表名文件上传的属性,必须配置完全,在upload req,获取其他表单的值
	// filename 表单上面name
	// savepath 图片保存路径
// console.log(uId(10)); 生成10位随机子串
// console.log(timeStamp("YYYYMMDD")); 年月日

var storage = multer.diskStorage({
// 存到哪?
  destination: function (req, file, cb) {
    cb(null, savepath)
  },
  // 设置上传文件名
  filename: function (req, file, cb) {
  
    var ext=path.extname(file.originalname);
    cb(null,timeStamp("YYYYMMDD")+uId(10)+ext);
  }
});

function fileFilter (req, file, cb) {

var allType=["image/jpeg","image/png","image/gif"];
// -1就是没有配置成功
if(allType.indexOf(file.mimetype)=="-1"){
 
  var err=new Error();
   err.code="类型不匹配";

  cb(err);
  
  cb(null, false);
}else{
  cb(null, true)
}

};

var upload=multer({
	storage:storage,
  fileFilter:fileFilter,
  limits:{
  	// 文件大小过滤
  	fileSize:1024*500
  }
}).single(filename);
return upload
}
module.exports=uploadFile;