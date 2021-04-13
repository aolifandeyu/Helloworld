var express = require("express");
var app = express();
//var sql = require('mssql');
var util = require('util');
let fs = require('fs');
var url = require('url');
var sqlHelp=require('./sqlMethod')


String.prototype.format=function(array){  
     if(array.length==0) 
        return this;  
     for(var s=this, i=0; i<array.length; i++)  
         s=s.replace(new RegExp("\\{"+i+"\\}","g"), array[i]);  
         return s;  
    };  
    
// function sqlSearch(req,res,sqlTable,field,sqlWhere,sqlId=0,sqlPower){
//     if(sqlId>0){
//         sqlId=" and id="+sqlId
//     }
//     else{
//         sqlId=""
//     }   
//     if(sqlWhere.length==0){
//         sqlWhere=" 1=1 "
//     }
//     m_sql="select top 10 "+field+" from "+sqlTable+" where "+sqlWhere+sqlId
//     console.log(m_sql)
//     new sql.Request().query(m_sql).then(function(recordset){
//         console.log(recordset)
//         res.jsonp(JSON.stringify(recordset.recordset));
//         console.log('200')
//     }).catch(function (err) {
//         console.log('400')
//     });
// }

function getStr(arr, type) {
    let strtr = ""
    console.log(arr);
    arr.forEach((item, index) => {
        if (type == "gnamelist") { strtr = strtr + "<li>" + item['gname'] + "</li>"; }
        else { strtr = strtr + "<li>" + item['nno'] + "</li>"; }
    })
    return "<ul>" + strtr + "</ul>"
}

//数据库查询
app.get("/web/api/list", function (req, res) {
    res.header("Access-Control-Allow-Origin","*");
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    var type=req.query['type']
    var id=req.query['id']
    var pagesize = isNaN(parseInt(req.query['pz']))? 10:parseInt(req.query['pz'])
    var pageindex= isNaN(parseInt(req.query['pi']))? 1:parseInt(req.query['pi'])
    var fieldlist=''
    var tablename=''
    switch (type) {
        case '10001':
            tablename = "tbgu";
            fieldlist='*'
            break;
        case '10002':
            tablename = "tbisto";
            fieldlist='*'
             break;
        case '10003':
            tablename = "tbprnoty";
            fieldlist='*'
             break;
        case '10004':
            tablename = "tbsada";
            fieldlist='*'
             break;
        case '10005':
            tablename = "tbistoed";
             fieldlist='*'
             break;
        case '10006':
            tablename = "tborder";
            fieldlist='*'
             break;
        case undefined ||''||null:
            tablename = "";
    } 
    if (tablename==""){
        res.end(JSON.stringify({data:[],status:400}))
    }
    else
    {   
        sqlHelp.sqlPageSearch(tablename,fieldlist,'',pagesize,pageindex,'order by id asc').then((result)=>{
            res.end(JSON.stringify({data:result.recordset,status:200}))   
       })
    }

});

app.get("/web/api/getlist", function (req, res) {
    res.header("Access-Control-Allow-Origin","*");
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
        var type=req.query['type']
        var id=req.query['id']
        var fieldlist=''
        var tablename=''
        console.log(type)
        switch (type) {
            case '10001':
                tablename = "tbgu";
                fieldlist='rtrim(gname)gname,rtrim(gno)gno,id'
                break;
            case '10002':
                tablename = "tbisto";
                fieldlist='rtrim(nno)nno,rtrim(na1)na1,kcamount,iprc,oprc,id'
                 break;
            case '10003':
                tablename = "tbprnoty";
                fieldlist='rtrim(nno)nno,rtrim(na1)na1,id'
                 break;
            case '10004':
                tablename = "tbsada";
                fieldlist='rtrim(nno)nno,rtrim(na1)na1,ckamount,iprc,oprc,id'
                 break;
            case '10005':
                tablename = "tbistoed";
                 fieldlist='id'
                 break;
            case '10006':
                tablename = "tborder";
                fieldlist='id'
                 break;
            case undefined ||""||null:
                tablename = "";
                break;
        } 
        if (tablename==""){
            res.end(JSON.stringify({data:[],status:400}))
        }
        else
        {   
            sqlHelp.sqlSearch(tablename,fieldlist,id).then((result)=>{
                res.end(JSON.stringify({data:result.recordset,status:200}))  
                // res.header("Access-Control-Allow-Origin","*");
                // res.jsonp(JSON.stringify(result.recordset))
                // res.send(getStr(result.recordset, "gnamelist"));
                // res.send(getStr(result.recordset, "gnamelist"));
            })
        }

});


app.get('/better', (req, res) => {
    // 接收客户端传递过来的函数的名称
    //const fnName = req.query.callback;
    // 将函数名称对应的函数调用代码返回给客户端
    //const data = JSON.stringify({name: "张三"});
    //const result = fnName + '('+ data +')';
    // setTimeout(() => {
    // 	res.send(result);
    // }, 1000)
    res.jsonp({ name: 'lisi', age: 20 });
});

var r = app.listen(8888, function () {
    console.log("服务器启动成功");
});