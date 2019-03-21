; (function () {


  // 声明一个全局id,储存,当前店铺id
  var shopid = 0;
  var areaid = 0;
  var index = 0
  var newArr = []

  // 发送ajax请求(外部渲染,避免多次点击事件,反复触发ajax做无用功)
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:9090/api/getgsshop",
    dataType: "json",
    success: function (res) {
      console.log(res);
      var htmlStr = template("cd_hidstore", res)
      $(".cd_hidstore ul").html(htmlStr)
    }
  })


  // 发送ajax请求
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:9090/api/getgsshoparea",
    dataType: "json",
    success: function (res) {
      console.log(res);
      var htmlStr = template("cd_hidarea", res)
      $(".cd_hidarea ul").html(htmlStr)
    }
  })


  render()
  // 封装
  function render() {
    // 发送ajax请求
    $.ajax({
      type: "get",
      url: "http://127.0.0.1:9090/api/getgsproduct",
      data: {
        shopid: shopid,
        areaid: areaid,
      },
      dataType: "json",
      success: function (res) {
        console.log(res);
        var arr = res.result;
        newArr = arr.slice(4 * index, 4 * (index + 1));
        if (newArr.length == 0) {
          $(".cd_lists>button").text("没有更多了")
        }
        var obj = { result: newArr }
        var htmlStr = template("cd_lists", obj)
        $(".cd_lists ul").append(htmlStr)
      }
    })
  }

  // 注册屏幕滚动事件
  $(window).on("scroll", function () {
    // 获取卷曲距离的高度
    var disj = $(window).scrollTop()
    // 获取加载按钮距离顶部的距离
    var disk = window.innerHeight;
    var disa = $(".cd_lists>button").offset().top;
    if (disa < disk + disj && newArr.length != 0) {
      $(".cd_lists>button").trigger("click")
    }
  })
  // 给按钮注册点击事件
  $(".cd_lists>button").on("click", function () {
    index++;
    console.log(index);
    render()
  })


  // 给导航栏的京东li注册点击事件
  $(".cd_store").on("click", function () {

    // 判断地区li中是否显示
    if ($(".cd_area").find("span").hasClass("rotate")) {
      $(".cd_area").find("span").toggleClass("rotate")
      $(".cd_hidarea ul").toggle()
    }
    $(this).find("span").toggleClass("rotate")
    $(".cd_hidstore ul").find("i").removeClass("active")
    $(".cd_hidstore ul").find("i").eq(shopid).addClass("active");
    $(".cd_hidstore ul").toggle();
  })

  // 给店铺li中的每一项注册点击事件(事件委托)
  $(".cd_hidstore ul").on("click", "li", function () {

    // 重置基础量
    shopid = $(this).data("id");
    index = 0;
    // 重置内容
    $(".cd_lists ul").html("");

    $(this).parent().hide()
    $(".cd_store").find("span").toggleClass("rotate")
    // 获取点击目标的文字
    var text = $(this)[0].firstChild.textContent;
    $(".cd_store i").text(text);

    console.log(shopid);
    render();
  })

  // 给导航栏的地区li注册点击事件
  $(".cd_area").on("click", function () {
    // 判断地区li中是否显示
    if ($(".cd_store").find("span").hasClass("rotate")) {
      $(".cd_store").find("span").toggleClass("rotate")
      $(".cd_hidstore ul").toggle()
    }
    $(this).find("span").toggleClass("rotate")
    $(".cd_hidarea ul").find("i").removeClass("active")
    $(".cd_hidarea ul").find("i").eq(areaid).addClass("active");
    $(".cd_hidarea ul").toggle()
  })

  // 给地区li中的每一项注册点击事件(事件委托)
  $(".cd_hidarea ul").on("click", "li", function () {
    // 重置基础量
    areaid = $(this).data("id");
    index = 0;
    // 重置内容
    $(".cd_lists ul").html("");

    $(this).parent().hide()
    $(".cd_area").find("span").toggleClass("rotate")
    // 获取点击目标的文字
    var text = $(this)[0].firstChild.textContent.trim().slice(0, 2);
    $(".cd_area i").text(text);
    render();
  })
})();