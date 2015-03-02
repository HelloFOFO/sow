/**
 * Created by zhisongli on 15-1-4.
 */

var cityService = require("./../service/cityService.js");
var commService = require("./../service/commService.js");
var schoolService = require("./../service/schoolService.js");

exports.cityMap = function(req,res){
    var city_name = req.params.cityname;
    // 取城市的基本信息
    cityService.getCityInfoByName(city_name,function(err,city){
        if(err || !city){
            console.log("error while get city info for ["+city_name+"]");
            res.render("citymap",{data:{cityInfo:{name_chs:"错误的"},TopCommList:[]}});
        }
        else{
            // data作为返回的结果，包含 cityInfo & TopCommList & Top
            var data = {cityInfo : city,TopCommList : [], TopXiaoxueList :[],TopYoueryuanList : []};

            var async = require("async");

            var topFuncList = [];

            // 获取城市的区域列表
            topFuncList.push(
                function(cb1){
                    cityService.getRegionList(city.city_id,function(err,regionList){
                        if( !err|| regionList){
                            console.log("regionList here is : ");
                            console.log(regionList);
                            data.regionList = regionList;
                            cb1(null);
                        }
                        else{
                            cb1(null);
                        }
                    })
                }
            );

            // 获取TOP5的小区列表
            topFuncList.push(
                function(cb1){
                    cityService.getTopCommList(city.city_id,5,function(err,commList){
                        if( !err|| commList){
                            console.log("Top Comm List here is : ");
                            console.log(commList);
                            // 对每个小区，获取详细信息
                            async.eachSeries(commList
                                ,function(comm,cb){
                                    commService.getCommInfoById(comm.comm_id,function(err,commDetail){
                                        if( !err && commDetail) {
                                            data.TopCommList.push(commDetail);
                                            cb();
                                        }
                                    });
                                }
                                ,function(err){
                                    cb1(null);
                                }
                            );
                        }
                        else{
                            cb1(null);
                        }
                    })
                }
            );

            // 获取TOP5的幼儿园列表
            topFuncList.push(
                function(cb1){
                    cityService.getTopSchoolList(city.city_id,"YOUERYUAN",5,function(err,youeryuanList){
                        if( !err|| youeryuanList){
                            console.log("Top youeryuanList here is : ");
                            console.log(youeryuanList);
                            // 对每个幼儿园，获取详细信息
                            async.eachSeries(youeryuanList
                                ,function(school,cb){
                                    schoolService.getSchoolInfoById(school.school_id,function(err,schoolDetail){
                                        if( err || !schoolDetail){
                                            cb();
                                        }
                                        else{
                                            data.TopYoueryuanList.push(schoolDetail);
                                            cb();
                                        }
                                    });
                                }
                                ,function(err){
                                    cb1(null);
                                }
                            );
                        }
                        else{
                            cb1(null);
                        }
                    });
                }
            );

            // 获取TOP5的小学列表
            topFuncList.push(
                function(cb1){
                    cityService.getTopSchoolList(city.city_id,"XIAOXUE",5,function(err,xiaoxueList){
                        if( !err|| xiaoxueList){
                            console.log("Top xiaoxueList here is : ");
                            console.log(xiaoxueList);
                            // 对每个小学，获取详细信息
                            async.eachSeries(xiaoxueList
                                ,function(school,cb){
                                    schoolService.getSchoolInfoById(school.school_id,function(err,schoolDetail){
                                        if( err || !schoolDetail){
                                            cb();
                                        }
                                        else{
                                            data.TopXiaoxueList.push(schoolDetail);
                                            cb();
                                        }
                                    });
                                }
                                ,function(err){
                                    cb1(null);
                                }
                            );
                        }
                        else{
                            cb1(null);
                        }
                    });
                }
            );


            async.parallel(topFuncList,function(err,result){
                console.log("data here is :");
                console.log(data);
                res.render("citymap",{data : data});
            });


        }
    });

}


