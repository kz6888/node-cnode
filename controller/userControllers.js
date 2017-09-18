var userModel=require("../models/userModel");
var fileUp=require("../config/file_upload");
var crypto=require("../config/crypto");
var timeStamp=require("time-stamp");
var send=require("../config/email_config")

var obj={};

 
obj.reg=function(req, res, next) {
  res.render("home/reg");
};
obj.doreg=function(req, res, next) {
	
var con={
	uname:req.body.uname
}
	userModel.findOne(con,function(err,data){ 
		if(data){
			// console.log("用户名重复")
			req.flash("errMsg","用户名重复");
			res.redirect("/users/reg");
			return;
		}else{
			if(req.body.upwd===req.body.testpwd){
				// console.log(req.body);
				var newCon={ 
					uname:req.body.uname,
					petname:req.body.petname,
					email: req.body.email,
					upwd:crypto(req.body.upwd),
					mark:req.body.mark
				}
				userModel.create(newCon,function(err,info){
					// console.log(info);
					// console.log(err);
					send(req.body.uname,info._id,req.body.email)
					res.redirect("/users/active");
				})
				
				return;
			}else{
				req.flash("errMsg","密码不一致");
				res.redirect("/users/reg");
				return;
			}
		}
	})
};
obj.active=function(req,res){
	res.render("home/active");
}


obj.activeok=function(req,res){

	console.log(req.params.uid);
 
	var con={
		_id:req.params.uid
	}
	userModel.update(con,{active:1},function(err){
		if(err)console.log(err);
		res.redirect("/users/login");
	})

}

obj.login=function(req,res){
	res.render("home/login");
}
obj.dologin=function(req,res){
	// res.render("home/login");
	var con={
		uname:req.body.uname
	}
	userModel.find(con,function(err,data){
		// find查询出来的数据是一个数组类型
		//findOne查出的数据是对象
		if(data.length===0){
			req.flash("errMsg","用户不存在");
			res.redirect("/users/login");
			return;
		}else{
			if(data[0].upwd===crypto(req.body.upwd)){
				// 我把用户信息全部挂载到session上的user
				req.session.user=data[0];
			}else{
				req.flash("errMsg","密码错误");
				res.redirect("/users/login");
				return;
			}
		}

	/*	if(data.active==0){
			req.flash("errMsg","请到邮箱完成激活");
			res.redirect("back");
			return;
		}*/

		var logintime=data[0].logintime;
		var now=new Date();
		var loginTimeStr=timeStamp("YYYY",logintime)+timeStamp("MM",logintime)+timeStamp("DD",logintime);
		var newTime=timeStamp("YYYY",now)+timeStamp("MM",now)+timeStamp("DD",now);
		var glob=data[0].glob;
	

		
		if((newTime-loginTimeStr)>=1){
			glob+=10;
		}
		var newData={
			logintime:new Date(),
			glob:glob
		}

		var uid={
			_id:data[0]._id
		}
		
		userModel.update(uid,newData,function(err){
			res.redirect("/");
		})
	
		
	})

}
obj.signout=function(req,res){
	req.session.user=null;
	res.redirect("/");
}
obj.setting=function(req,res){
	res.render("home/setting");
}
obj.dosetting=function(req,res){
	var con={
		_id:req.session.user._id
	}

	
var upload=fileUp("up_file","public/usericos");

		upload(req,res,function(err){

			if(err){

				switch(err.code){
					case "类型不匹配":
					res.send(err.code);
					return;
					break;
					case "LIMIT_FILE_SIZE":
					res.send("超出文件大小限制");
					return;
					break;
				}
			}

			var newCon={
				mark:req.body.mark
			}
			if(req.file){
				newCon.userIco=req.file.filename;
				userModel.update(con,newCon,function(err){
					if(err){console.log(err);return}
					console.log("success");
					userModel.findOne(con,function(err,data){
						req.session.user=data;
						// resizeImg("public/usericos/"+data.userIco,"public/usericos/"+data.userIco,width,height,callback)
						res.redirect("back");
						return;
						// back 从哪来回那去
					})
				})	
				
			}else{
				userModel.update(con,newCon,function(err){
					if(err){console.log(err);return}
					console.log("success");
					userModel.findOne(con,function(err,data){
						req.session.user=data;
						res.redirect("back");
						return;
						// back 从哪来回那去
					})
					
				})
			}


		})

}

obj.doosetting=function(req,res){
	var con={
		_id:req.session.user._id
	}
	var co={
		upwd:crypto(req.body.new_pass)
	}
	console.log(crypto(req.body.old_pass))
	
	
	if(crypto(req.body.old_pass)==req.session.user.upwd){
		userModel.update(con,co,function(err){
			req.session.user=null;
			res.redirect('/users/login')
			return;
		})
		
	}else{
		
		req.flash("errMsg","与原密码不符");
		res.redirect("back");
		return;
	}
	
}
module.exports=obj;