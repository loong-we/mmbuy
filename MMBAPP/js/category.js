; (function () {

 // 发送ajax请求
 $.ajax({
  type: "get",
  url: "http://127.0.0.1:9090/api/getcategorytitle",
  dataType: "json",
  success: function (res) {
   console.log(res);
   var htmlStr = template("first-menu", res);
   $(".first_menu>ul").html(htmlStr)

   // 给展开项注册点击事件
   $(".first_menu>ul").on("click", "i", function () {
    console.log(123);
    var id = $(this).data("id");
    // 发送ajax请求
    $.ajax({
     type: "get",
     url: "http://127.0.0.1:9090/api/getcategory",
     data: {
      titleid: id
     },
     dataType: "json",
     success: function (ret) {
      console.log(ret);
      var html = template("second-menu", ret);
      $(".second").eq(id).html(html).slideToggle(500);
     }
    })

   })

  }
 })


})();