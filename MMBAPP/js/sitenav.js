; (function () {

  // 发送ajax请求
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:9090/api/getsitenav",
    dataType: "json",
    success: function (res) {
      console.log(res);
      var htmlStr = template("sit_brand", res)
      $(".sit_brand ul").html(htmlStr)
    }
  })
})();