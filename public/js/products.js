$(function(){
  var pno=0;
  function loadPage(no=0){
    pno=no;
    if(location.search.indexOf("kwords=")!=-1){
      var kwords=location.search.split("=")[1];
      $.ajax({
        url:"http://localhost:3000/products",
        type:"get",
        data:{kwords,pno},
        dataType:"json",
        success:function(output){
          console.log(output);
          var {products}=output;
          var html="";
          for(var p of products){
            var {lid,md,title,price}=p;
            html+=`<div class="col-md-4 p-1">
              <div class="card mb-4 box-shadow pr-2 pl-2">
                <a href="product_details.html?lid=${lid}" title="${title}">
                  <img class="card-img-top" src="${md}">
                </a>
                <div class="card-body p-0">
                  <h5 class="text-primary">￥${price.toFixed(2)}</h5>
                  <p class="card-text">
                    <a href="product_details.html?lid=${lid}" class="text-muted small">${title}</a>
                  </p>
                  <div class="d-flex justify-content-between align-items-center p-2 pt-0">
                    <button class="btn btn-outline-secondary p-0 border-0" type="button">-</button>
                    <input type="text" class="form-control p-1" value="10">
                    <button class="btn btn-outline-secondary p-0 border-0" type="button">+</button>
                    <a class="btn btn-primary float-right ml-1 pl-1 pr-1" href="cart.html" data-lid="${lid}">加入购物车</a>
                  </div>
                </div>
              </div>
            </div>`;
          }
          $("#plist").html(html);

          var {pno,pageCount}=output;
          var html=`<li class="page-item  ${pno==0?'disabled':''}"><a class="page-link bg-transparent" href="#">上一页</a></li>`;//html:47
          for(var i=0;i<pageCount;i++){
            html+=`<li class="page-item ${pno==i?'active':''}"><a class="page-link ${pno!=i?'bg-transparent':'border'}" href="#">${i+1}</a></li>`;//html:49
          }
          html+=`<li class="page-item ${pno==pageCount-1?'disabled':''}"><a class="page-link bg-transparent" href="#">下一页</a></li>`;//html:51行
          $(".pagination").html(html);
          
        }
      })
    }
  }
  loadPage();
  $(".pagination").on(
    "click",
    "a:not(.disabled):not(.active)",
    function(e){
      e.preventDefault();
      var $a=$(this);
      if($a.parent().is(":first-child")){
        loadPage(pno-1);
      }else if($a.html()==="下一页"){
        loadPage(pno+1);
      }else{ /*?*/ }
    }
  )
})