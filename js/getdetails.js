$(function () {
    //获取url传过来的商品id
    productid = location.search.substring(4);
    $.ajax({
        url: 'http://localhost:9090/api/getmoneyctrlproduct',
        data: {
            productid: productid
        },
        success: function (res) {
            console.log(res);
            var html = template('tplGetDetails', res);
            $('#main .product').html(html);
            $('#comment').html(res.result[0].productComment)
        }
    })

    // mui('.mui-scroll-wrapper').scroll({
    //     deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    // });
    $('.logo').on('tap', function () {
        location = '../index.html'
    })
    // 文字返回按钮
    $('.back').on('tap', function () {
        $(window).scrollTop(0);
    })
    //点击登录返回登录页面
    $('.login').on('tap', function () {
        location = '../pages/login.html'
    })

    //点击注册返回注册页面
    $('.register').on('tap', function () {
        location = '../pages/register.html'
    })

    // $('#main .product').on('tap','.sauce', function () {
    //     var mask = mui.createMask(function(){
           
    //     }); //callback为用户点击蒙版时自动执行的回调；
    //     mask.show(); //显示遮罩       
    //     var $clone =  $('.mui-slider').clone(true);
    //     $('.mui-backdrop').append($clone)
    //     $('.mui-backdrop .mui-slider').show();
    //     // mask.close(); //关闭遮罩
    // })
   

})