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

