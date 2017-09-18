var mongoose=require("../config/db_config");

// console.log(mongoose);
 var typeSchema=new mongoose.Schema({
 	topicTypeName:String,
 	order:Number

 },{versionKey:false});

 var topicType=mongoose.model("topicType",typeSchema,"topicType");
 module.exports=topicType;



/*
手动添加数据
var arr=[
	{"name":"分享"},
	{"name":"招聘"},
	{"name":"客户端测试"}
];
arr.forEach(function(item,index){
var obj={topicTypeName:item.name,order:index};
	topicType.create(obj,function(err){
		if(err){console.log(err)}
	})
})
*/