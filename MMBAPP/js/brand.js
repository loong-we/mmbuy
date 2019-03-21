; (function () {

  // 申明一个变量接受由上个页面传过来的id
  var str = decodeURI(location.search).slice(1) || "1&平板";
  var arr = str.split("&")
  var brandtitleid = arr[0];
  var text = arr[1];
  var productId = 1;
  var pagesize = 10;
  var src;

  $(".hot_brand span").text(text)


  // 发送ajax请求
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:9090/api/getbrand",
    data: {
      brandtitleid: brandtitleid
    },
    dataType: "json",
    success: function (res) {
      console.log(res);
      var htmlStr = template("ten_brand", res)
      $(".ten_brand ul").html(htmlStr)
    }
  })


  // 发送ajax请求
  $.ajax({
    type: 'get',
    url: "http://127.0.0.1:9090/api/getbrandproductlist",
    data: {
      brandtitleid: brandtitleid,
      pagesize: pagesize
    },
    dataType: "json",
    success: function (res) {
      console.log(123);
      console.log(res);
      var htmlstr = template("top_brand", res)
      console.log(htmlstr);
      $(".top_brand ul").html(htmlstr)
      // 更新pagesize
      pagesize = res.pagesize
      // 开始隐藏评论，点击时显示
      // src = res.result["0"].productImg
      // render(src)
    }
  })


  // 给排行榜注册点击事件
  $(".top_brand ul").on("click", "li", function () {
    console.log($(this).data("id"));
    // 更新id和图片路径
    productId = $(this).data("id")
    // var dd = $(this).result[0].productImg
    src = $(this)["0"].children["0"].children["0"].outerHTML;

    render(src);
  })


  // 封装
  function render(src) {
    // 发送ajax请求
    $.ajax({
      type: "get",
      url: "http://127.0.0.1:9090/api/getproductcom",
      data: {
        productid: productId
      },
      dataType: 'json',
      success: function (res) {
        var res = {
          result: res.result,
          src: src
        }
        console.log(res);
        var htmlStr = template("new_brand", res)
        $(".new_brand ul").html(htmlStr)
      }
    })
  }


})();