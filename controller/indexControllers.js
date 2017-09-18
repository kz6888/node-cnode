var topicModel=require("../models/topicModel");
var topicType=require("../models/topictype");
var replyModel=require("../models/replyModel");
// 深度回调模块
var Eventproxy=require("eventproxy");
var ep=new Eventproxy();


var obj={};

obj.Mytopic=function(req,res){
	
	 
	// console.log(req.session.user._id)
	var co={uid:req.session.user._id};

	topicModel.find(co).count(function(err,num){
// 分页
	var page=req.query.page?req.query.page:1;
	var pageNum=8;
	// 可以分多少页
	var pageMax=Math.ceil(num/pageNum);
	// 小于1 赋值为一
	//页码
	if(page<=0){
		page=1;
	}
	 
	if(page>=pageMax){
		page=pageMax;
	}
	var pageOffset=(page-1)*pageNum;
	
	// console.log(co)
	topicModel.find(
				co,//条件
				{},//显示那个字段{uname:1}
				{
					sort:{
						retime:-1
					},skip:pageOffset,limit:pageNum
				}//最后参数{sort:{}}
				).populate("uid").populate("lastUser",{userIco:1}).exec(function(err,dd){
				if(err){console.log(err);return}
				res.render("home/Mytopic",{dd:dd,page:page,pageMax:pageMax});
			})



	
	
})


	
}
 
obj.about=function(req,res){
	res.render("home/about")
}
obj.api=function(req,res){
	res.render("home/api")
}
obj.getstart=function(req,res){
	res.render("home/getstart")
}
// 查询话题模型
// 

obj.index=function(req,res){

 	console.log(req.body)


// 1.查询总条数
topicModel.find().count(function(err,num){
// 分页
	var page=req.query.page?req.query.page:1;
	var pageNum=8;
	// 可以分多少页
	var pageMax=Math.ceil(num/pageNum);
	// 小于1 赋值为一
	//页码
	if(page<=0){
		page=1;
	}
	 
	if(page>=pageMax){
		page=pageMax;
	}
	var pageOffset=(page-1)*pageNum;
	var tab=req.query.tab;
		if(req.query.tab){
				if(tab=="share"){
				topicModel.find(
				{tab:0},//条件
				{},//显示那个字段{uname:1}
				{
					sort:{
						retime:-1
					},skip:pageOffset,limit:pageNum
				}//最后参数{sort:{}}
				).populate("uid").populate("lastUser",{userIco:1}).exec(function(err,topic){
				if(err){console.log(err);return}
				res.render("index",{topic:topic,page:page,pageMax:pageMax,tab:tab});
			})
		}else if(tab=="Ask"){
			topicModel.find(
				{tab:2},//条件
				{},//显示那个字段{uname:1}
				{
					sort:{
						retime:-1
					},skip:pageOffset,limit:pageNum
				}//最后参数{sort:{}}
				).populate("uid").populate("lastUser",{userIco:1}).exec(function(err,topic){
				if(err){console.log(err);return}
				res.render("index",{topic:topic,page:page,pageMax:pageMax,tab:tab});
			})
		}else if(tab=="job"){
			topicModel.find(
				{tab:1},//条件
				{},//显示那个字段{uname:1}
				{ 
					sort:{
						retime:-1
					},skip:pageOffset,limit:pageNum
				}//最后参数{sort:{}}
				).populate("uid").populate("lastUser",{userIco:1}).exec(function(err,topic){
				if(err){console.log(err);return}
				res.render("index",{topic:topic,page:page,pageMax:pageMax,tab:tab});
			})
		}else if(tab=="client"){
			topicModel.find(
				{tab:3},//条件
				{},//显示那个字段{uname:1}
				{
					sort:{
						retime:-1
					},skip:pageOffset,limit:pageNum
				}//最后参数{sort:{}}
				).populate("uid").populate("lastUser",{userIco:1}).exec(function(err,topic){
				if(err){console.log(err);return}
				res.render("index",{topic:topic,page:page,pageMax:pageMax,tab:tab});
			})
		}else{
				topicModel.find(
				{},//条件
				{},//显示那个字段{uname:1}
				{
					sort:{
						retime:-1
					},skip:pageOffset,limit:pageNum
				}//最后参数{sort:{}}
				).populate("uid").populate("lastUser",{userIco:1}).exec(function(err,topic){
				if(err){console.log(err);return}
				res.render("index",{topic:topic,page:page,pageMax:pageMax,tab:tab});
			})
		}

}else{
	console.log("OK")
	topicModel.find(
				{},//条件
				{},//显示那个字段{uname:1}
				{
					sort:{
						retime:-1
					},skip:pageOffset,limit:pageNum
				}//最后参数{sort:{}}
				).populate("uid").populate("lastUser",{userIco:1}).exec(function(err,topic){
				if(err){console.log(err);return}
				res.render("index",{topic:topic,page:page,pageMax:pageMax,tab:tab});
			})
}


	
	
})



}

module.exports=obj;