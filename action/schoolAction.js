/**
 * Created by zhisongli on 15-3-18.
 */

var schoolService = require("./../service/schoolService");
var conf = require("./../include/conf");

exports.viewSchoolInfo = function(req,res){
    var id = parseInt(req.params.id);
    if(isNaN(id)){
        res.redirect(conf.sow.appName);
    }
    else{
        schoolService.getSchoolInfoById(id,function(err,result){
            if(result){
                res.render("schooldetail",{data:result});
            }
            else{
                //没有找到学校信息，返回首页
                res.redirect(conf.sow.appName);
            }
        });
    }
}

exports.getSchoolInfoById = function(req,res){
    var id = parseInt(req.params.id);
    if(isNaN(id)){
        //res.redirect(conf.sow.appName);
        res.json({});
    }
    else{
        schoolService.getSchoolInfoById(id,function(err,result){
            res.json(result);
        })
    }
}

// 获取对口的小区列表，结果根据年份聚合，最大的年份放在最前面
// 数据库里已经根据年份做了排序了，这里先不排序
exports.getMatchedComm = function(req,res){
    var id = parseInt(req.params.id);
        if(isNaN(id)){
            //res.redirect(conf.sow.appName);
            res.json({data:[]});
        }
        else{

        /*
        * 最后返回的对象格式
        * {data:
        * [
        * {
        *   matchedYear:2015,
        *   matchedComms:[{match_id,comm_id,school_id,match_year,match_scope},...]
        * },
        * ...
        * ]
        * }
        * */
        schoolService.getMatchedComm(id,function(err,result){
            var matchedList = [];
            var mYear,iYear ;
            iYear = 0;

            var matched = {};

            for(var i=0;i<result.length;i++){
//                console.log("i here is " + i.toString());
//                console.log("matched here is " );
//                console.log(matched);
                mYear = result[i].match_year;
//                console.log("iYear here is " + iYear.toString());
//                console.log("mYear here is " + mYear.toString());
                if(iYear != mYear){
                    //  如果当前的matched对象已经有属性了，先丢到最终的数组里面；
                    //  记住，循环外面还要丢一次的
                    if(matched.matchedYear){
//                        console.log("one matched year pushed into matchedlist");
//                        console.log(matched);
                        matchedList.push(matched);
                    }
                    iYear = mYear;
                    // 这儿需要重置对象
                    matched = {};
                    matched.matchedYear = iYear;
                    matched.matchedComms = []
                    matched.matchedComms.push(result[i]);
                }
                else{
                    matched.matchedComms.push(result[i]);
                }
            }
            // 循环外面，再丢一次
            if(matched.matchedYear){
//                console.log("one matched year pushed into matchedlist");
//                console.log(matched);
                matchedList.push(matched);
            }
//            console.log("matchedList here is : ");
//            console.log(matchedList);
            res.json({matchResult:matchedList});
        });
    }
}