$(function () {

    mmb.navMenu();    // 导航菜单(导航球)
    // mmb.navMenu();    // 导航菜单(导航球)
    $("#mui-icon-comeback").on("tap", function () {
        location = "coupon.html"
    });
    var id = getQueryString('couponid')
    // var ttt = getQueryString('ttt')  获取标题的id 渲染到页面
    // $('#title').html(ttt + '优惠券')
    var couponTitle = getQueryString('couponTitle');
    $('#title').html(couponTitle + '优惠券');

    var counts;
    $.ajax({
        url: "http://localhost:9090/api/getcouponproduct",
        data: {
            couponid: id
        },
        success: function (data) {
          counts=data.result.length;
           
            console.log(data);
            for (var i=0;i < data.result.length;i++ ){
                data.result[i].index=i;
                data.result[i].count=data.result.length;
            }
            var html = template("tplCouponproduct", data);

            $(".list").html(html);
            //    给img添加样式
            $('.list img').addClass('mui-media-object mui-pull-left')
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
            mmb.rocket(); // 火箭返回顶部
        }
    });
    // 正则去掉乱码
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    };

    var mmp = new Mmp();
    mmp.popup();
    mmp.turn();
   
   
});

 
function Mmp() {
};

Mmp.prototype = {
   
    popup: function () {
        var that = this;
        // 展示蒙板 图片
        $(".content ul").on("tap", "li .coupondetail", function () {
            that.index = $(this).data("index");
            console.log(that);
            $("#popup img").attr("src", $(".coupondetail").eq(that.index).find("img").attr("src"));
            $("#popup").show();
            // $('#main').css('position','fixed');
        // 隐藏蒙板
            $("#popup").on("tap", function () {
                $("#popup").hide();
                // $('#main').css('position','static');
            })
        });
    },
    turn: function () {
        var that = this;
        
        // 上一页 下一页
        $(".mui-icon-arrowleft").on("tap", function (e) {
            e.stopPropagation();
          
            if (that.index != 0) {
                that.index--;
                $("#popup img").attr("src", $(".coupondetail").eq(that.index).find("img").attr("src"));
            }
        });
        $(".mui-icon-arrowright").on("tap", function (e) {
            e.stopPropagation();
            var count= $('.coupondetail').data("count");
            // console.log(this);
            if (that.index != count-1) {
                that.index++;
                // var main = document.getElementById('main');
                // main.addEventListener('touchmove', function (e) {
                //     e.preventDefault();
                // }, false);
                $("#popup img").attr("src", $(".coupondetail").eq(that.index).find("img").attr("src"));
            }
        });
    },
};