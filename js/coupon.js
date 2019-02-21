$(function(){

 $("#mui-icon-back").on("tap",function(){
    location = "../index.html"
 });

 $("#tocouponpage").on("tap",function(){
    location = "../index.html"
 });
 
 $(".login").on("tap",function(){
    location = "login.html"
 });
 $(".register").on("tap",function(){
    location = "register.html"
 });


    $.ajax({
        url: "http://localhost:9090/api/getcoupon",
        success: function (data) {
            var html = template("tplCoupon",data);
           console.log(data);
           $(".mui-row").html(html);

        }
    });
// 火箭按钮点击回到顶部
$('#rocket').on('tap', function () {
    mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 500);
  });
    mmb.navMenu();    // 导航菜单(导航球)



});
