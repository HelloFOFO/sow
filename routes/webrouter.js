/**
 * Created by zhisongli on 15-1-4.
 */
var express = require("express");
var router = express.Router();

var mapAction = require("./../action/mapAction");


router.all("/*",function(req,res,next){
    res.charset="utf-8";
    next();
});

router.get("/map/:cityname",mapAction.cityMap);


module.exports = router;