/**
 * Created by zhisongli on 15-2-12.
 */
var mysql = require("mysql");
var conf = require("./../include/conf");

exports.getCommInfoById = function(comm_id,cb){
    try{
        var conn = mysql.createConnection(conf.mysqlconn);
        conn.connect(function(err){
            if(err){
                cb({errorCode:err.code,errorMessage: err.message},{});
            }
        });

        var sql = "SELECT comm_id,subregion_id,subregion_name,region_id,region_name,city_id,city_name,name_chs,comm_code,address,built_date,pos_baidu FROM community WHERE comm_id = ?" ;
        var query = conn.query(sql,[comm_id],function(err,rows){
            if(err){
                cb({errorCode:err.code,errorMessage: err.message},{});
            }
            else{
                cb(null,rows[0]);
            }
        });
        console.log("query of getCommInfoById here is :")
        console.log(query.sql);
        conn.end();
    }
    catch(e){
        cb({errorCode: e.code,errorMessage : e.message},{})
    }
}


exports.getCommExtendInfoById = function(comm_id,cb){
    try{
        var conn = mysql.createConnection(conf.mysqlconn);
        conn.connect(function(err){
            if(err){
                cb({errorCode:err.code,errorMessage: err.message},{});
            }
        });

        var sql = "SELECT comm_id,avg_price,cnt_house_ajk,cnt_house_soufun FROM community_extend WHERE comm_id = ?" ;
        var query = conn.query(sql,[comm_id],function(err,rows){
            if(err){
                cb({errorCode:err.code,errorMessage: err.message},{});
            }
            else{
                cb(null,rows[0]);
            }
        });
        console.log("query of getCommExtendInfoById here is :")
        console.log(query.sql);
        conn.end();
    }
    catch(e){
        cb({errorCode: e.code,errorMessage : e.message},{})
    }
}

exports.getMatchedSchoolListById = function(comm_id,cb){
    try{
        var conn = mysql.createConnection(conf.mysqlconn);
        conn.connect(function(err){
            if(err){
                cb({errorCode:err.code,errorMessage: err.message},[]);
            }
        });

        var sql = "SELECT match_id,comm_id,school_id,match_year,match_scope FROM school_comm_match WHERE comm_id = ?" ;
        var query = conn.query(sql,[comm_id],function(err,rows){
            if(err){
                cb({errorCode:err.code,errorMessage: err.message},[]);
            }
            else{
                cb(null,rows);
            }
        });
        console.log("query of getMatchedSchoolListById here is :")
        console.log(query.sql);
        conn.end();
    }
    catch(e){
        cb({errorCode: e.code,errorMessage : e.message},[])
    }
}