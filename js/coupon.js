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





});
