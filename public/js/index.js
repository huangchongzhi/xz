var vm=new Vue({
  el:"#main>div:nth-child(2)>h3:first-child",
  data:{
    res:[
      {title:"", price:0},
      {title:"", price:0},
      {title:"", price:0},
    ]
  },
  created(){
    axios.get("http://localhost:3000/index")
    .then(res=> this.res=res.data )
    //不确定响应何时回来
  },
  //data:{ res:[] }
  //进入mount
  //res[0].title
  //undefined.title
  mounted(){

  }
})
