const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookParser = require("cookie-parser");
const logger = require("morgan");
const webpack = require("webpack");
const indexRoute = require("./app/routes/server.index.route.js");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackConfig = require("./webpack.config.js");
const compiler = webpack(webpackConfig);

/*---------实例化express----------*/
const app = express();

/*----------wepback自动打包、刷新浏览器--------------*/
app.use(webpackDevMiddleware(compiler, {
	publicPath: webpackConfig.output.publicPath,
	noInfo: true,
	stats: {
		colors: true
	}
}));
app.use(webpackHotMiddleware(compiler));


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

/*---------添加路由------------*/
app.use("/", indexRoute);

/*---------捕获404错误------------------*/
app.use((req,res,next)=>{
	let err = new Error("Error: 404, the source is not found!");
	err.status = 404;
	next(err);
});

/*---------捕获500错误----------------*/
app.use((err, req, res, next)=>{
	console.log(err);
	res.status(err.status || 500).send(err.status == "404" ? err.message : "Error: 500, server error");
	next();
});

module.exports = app;