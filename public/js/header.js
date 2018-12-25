$(function(){
  $("<link rel='stylesheet' href='css/header.css'>").appendTo("head");
  $.ajax({//异步
    url:"header.html",
    type:"get",
    success:function(res){
      //res->html片段
      $(res).replaceAll("#header");
      var $input=
      $("#header>nav>div>div>div>img")
      .click(function(){
        var $img=$(this);
        var kwords=$img.parent().prev().val();
        if(kwords.trim()!=="")
          location.href=
            `products.html?kwords=${kwords}`;
      })//return $img
      .parent().prev()//return $input
      .keyup(function(e){
        if(e.keyCode==13){
          $(this).next().children("img").click()
        }
      });//return $input

      if(location.search.indexOf("kwords=")!=-1){
        $input.val(
        //专治: encodeURI/encodeURIComponent编码后的字符
          decodeURIComponent(
            location.search.split("=")[1]
          )
        )
      }
    }
  })
})