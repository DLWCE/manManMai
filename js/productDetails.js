$(function () {

  // 初始化区域滚动
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });

  // 获取商品详细信息
  //   1.先获取到商品id 
  var id = getQueryString('productid');
  console.log(id);

  function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return encodeURI(r[2]);
    return null;
  }
  //   2.发送请求
  $.ajax({
    url: "http://localhost:9090/api/getdiscountproduct",
    data: {
      productid: id
    },
    success: function (obj) {
      console.log(obj);
      var html = template('productdetails', obj);
      console.log(html);
      $('.product').html(html);
    }
  });

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
})
mmb.navMenu(); // 导航菜单(导航球)

