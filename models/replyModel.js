var mongoose=require("../config/db_config");
// console.log(mongoose);
 var replySchema=new mongoose.Schema({
  // 回复内容
  content:String,


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
  lou:Number
 },{versionKey:false});

 var replyModel=mongoose.model("replyModel",replySchema,"replyModel");
 module.exports=replyModel;