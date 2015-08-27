/**
 * Created by zhisongli on 15-2-12.
 */
var mysql = require("mysql");
var conf = require("./../include/conf");

exports.getRegionList = function(city_id,cb){
    try{
        var conn = mysql.createConnection(conf.mysqlconn);
        conn.connect(function(err){
            if(err){
                cb({errorCode:err.code,errorMessage: err.message},{});
            }
        });

        var sql = "SELECT r.region_id,r.city_id,r.name_py,r.name_chs,r.bg_color,r.pos_baidu,re.cnt_comm,re.cnt_youeryuan,re.cnt_xiaoxue,re.cnt_chuzhong,re.cnt_gaozhong FROM region r INNER JOIN region_extend re ON r.region_id=re.region_id WHERE r.city_id = ? ORDER BY r.name_py" ;
        var query = conn.query(sql,[city_id],function(err,rows){
            if(err){
                cb({errorCode:err.code,errorMessage: err.message},{});
            }
            else{
                cb(null,rows);
            }
        });
        conn.end();
    }
    catch(e){
        cb({errorCode: e.code,errorMessage : e.message},{})
    }
}

exports.getTopCommList = function(city_id,num,cb){
    try{
        var conn = mysql.createConnection(conf.mysqlconn);
        conn.connect(function(err){
            if(err){
                cb({errorCode:err.code,errorMessage: err.message},{});
            }
        });

        var sql = "SELECT comm_id FROM community_rank WHERE city_id = ? ORDER BY rank_score DESC,comm_id DESC LIMIT ?" ;
        var query = conn.query(sql,[city_id,num],function(err,rows){
            if(err){
                cb({errorCode:err.code,errorMessage: err.message},{});
            }
            else{
                cb(null,rows);
            }
        });
        conn.end();
    }
    catch(e){
        cb({errorCode: e.code,errorMessage : e.message},{})
    }
};

exports.getTopSchoolList = function(city_id,school_type,num,cb){
    try{
        console.log("im here now");
        var conn = mysql.createConnection(conf.mysqlconn);
        conn.connect(function(err){
            if(err){
                cb({errorCode:err.code,errorMessage: err.message},{});
            }
        });

        var filter_school = "'ALL'=?";
        filter_school += " OR ('YOUERYUAN' = ? AND has_youeryuan = 'T') ";
        filter_school += " OR ('XIAOXUE' = ? AND has_xiaoxue = 'T') ";

        var sql;

        switch(school_type){
            case "YOUERYUAN":
                sql = "SELECT school_id FROM school_rank WHERE city_id = ? AND has_youeryuan ='T' ORDER BY rank_score DESC,school_id DESC LIMIT ?" ;
                break;
            case "XIAOXUE":
                sql = "SELECT school_id FROM school_rank WHERE city_id = ? AND has_xiaoxue ='T' ORDER BY rank_score DESC,school_id DESC LIMIT ?" ;
                break;
            default :
                sql = "SELECT school_id FROM school_rank WHERE city_id = ? ORDER BY rank_score DESC,school_id DESC LIMIT ?" ;
        }


        var query = conn.query(sql,[city_id,num],function(err,rows){
            if(err){
                cb({errorCode:err.code,errorMessage: err.message},{});
            }
            else{
                cb(null,rows);
            }
        });
        console.log("query of getTopSchoolList here is :");
        console.log(query.sql);
        conn.end();
    }
    catch(e){
        cb({errorCode: e.code,errorMessage : e.message},{})
    }
};

exports.getCityInfoByName = function(city_name,cb){
    try{
        var conn = mysql.createConnection(conf.mysqlconn);
        conn.connect(function(err){
            if(err){
                cb({errorCode:err.code,errorMessage: err.message},{});
            }
        });

        var sql = "SELECT c.city_id,c.name_py,c.name_chs,c.pos_baidu,ce.cnt_comm,ce.cnt_youeryuan,ce.cnt_xiaoxue,ce.cnt_chuzhong,ce.cnt_gaozhong FROM city c INNER JOIN city_extend ce ON c.city_id = ce.city_id WHERE c.name_py = ?";
        var query = conn.query(sql,[city_name],function(err,rows){
            if(err){
                cb({errorCode:err.code,errorMessage: err.message},{});
            }
            else{
                cb(null,rows[0]);
            }
        });
        conn.end();
    }
    catch(e){
        cb({errorCode: e.code,errorMessage : e.message},{})
    }
};

