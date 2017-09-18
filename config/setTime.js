function getT(time){
	console.log(time);
	// 函数执行获取当前时间戳
	var now=new Date().getTime();

	var time=Math.floor((now-time)/1000);
	console.log(time);
	var timer="";
	if(time<10){
		timer="刚刚"; 
	}else if(time<60){
		timer=time+"秒前";
	}else if((time/60)<60){
		var m=Math.floor(time/60);
		timer=m+"分钟前"
	}else if((time/60/60)<24){
		var h=Math.floor(time/60/60);
		timer=h+"小时前"
	}else if((time/60/60/24)<30){
		var d=Math.floor(time/60/60/24);
		timer=d+"天前"
	}else if((time/60/60/24/30)<12){
		var y=Math.floor(time/60/60/24/30);
		timer=y+"月前";
	}else{
		var year=Math.floor(time/60/60/24/30/12);
		timer=year+"年前";
	}
	
	return timer;
}
module.exports=getT;



