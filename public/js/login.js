$(function(){
  $(".login").click(function(){
    var uname=$(".uname").val();
    var upwd=$(".upwd").val();
    $.ajax({
      url:"http://localhost:3000/users/signin",
      type:"post",
      data:{uname,upwd},
      dataType:"json",
      success:function(res){
        console.log(res);
      }
    })
  })
})