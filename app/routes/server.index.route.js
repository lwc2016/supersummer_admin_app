const express = require("express");
const path = require("path");
const router = express.Router();

const paths = ["/", "/backoffice"];
router.get(paths, (req,res,next)=>{
	res.sendFile(path.join(__dirname, "../views/index.html"));
});

module.exports = router;