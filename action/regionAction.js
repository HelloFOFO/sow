/**
 * Created by zhisongli on 15-5-13.
 */

// 查看区域的幼儿园列表
exports.listschools = function(req,res){
    var cityId = parseInt(req.params.cityId);
    var regionCode = req.params.regionCode;     //混合型，可以是regionId，也可以是 regionNamePy
    var schoolType = req.params.schoolType;

    if(isNaN(city_id)){
        res.redirect(conf.sow.appName);
    }
    else{

    }
}

