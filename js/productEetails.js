$(function () {
    mmb.logo(); // 头部logo点击跳转到主页

    // 渲染导航栏区域
    var categoryId = getQueryString('categoryId');
    console.log(categoryId)
    $.ajax({
        url: "http://localhost:9090/api/getcategorybyid",
        data: {
            categoryid: categoryId
        },
        success: function (data) {
            console.log(data)
            var html = template('productNavTpl', data);
            $(".nav").html(html);
        }
    })
    //商品详情区域渲染
    var productId = getQueryString('productId');
    $.ajax({
        url:'http://localhost:9090/api/getproduct',
        data:{productid:productId},
        success:function(data){
            var html = template('productMoreTpl',data);
            $('.details').html(html);
        }
    });
    // 评论区域渲染
    $.ajax({
        url:'http://localhost:9090/api/getproductcom',
        data:{productid :productId},
        success:function(data){
            console.log(data)
            var html = template('commentTpl',data);
            $('.evaluate_list .evaluate_info').html(html);
        }
    });

    //底部按钮添加点击事件
    $('#footer .login').on('tap',function(){
        location = '../pages/login.html'
    })
    $('#footer .register').on('tap',function(){
        location = '../pages/register.html'
    })

    // 使用网上封装好的正则的方式完成url参数的值的获取
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            // 默认使用encodeURI去对中文进行的加密  使用decodeURI解密
            return decodeURI(r[2]);
        }
        return null;
    }

})