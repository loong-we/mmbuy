; (function () {


 //进入页面，加载菜单栏，发送ajax请求
 $.ajax({
  type: "get",
  url: "http://127.0.0.1:9090/api/getindexmenu",
  dataType: "json",
  success: function (res) {
   console.log(res);
   var htmlStr = template("tab", res)
   $(".mm_tab ul").html(htmlStr);
   // 给第8个注册点击事件
   //  $(".mm_tab ul li:nth-child(8)").on("click", function () {
   //   $(".mm_tab ul li:nth-child(n+9)").toggle()
   //  })
   $(".mm_tab ul").on("click", "li:nth-child(8)", function () {
    $(".mm_tab ul li:nth-child(n+9)").toggle()
   })
  }
 })


 //加载折扣列表，发送ajax请求
 $.ajax({
  type: "get",
  url: "http://127.0.0.1:9090/api/getmoneyctrl",
  dataType: "json",
  success: function (res) {
   console.log(res);
   var htmlStr = template("dis", res);
   $(".mm_dis ul").html(htmlStr);
   // 注册点击更多加载 
   $(".dis_more button").on("click", function () {
    location.href = "more.html"
   })
  }
 })

 // 设置垂直卷曲距离
 $(".toTop").on("click",function(){
  $(window).scrollTop(0);
 })

})();