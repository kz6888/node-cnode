var mongoose=require("../config/db_config");
// console.log(mongoose);
 var topicSchema=new mongoose.Schema({
 		 // tab: '1',
  // title: '北京你好你好',
  // content: '<p>内容<img src="http://img.baidu.com/hi/jx2/j_0016.gif"/><img src="http://img.baidu.com/hi/jx2/j_0016.gif"/><img src="http://img.baidu.com/hi/jx2/j_0016.gif"/><img src="http://img.baidu.com/hi/jx2/j_0016.gif"/><img src="http://img.baidu.com/hi/jx2/j_0016.gif"/><img src="http://img.baidu.com/hi/jx2/j_0016.gif"/><img src="http://img.baidu.com/hi/jx2/j_0016.gif"/><img src="http://img.baidu.com/hi/jx2/j_0016.gif"/><img src="http://img.baidu.com/hi/jx2/j_0016.gif"/><img src="http://img.baidu.com/hi/jx2/j_0016.gif"/><img src="http://img.baidu.com/hi/jx2/j_0016.gif"/></p>',
  // uid: '599bcd2645f45e0f80fe3960'
  tab:String,
  title:String,
  content:String, 
  viewNum:{
    type:Number,
    default:0
  },
  retime:{
    type:Date,
    default:Date.now 
  },
  
  uid:{
  	type:"ObjectId",
  	ref:"userModel"
  },
  order:{
    type:'ObjectId',
    ref:"topicType"
  },
  reply:[{
    type:"ObjectId"
  }],
  lastUser:{
    type:'ObjectId',
    ref:'userModel',
    default:null
  },
   lastTime:{
    type:Date,
    default:null
  }
 },{versionKey:false});

 var topicSchema=mongoose.model("topicModel",topicSchema,"topicModel");
 module.exports=topicSchema;