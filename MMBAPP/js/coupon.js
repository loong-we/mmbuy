; (function () {

  // 申明一个变量储存地址
  var href = [];

  // 发送ajax请求，获取数据
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:9090/api/getcoupon",
    dataType: "json",
    success: function (res) {
      console.log(res);
      var htmlStr = template("cp_list", res)
      $(".cp_list ul").html(htmlStr);
      res.result.forEach(function (e, i) {
        href.push(e.couponLink);
      })
      console.log(href);
    }
  })

  // 给每个li注册点击事件，并跳转目标页面中（事件委托）
  $(".cp_list ul").on("click", "li", function () {
    // 获取点击li的下标
    var idx = $(this).data("idx");
    var id = $(this).data("id")
    // 跳转到目标页面,同时将目标id拼接到地址栏
    location.href = href[idx] + "?" + id
  })

})();