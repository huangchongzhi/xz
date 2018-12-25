const express=require("express");
const router=express.Router();
const pool=require("../pool");

//http://localhost:3000/index
router.get("/",(req,res)=>{
    var sql=`SELECT * FROM xz_index_product 
        where seq_recommended!=0 
        order by seq_recommended`;

    // 延迟显示
    //setTimeout(function(){
        pool.query(sql,[],(err,result)=>{
            if(err) throw err;
            //res.send(result);
            res.writeHead(200,{//响应头   200 成功
                "Content-Type":"text/plain;charset=utf-8", //设置编码格式为utf-8
                "Access-Control-Allow-Origin":"*" //任何网站都可以访问
            });
            res.write(JSON.stringify(result));//result转为json字符串
            res.end();
        });
    //},1000)
});

module.exports=router;
//跨源头资源共享
//npm i -save cors