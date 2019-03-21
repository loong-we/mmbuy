; (function () {

  var titleid = 0;


  // 发送ajax请求
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:9090/api/getbaicaijiatitle",
    dataType: "json",
    success: function (res) {
      console.log(res);
      var htmlstr = template("bcj_dis", res)
      $(".bcj_dis ul").html(htmlstr)
      // 给第一个li增加current标签
      $(".bcj_dis ul").children().eq(0).addClass("current")

      // 申明一个变量储存li累加的宽度
      var width = 0;
      $(".warpper ul li").each(function (index, ele) {
        width += $(ele).outerWidth(true);
      })
      console.log(width);
      // 将计算到的width赋值给ul
      $(".warpper ul").width(width);
      // 插件的初始化
      new IScroll('.warpper', {
        scrollX: true,
        scrollY: false
      });
    }
  })


  render()
  // 封装渲染页面的函数
  function render() {
    // 发送ajax请求,获取商品数据
    $.ajax({
      type: "get",
      url: "http://127.0.0.1:9090/api/getbaicaijiaproduct",
      data: {
        titleid: titleid
      },
      dataType: "json",
      success: function (res) {
        console.log(res);
        var htmlStr = template("bcj_list", res)
        $(".bcj_list ul").html(htmlStr)


      }
    })
  }

  // 给导航栏的每个li注册点击事件，进行跳转
  $(".bcj_dis ul").on("click", "li", function () {
    titleid = $(this).data("id");
    $(this).addClass("current").siblings().removeClass("current")
    render()
  })

})();