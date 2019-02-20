$(function(){
    // 初始化区域滚动
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    // 获取商品数据
    $.ajax({
        url: "http://localhost:9090/api/getinlanddiscount",
        success: function (obj) {
            // console.log(obj);  
            var html = template('productlist',obj);
            // console.log(html);
            $('.product-list').html(html);
        }
    });
})

// 给每个商品注册点击跳转至商品详情页事件
    
    $('.product-list').on('tap','.product',function(){
        // console.log(this.data);
        var productid = $(this).attr('data-productid')
        console.log(productid);
        // 将商品id拼接至url并跳转页面
        location = 'productdetails.html?productid='+ productid;
        
    })

    var mmb = {};
// 火箭(返回顶部按钮) 注册点击事件
mmb.rocket = function () {
  // 滚动到一定距离显示/隐藏火箭(返回顶部按钮)
  var scroll = mui('.mui-scroll-wrapper').scroll();
  document.querySelector('.mui-scroll-wrapper').addEventListener('scroll', function (e) {

    // 超过200px显示 -  否则隐藏
    if (scroll.y < -200) {
      $('#rocket').css({
        opacity: 1
      })
    } else {
      $('#rocket').css({
        opacity: 0
      })
    }
  });

  // 火箭按钮点击回到顶部
  $('#rocket').on('tap', function () {
    mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 500);
  });
}
mmb.rocket();
