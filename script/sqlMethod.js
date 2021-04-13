
var sql = require('mssql');
//连接数据库
sql.connect("mssql://lmtest:Zd6VAVn*S$@v8lmtest.longsky.com,5566/newqpgl_lm_gz").then(function () { console.log('连接成功！') })

//分页查询存储过程只需
function sqlPageSearch(strTable,strfield,strWhere="",pagesize=10,pageindex=1,stroderby=''){

    if(strWhere.length==0){
        strWhere=" 1=1 "
    }
    var array=[strTable,strfield,pagesize,pageindex,strWhere,stroderby]
    m_sql="exec [spSqlPageByMaxTop] '{0}','{1}','{2}','{3}','{4}','{5}'".format(array)
    // m_sql="select top 10 "+field+" from "+sqlTable+" where "+sqlWhere+sqlId
    console.log(m_sql)
    return new Promise(function(resolve){
        new sql.Request().query(m_sql).then(function(recordset){  
            resolve(recordset)
        }) 
    })
}



function sqlSearch(sqlTable,field,sqlId=0,sqlWhere="",sqlPower=""){
    if(sqlId>0){
        sqlId=" and id="+sqlId
    }
    else{
        sqlId=""
    }
    if(sqlWhere.length==0){
        sqlWhere=" 1=1 "
    }
    m_sql="select top 10 "+field+" from "+sqlTable+" where "+sqlWhere+sqlId
    console.log(m_sql)
    return new Promise(function(resolve){
        new sql.Request().query(m_sql).then(function(recordset){  
            resolve(recordset)
        }) 
    })
    // new sql.Request().query(m_sql).then(function(recordset){   
    //     return new Promise(function(resolve,reject){
    //         resolve(recordset)
    //     })
    // })
}



module.exports = {
        sqlPageSearch,
        sqlSearch,
        sql 
}
   