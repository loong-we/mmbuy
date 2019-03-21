; (function () {

  var id = decodeURI(location.search).slice(1) || 1;
  // console.log(id);
  // 发送ajax请求
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:9090/api/getdiscountproduct",
    data: {
      productid: id
    },
    dataType: "json",
    success: function (res) {
      console.log(res);
      var htmlStr = template("dis_datails", res)
      $(".dis_datails").html(htmlStr)

    }
  })
})();