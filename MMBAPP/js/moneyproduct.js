; (function () {
 // 接受上一页传过来的id
 var cid = decodeURI(location.search).slice(1) || 26;
 console.log(cid);

 // 发送ajax请求
 $.ajax({
  type: "get",
  url: "http://127.0.0.1:9090/api/getmoneyctrlproduct",
  data: {
   productid: cid
  },
  dataType: "json",
  success: function (res) {
   console.log(res);
   var htmlStr = template("sm_datails", res)
   $(".sm_datails").html(htmlStr)
  }
 })


})();