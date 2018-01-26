const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookParser = require("cookie-parser");
const logger = require("morgan");


/*---------实例化express----------*/
const app = express();

/*---------打印请求日志-------------*/
app.use(logger("dev"));

/*---------配置静态资源路径----------*/
app.use(express.static(path.join(__dirname, "dist/")));

/*---------解析cookie-------------*/
app.use(cookParser());

/*---------解析application/json格式数据--------*/
app.use(bodyParser.json());

/*---------解析application/x-www-form-urlencoded格式数据---------*/
app.use(bodyParser.urlencoded({extended: false}));

/*---------捕获404错误------------------*/
app.use((req,res,next)=>{
	let err = new Error("Error: 404, the source is not found!");
	err.status = 404;
	next(err);
});

/*---------捕获500错误----------------*/
app.use((err, req, res, next)=>{
	res.status(err.status || 500).send(err.status == "404" ? err.message : "Error: 500, server error");
	next();
});

module.exports = app;