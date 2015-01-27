/**
 * Created by zhisongli on 15-1-4.
 */
var express = require("express");
var router = express.Router();

var indexAction = require("./../action/indexAction");

router.get("/map/:cityname",indexAction.cityMap);


module.exports = router;