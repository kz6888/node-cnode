var crypto=require("crypto");

module.exports=function(str){
	var str=str.toString();
	// md5与加密update是一起执行的
	var  md5 = crypto.createHash('md5');
	var password=md5.update(str).digest("base64");
	return password;
}


