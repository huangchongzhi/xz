const express=require("express");
const router=express.Router();
const pool=require("../pool");

//http://localhost:3000/products?kwords=i5&pno=0
router.get("/",(req,res)=>{
  //专治encodeRUI/ encodeURIComponent编码
  var kwords=decodeURIComponent(//解码 如果有百分号、汉字自动转
    //接   框架express:cookieParser  自动转
    req.query.kwords //"mackbook i5 128g" 
  );
  //console.log(kwords);
  var output={
    pno:0,//页码编号
    pageSize:9,//每页显示9个
    count:0,//数据库拿到的个数
    pageCount:0, //=ceil(count/pageSize) 
    products:[]  //所有商品中starti,endi结束
  }
  if(req.query.pno!==undefined)
    output.pno=parseInt(req.query.pno);
  //"macbook i5 128g"
  kwords=kwords.split(" "); //split 用空格切割
  //[macbook,i5,128g]
  kwords.forEach((val,i,arr)=>{
    arr[i]=`%${val}%`
  })
  //[%macbook%,%i5%,%128g%]
  var arr=[];
  for(var kw of kwords){
    arr.push(` title like ? `);//push() 追加
  }
  /*[
    title like ?,
    title like ?,
    title like ?
  ]*/
  var where=" where "+arr.join(" and ");
  var sql="select * ,(select md from xz_laptop_pic where laptop_id=lid limit 1) as md from xz_laptop "+where;
  pool.query(sql,kwords,(err,result)=>{
    if(err) console.log(err);
    var count=result.length;
    var pageCount=
      Math.ceil(count/output.pageSize);//Math.ceil() 向上取整
    output.count=count;
    output.pageCount=pageCount;
    var starti=output.pno*output.pageSize;
    //console.log(result)
    output.products=result.slice(
      starti,starti+output.pageSize
    );
    res.send(output)
  })
})

module.exports=router;