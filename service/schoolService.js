/**
 * Created by zhisongli on 15-2-12.
 */

var mysql = require("mysql");
var conf = require("./../include/conf");

exports.getSchoolInfoById = function(school_id,cb){
    try{
        var conn = mysql.createConnection(conf.mysqlconn);
        conn.connect(function(err){
            if(err){
                cb({errorCode:err.code,errorMessage: err.message},{});
            }
        });

        var sql = "SELECT school_id,has_youeryuan,has_xiaoxue,has_chuzhong,has_gaozhong,subregion_id,subregion_name,region_id,region_name,city_id,city_name,name_py,name_chs,pos_baidu,level,nature,address FROM school WHERE school_id = ?" ;
        var query = conn.query(sql,[school_id],function(err,rows){
            if(err){
                cb({errorCode:err.code,errorMessage: err.message},{});
            }
            else{
                cb(null,rows[0]);
            }
        });
        console.log("query of getSchoolInfoById here is :")
        console.log(query.sql);
        conn.end();
    }
    catch(e){
        cb({errorCode: e.code,errorMessage : e.message},{})
    }
}

exports.getMatchedComm = function(school_id,cb){
    try{
        var conn = mysql.createConnection(conf.mysqlconn);
        conn.connect(function(err){
            if(err){
                cb({errorCode:err.code,errorMessage: err.message},[]);
            }
        });

        // 先简单点 用Join做
        var sql = "SELECT s.school_id,s.has_youeryuan,s.has_xiaoxue,s.subregion_name AS subregion_name_s,s.region_name AS region_name_s,s.name_chs AS name_chs_s,s.address AS address_s " +
                ",sc.match_id,sc.match_year,sc.match_scope " +
                ",c.comm_id,c.subregion_name AS subregion_name_c,c.region_name AS region_name_c,c.name_chs AS name_chs_c,c.address AS address_c,c.built_date AS built_date_c " +
                ",c.pos_baidu AS pos_baidu_c " +
                "FROM   school s " +
                "INNER JOIN school_comm_match sc ON s.school_id = sc.school_id " +
                "INNER JOIN community c ON sc.comm_id = c.comm_id " +
                "WHERE  s.school_id = ? ORDER BY match_year DESC,comm_id DESC";

        var query = conn.query(sql,[school_id],function(err,rows){
            if(err){
                cb({errorCode:err.code,errorMessage: err.message},[]);
            }
            else{
                cb({},rows);
            }
        });
        console.log("query of getMatchedComm here is :")
        console.log(query.sql);
        conn.end();
    }
    catch(e){
        cb({errorCode: e.code,errorMessage : e.message},[])
    }
}

