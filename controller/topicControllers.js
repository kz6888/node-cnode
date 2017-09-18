var topicModel=require("../models/topicModel");
var topicType=require("../models/topictype");
var replyModel=require("../models/replyModel");
// 深度回调模块
var Eventproxy=require("eventproxy");
var ep=new Eventproxy();


var obj={};
// 创建一个话题
obj.create=function(req, res, next) {
	topicType.find(function(err,topicType){
	  res.render("home/topic",{topicType:topicType});
	}).sort({order:1})
};
// 提交话题内容
obj.docreate=function(req,res){
	
topicModel.create(req.body,function(err,info){
	if(!err){
		res.redirect("/topic/show/"+info._id);
	}
})
	
}


obj.show=function(req,res){
	// 话题ID
	var con1={
		_id:req.params.tid
	}
	var con2={
		tid:req.params.tid
	}
	// 查询话题模型(详情页)
	ep.all("momoda","topic","reply",function(momoda,topic,reply){
		res.render("home/show",{topic:topic,reply:reply});
	})
	
// 浏览量
topicModel.update(con1,{$inc:{viewNum:1}},function(err){
		if(err){console.log(err)}
		ep.emit("momoda");
})
//当前话题模型的数据
topicModel.findOne(con1).populate("uid",{uname:1,glob:1,mark:1,userIco:1}).exec(function(err,topic){
	ep.emit("topic",topic);
});
//查询回复模型数据

// 条件是话题ID tid
replyModel.find(con2).populate("uid",{uname:1,userIco:1}).exec(function(err,reply){
	ep.emit("reply",reply);
});







}


/*回复话题*/

obj.reply=function(req,res){
// 通过隐藏表单
	var con={_id:req.body.tid};

	// {reply:1} 只要 reply这个值
	topicModel.findOne(con,{reply:1},function(err,rel){
		// 只是查reply 这数组
		// 我们操作,回复模型
			var data={
				// 回复的内容
				content:req.body.content,
				uid:req.session.user._id,
				tid:req.body.tid,
				lou:rel.reply.length+1
			}
			// 回复模型:
			replyModel.create(data,function(err,info){
				// 数据库操作只有创建的返回值有用(数据库里面内容)
				if(err){console.log(err);return}

				// mongodb里面操作值为数组类型的键
				var newData={
					$push:{
						reply:info._id
					},
					// 永远覆盖上一次记录
					lastUser:req.session.user._id,
					lastTime:new Date()
				}
				// 将话题模型 reply更新
				topicModel.update(con,newData,function(err){
					if(err){console.log(err);return}
					// 我讲接力棒给show
					res.redirect("back");
				})
			})
	})
	// 前台数据
	// { content: '<p>测试回复</p>', tid: '599e8bf7f1fffb0cb4accffd' }
/* content:String,


//回复时间
  retime:{
    type:Date,
    default:Date.now
  },
  uid:{
  	type:"ObjectId",
  	ref:"userModel"
  },
  // 话题ID关联话题模型
  tid:{
    type:"ObjectId",
    ref:"topicModel"
  },
  lou:Number*/

	// console.log(req.body);
	// res.send("OK");
}
module.exports=obj;