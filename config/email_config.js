var nodemailer = require('nodemailer'); 
function send(uname,uid,email){
var transporter = nodemailer.createTransport({  
  host: 'smtp.qq.com',  
  auth: {  
    user: '348192549@qq.com', //配置邮箱账号 
    pass: 'zgnzxbdmisjtcaah' //授权码,通过QQ获取  
  }  
  });  
// 定义传输内容
  var mailOptions = {  
    from: 'XDL_CNODE<348192549@qq.com>', // 发送者, <邮箱格式要加尖括号> 
    to:email, // 接受者,可以同时发送多个,以逗号隔开  
    subject: 'h530_cnode邮箱验证', // 标题  
    //text: 'Hello world', // 文本  
    html: "欢迎"+uname+"注册CNode<a href='http://127.0.0.1/users/activeok/"+uid+"'>跳转</a>" 
  };  
  
  transporter.sendMail(mailOptions, function (err, info) {  
      
    if (err) {  
      console.log(err);  
      return;  
    } 
    console.log(info); 
    console.log('发送成功');  
  });  
} 



   module.exports=send;