; (function () {


  // 发送ajax请求
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:9090/api/getinlanddiscount",
    dataType: "json",
    success: function (res) {
      console.log(res);
      var htmlStr = template("sm_dislist", res);
      $(".sm_dislist ul").html(htmlStr)
    }
  })

  // 给每个li注册点击事件(事件委托)
  $(".sm_dislist ul").on("click", "li", function () {
    var id = $(this).data("id");
    console.log(id);
    // 拼接到网址shang
    location.href = "discount.html?" + id;
  })

})();