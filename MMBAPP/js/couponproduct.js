; (function () {

  // 获取传送过来的id
  var couponid = decodeURI(location.search).slice(1) || 0;

  // 发送ajax请求
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:9090/api/getcouponproduct",
    data: {
      couponid: couponid
    },
    dataType: "json",
    success: function (res) {
      console.log(res);
      var htmlStr = template("cp_contents", res)
      $(".cp_contents ul").html(htmlStr)
    }
  })

  // 给每个li注册一个点击事件（事件委托），弹出模态框
  $(".cp_contents ul").on("click", "li", function () {
    // var id = $(this).data("id")
    // console.log(id);
    // var q1 = $(this)["0"].childNodes[1].children[0].src;
    // var q2 = $(this).next()["0"].childNodes[1].children[0].src;
    // var q3 = $(this).prev()["0"].childNodes[1].children[0].src;
    // $(".swiper-slide img").eq(1).attr("src", q1)
    // $(".swiper-slide img").eq(2).attr("src", q2)
    // $(".swiper-slide img").eq(3).attr("src", q3)
    // console.log($(".swiper-slide"));
    // console.log(q1);
    // console.log(q2);
    // console.log(q3);

    $(".cp_modal").show();

  })


  var mySwiper = new Swiper('.swiper-container', {
    autoplay: true,//可选选项，自动滑动
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  })
})();