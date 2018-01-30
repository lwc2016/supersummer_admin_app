module.exports = (req,res,next)=>{
	if(req.body.api !== "/user/login" && (!req.cookies.token || !req.cookies.uid)){
		return res.json({code: 1005, errorMsg: "请重新登录", from: "node server"});
	}else{
		next();
	}
};