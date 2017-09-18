var mongoose=require("mongoose");

var url="mongodb://localhost:27017/cnode_h530";
mongoose.connect(url,function(err){
	if(err){console.log(err);return}
	console.log("链接数据库成功");
})
module.exports=mongoose;