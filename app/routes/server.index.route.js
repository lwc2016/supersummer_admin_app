const express = require("express");
const path = require("path");
const config = require("../../config/env.config.js");
const router = express.Router();
const request = require("request");

const paths = ["/", "/backoffice"];
router.get(paths, (req,res,next)=>{
	res.sendFile(path.join(__dirname, "../views/index.html"));
});

router.post("/do", (req,res,next)=>{
	/*-------获取请求地址-------*/
	let url = config.base_uri + req.body.api;
	let form = Object.assign(req.body, {});
	console.log(`url -----------> ${url}`);
	console.log(form);
	request.post(url, {form: form}, (err, httpResponse, body)=>{
		console.log(err);
		console.log(body);
		res.send(body);
	});
});


module.exports = router;