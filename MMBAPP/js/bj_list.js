; (function () {

 // 获取跳转前页面传来的id值
 var id = decodeURI(location.search).slice(1);
 console.log(id);
 // 申明一个全局的当前页码
 var currentPage = 1;
 // 申明一个总页码
 var page = 3;


 render()
 // 封装渲染函数
 function render() {
  // 发送导航路径的ajax请求
  $.ajax({
   type: "get",
   url: "http://127.0.0.1:9090/api/getcategorybyid",
   data: {
    categoryid: id
   },
   dataType: "json",
   success: function (res) {
    var htmlStr = template("navPath", res)
    $(".bj_nav ol").html(htmlStr)
   }
  })

  // 发送产品栏的ajax请求
  $.ajax({
   type: "get",
   url: "http://127.0.0.1:9090/api/getproductlist",
   data: {
    categoryid: id,
    pageid: currentPage
   },
   dataType: "json",
   success: function (res) {
    console.log(res);
    var html = template("bj_product", res)
    $(".bj_product ul").html(html);
    // 更新总页码
    page = Math.ceil(res.totalCount / res.pagesize)
    $("#page option").text(currentPage + "/" + page)

    // 动态创建页码
    for (var i = 2; i <= page; i++) {
     var option = $("#page option").eq(0).clone();
     option.text(i + "/" + page)
     $("#page").append(option)
    }
   }
  })

 }

 // 给左按钮注册点击事件
 $(".bj_page .fl").on("click", function () {
  if (currentPage <= 1) {
   return;
  }
  currentPage--;
  $("#page").children().prop("selected", false);
  $("#page").children().eq(currentPage).prop("selected", true);
  render()
 })
 // 给右按钮注册点击事件
 $(".bj_page .fr").on("click", function () {
  if (currentPage >= page) {
   return;
  }
  currentPage++;
  $("#page").children().prop("selected", false);
  $("#page").children().eq(currentPage).prop("selected", true);
  render()
 })


 // 给每一行li注册点击事件（事件委托）
 $(".bj_product ul").on("click", "li", function () {
  var nid = $(this).data("id");
  console.log(nid);
  // 拼接到地址上
  location.href = "bj_productlist.html?" + nid;
 })

})();