const express = require("express");
const path = require("path");
const config = require("../../config/env.config.js");
const router = express.Router();
const request = require("request");
const authMiddleware = require("../middlewares/auth.middleware.js");

const paths = [
    "/",
    "/backoffice",
    "/backoffice/category/:subject",
    "/backoffice/category/add",
    "/backoffice/category/edit/:id",
    "/backoffice/paper/list",
    "/backoffice/paper/add",
    "/backoffice/paper/edit/:id",
    "/backoffice/question/:subject",
    "/backoffice/question/add",
    "/backoffice/question/edit/:id"
];
router.get(paths, (req, res, next) => {
    res.sendFile(path.join(__dirname, "../views/index.html"));
});

router.post("/do", authMiddleware, (req, res, next) => {
    /*-------获取请求地址-------*/
    let api = req.body.api;
    let url = config.base_uri + api;
    let form = Object.assign(req.body, {});
    delete form.api;
    let headers = {
        token: req.cookies.token || "",
        uid: req.cookies.uid || ""
    };
    console.log(form);
    request.post(url, { headers: headers, form: form }, (err, httpResponse, body) => {
        try {
            let data = JSON.parse(body);
            if (api == "/user/login" && data.code == 0) {
                console.log("------body-----");
                res.cookie("token", data.result.token, { expires: new Date(Date.now() + config.cookie_expiredTime), httpOnly: true });
                res.cookie("uid", data.result.uid, { expires: new Date(Date.now() + config.cookie_expiredTime), httpOnly: true });
            };
            res.json(data);
        } catch (e) {
            res.json({ code: 1010, errorMsg: "系统错误" });
        };
    });
});


module.exports = router;