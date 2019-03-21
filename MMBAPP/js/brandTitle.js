; (function () {

  // 发送ajax请求
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:9090/api/getbrandtitle",
    dataType: "json",
    success: function (res) {
      console.log(res);
      var htmlStr = template("first_brand", res)
      $(".first_brand ul").html(htmlStr)


      // 给每个品牌注册点击事件(事件委托)
      $(".first_brand ul").on("click", "li", function () {
        var id = $(this).data("id");
        console.log(id);
        var text = $(this).children().text().slice(0, -5)
        console.log($(this).children().text().slice(0, -5));
        // 将id拼接到跳转的网址上
        location.href = "brand.html?" + id + "&" + text;
      })

    }
  })
})();