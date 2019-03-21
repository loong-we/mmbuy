; (function () {
  // 申明一个全局变量，储存Id
  var id;
  var nid = decodeURI(location.search).slice(1) || 1;
  console.log(nid);

  // 渲染产品信息
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:9090/api/getproduct",
    data: {
      productid: nid
    },
    dataType: "json",
    success: function (res) {
      console.log(res);
      id = res.result[0].productId;
      console.log(id);
      var htmlStr = template("details", res)
      $(".bj_datails").html(htmlStr);

      // 渲染评价
      $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getproductcom",
        data: {
          productid: id
        },
        dataType: "json",
        success: function (ret) {
          console.log(ret);
          var html = template("bj_comments", ret)
          $(".bj_eval ul").html(html)
        }
      })
    }
  })

  // 导航路径的li注册点击事件（事件委托）
  $(".bj_datails").on("click", ".active", function () {
    var cid = $(this).data("id");
    console.log(cid);
    // 将id拼接给路径
    location.href = "bj_productlist.html?" + cid;
  })


})();


