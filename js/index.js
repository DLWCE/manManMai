$(function () {
  mmb.navMenu();    // 导航菜单(导航球)
  mmb.register();   // 底部点击注册按钮点击跳转到登录页面 
  mmb.login();      // 底部登录按钮点击跳转登录页面
  mmb.logo();       // 头部logo点击跳转到主页
  mmb.scroolTop();  //底部返回顶部按钮注册点击返回顶部事件
  // 初始化轮播图
  var mySwiper = new Swiper('.swiper-container', {
    loop: true, // 循环模式选项
    // 自动滑动
    autoplay: {
      delay: 1500,
      stopOnLastSlide: false,
      disableOnInteraction: true,
    },
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    }

  })

  // 获取菜单栏数据动态渲染
  $.ajax({
    url: 'http://localhost:9090/api/getindexmenu',
    success: function (data) {
      var html = template('menuTpl', data);
      // 渲染到页面上
      $('.menu-box').html(html);
      // 设置动画
      $('.menu-box .mui-col-xs-3').each(function (index, ele) {
        $(ele).css({
          animation: 'flipInY 1s ' + (index * 0.2) + 's ease-in-out both'
        })
        if (index > 7) {
          $(ele).css({
            animation: 'flipInY 1s ' + ((index - 8) * 0.2) + 's ease-in-out both'
          })
        }
      })
    }
  });

  // 给菜单栏的更多按钮添加点击事件 -> 显示隐藏第3排按钮
  $('.menu-box').on('tap', '.mui-col-xs-3', function () {
    if ($(this).hasClass('menu-more')) {
      $('.menu-box .hide').toggle();
    } else {
      location = $(this).data('titlehref');
    }
  })

  // 获取动态折扣商品列表信息 -> 并渲染到页面上
  $.ajax({
    url: 'http://localhost:9090/api/getmoneyctrl',
    success: function (data) {
      console.log(data);
      var html = template('discountTpl', data);
      $('#discount .product-list').html(html);
      $('#discount .product-list img').addClass('mui-media-object mui-pull-left')
      // 初始化区域滚动
      mui('.mui-scroll-wrapper').scroll({
        bounce: false, // 是否启动回弹效果
        indicators: false, //是否显示滚动条
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      });

      // 
      mmb.rocket();

    }
  });


  // 导航菜单按钮点击选装


  // $('#nav-menu').on('touchmove',function (e) {
  //   // var x = e.changedTouches[0].clientX;
  //   // var y = e.changedTouches[0].clientY;
  //   var x = e.changedTouches[0].clientX - $(this).offset().left;
  //   var y = e.changedTouches[0].clientY -$(this).offset().top;
  //   console.log(x,y);
  //   $(this).css({
  //     // left:e.changedTouches[0].clientX,
  //     // top:e.changedTouches[0].clientY,
  //     transform: `translate(${x}px,${y}px)`
  //   })

  // })

})