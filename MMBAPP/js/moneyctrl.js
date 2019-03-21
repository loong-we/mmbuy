; (function () {
 // 申明一个全局变量，储存Id
 var id;
 var pageid = decodeURI(location.search).slice(1) || 1;
 var page = 1;
 console.log(pageid);

 render();
 function render() {
  // 渲染产品信息
  $.ajax({
   type: "get",
   url: "http://127.0.0.1:9090/api/getmoneyctrl",
   data: {
    pageid: pageid
   },
   dataType: "json",
   success: function (res) {
    console.log(res);
    // id = res.result[0].productId;
    // console.log(id);
    page = Math.ceil(res.totalCount / res.pagesize)
    // console.log(page);
    var htmlStr = template("sm_dis", res)
    $(".sm_dis ul").html(htmlStr);
    console.log(pageid);
    // $("#sm_page option").eq(0).html(pageid + "/" + page)
    // // 动态创建option
    // for (var i = 2; i < page; i++) {
    //  var option = $("#sm_page option").eq(0).clone(true)
    //  option.text(i + "/" + page);
    //  $("#sm_page").append(option)
    //  // render();
    // }

   }
  })
 }

 // 左按钮注册点击事件
 $(".sm_page .fl").on("click", function () {
  if (pageid <= 1) {
   return;
  }
  pageid--;
  // $("#sm_page").children().prop("selected", false);
  // $("#sm_page").children().eq(pageid).prop("selected", true)
  render()
 })
 // 右按钮注册点击事件
 $(".sm_page .fr").on("click", function () {
  if (pageid >= page) {
   return;
  }
  pageid++;
  // $("#sm_page").children().prop("selected", false);
  // $("#sm_page").children().eq(pageid).prop("selected", true)
  render()
 })



 // 产品列表 的li注册点击事件（事件委托）
 $(".sm_dis ul").on("click", "li", function () {
  var cid = $(this).data("id");
  console.log(cid);
  // 将id拼接给路径
  location.href = "moneyproduct.html?" + cid;
 })


})();


