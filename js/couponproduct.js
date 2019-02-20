$(function () {
    $("#mui-icon-comeback").on("tap", function () {
        location = "coupon.html"
    });
    var id = getQueryString('couponid')
    // var ttt = getQueryString('ttt')  获取标题的id 渲染到页面
    // $('#title').html(ttt + '优惠券')
    var couponTitle = getQueryString('couponTitle');
    $('#title').html(couponTitle + '优惠券');
    $.ajax({
        url: "http://localhost:9090/api/getcouponproduct",
        data: {
            couponid: id
        },
        success: function (data) {
            console.log(data);
            var html = template("tplCouponproduct", data);

            $(".list").html(html);
            //    给img添加样式
            $('.list img').addClass('mui-media-object mui-pull-left')
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
            $("#popup img").attr("src", $(".coupondetail").eq(that.index).find("img").attr("src"));
            $("#popup").show();
        // 隐藏蒙板
            $("#popup").on("tap", function () {
                $("#popup").hide();
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
            if (that.index != that.couponproducts) {
                that.index++;
                var main = document.getElementById('main');
                main.addEventListener('touchmove', function (e) {
                    e.preventDefault();
                }, false);
                $("#popup img").attr("src", $(".coupondetail").eq(that.index).find("img").attr("src"));
            }
        });
    },
};