/**
 * Created by zhisongli on 15-1-4.
 */
var express = require("express");
var router = express.Router();

var cityAction = require("./../action/cityAction");
var schoolAction = require("./../action/schoolAction");
var commAction = require("./../action/commAction");
var regionAction = require("./../action/regionAction");

router.all("/*",function(req,res,next){
    res.charset="utf-8";
    next();
});

// 默认访问上海城市首页
router.get("/",function(req,res){
    res.redirect("/city/shanghai");
});
router.get("/city/:cityname",cityAction.cityHome);

router.get("/city/:cityId/region/:regionCode/schools/:schoolType",regionAction.listschools);

router.get("/school/view/:id",schoolAction.viewSchoolInfo);
router.get("/school/get/matchedcomm/:id",schoolAction.getMatchedComm);
router.get("/school/get/schoolinfo/:id",schoolAction.getSchoolInfoById);


router.get("/comm/get/comminfo/:id",commAction.getCommInfoById)
router.get("/comm/get/matchedschoolinfo/:id",commAction.getMatchedSchoolListById)

module.exports = router;