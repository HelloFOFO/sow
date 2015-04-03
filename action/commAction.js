/**
 * Created by zhisongli on 15-3-19.
 */

var async = require("async");
var commService = require("./../service/commService");

exports.getCommInfoById = function(req,res){
    var id = parseInt(req.params.id);
    if(isNaN(id)){
        res.json({});
    }
    else{
        var funcCommDetail = [];
        funcCommDetail.push(function(cb2){commService.getCommInfoById(id,cb2)});
        funcCommDetail.push(function(cb2){commService.getCommExtendInfoById(id,cb2)});

        async.parallel(funcCommDetail,function(err,result){
            var data = {};
            if(result[0]){
                data.comm_id          = result[0].comm_id           ;
                data.subregion_id   = result[0].nsubregion_id     ;
                data.subregion_name  = result[0].subregion_name    ;
                data.region_id        = result[0].region_id         ;
                data.region_name      = result[0].region_name       ;
                data.city_id          = result[0].city_id           ;
                data.city_name        = result[0].city_name         ;
                data.name_chs         = result[0].name_chs          ;
                data.comm_code        = result[0].comm_code         ;
                data.address          = result[0].address           ;
                data.built_date       = result[0].built_date        ;
                data.pos_baidu        = result[0].pos_baidu         ;
            }
            if(result[1]){
                data.avg_price          = result[1].avg_price     ;
                data.cnt_house_ajk     = result[1].cnt_house_ajk    ;
                data.cnt_house_soufun  = result[1].cnt_house_soufun         ;
            }
            res.json(data);

        });
    }
}