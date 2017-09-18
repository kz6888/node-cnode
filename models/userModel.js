var mongoose=require("../config/db_config");
// console.log(mongoose);
 var userSchema=new mongoose.Schema({
 	uname:{
 		type:String,
 		unique:true
 	},
 	petname:String,
 	upwd:String,
 	email:{
 		type:String,
 		unique:true
 	},
 	mark:{
 		type:String, 
 		default:""
 	},
 	userIco:{
 		type:String,
 		default:""
 	},
 	glob:{
 		type:Number,
 		default:20
 	},
 	regtime:{
 		type:Date,
 		default:new Date()
 	},
 	logintime:{
 		type:Date,
 		default:new Date()
 	},
 	active:{
 		type:Number,
 		default:0
 	}
 },{versionKey:false});

 var userModel=mongoose.model("userModel",userSchema,"userModel");
 module.exports=userModel;