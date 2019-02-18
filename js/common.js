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

mmb.navMenu = function () {

   // 给导航菜单注册点击事件
   $('.circle img').on('tap', function() {
    location = $(this).data('href');
  })


  // 设置导航菜单按钮样式
  $('#nav-menu img').each(function (index, ele) {
    // 计算每个平均旋转的度数
    var deg = 360 / $('#nav-menu img').length
    // 每个元素应该旋转的度数
    var degnum = index * deg;
    // 进行位移
    $(ele).css({
      transform: `rotate(${degnum}deg) translate(0, -.42rem) rotate(-${degnum}deg)`
    })
  })


  // 声明全部变量 鼠标点击导航球的起始x,y坐标和时间
  var navX, navY, oldTime;
  // 开关思想->默认为ture -> false则导航球动画没有完成
  var flag = true;
  $('#nav-menu').on('touchstart', function (e) {
    // 完成动画后才可以获取点击开始的数据
    if (flag) {
      // 进来先清除过度效果
      $(this).css('transition', 'none');
      navX = e.targetTouches[0].clientX;
      navY = e.targetTouches[0].clientY;
      oldTime = Date.now();
    }
  })

  // 导航菜单按钮移动事件
  $('#nav-menu').on('touchmove', function (e) {
    // 如果导航球是展开的时候则不执行任何操作
    if (!$('.circle').hasClass('hide')) {
      return false;
    }

    // 计算位置
    var width = $('body').width() - $(this).width()
    var height = $('body').height() - $(this).height();
    var x = e.targetTouches[0].clientX - $(this).width() / 2;
    var y = e.targetTouches[0].clientY - $(this).height() / 2;
    x = x <= 0 ? 0 : x;
    y = y <= 0 ? 0 : y;
    x = x >= width ? width : x;
    y = y >= height ? height : y;
    // 开始位移
    $(this).css({
      left: x,
      top: y
    })
  })
  //  设置导航菜单吸顶效果 -> 吸附左边 / 吸附右边
  $('#nav-menu').on('touchend', function (e) {
    // 获取手指离开的时间
    var nowTime = Date.now() - oldTime;
    // 获取手指离开的x,y值
    var x = e.changedTouches[0].clientX;
    var y = e.changedTouches[0].clientY;

    // 获取屏幕的大小
    var width = $('body').width();
    var height = $('body').height();
    // 获取当前导航球的宽度
    var navMenuWidth = $(this).width();

    // 增加过度效果
    $(this).css('transition', '.5s');

    // 判断是否是单击还是移动
    if (nowTime < 200 && navX == x && flag) {
      // 进来先设置flag为false
      flag = false;
      // 点击了  导航球显示或隐藏
      $('.circle').toggleClass('hide');

      // 判断是否展开
      if ($('.circle').hasClass('hide')) {
        // 没有展开情况下要按钮要靠边
        var unfoldX = x < width / 2 ? 0 : width - navMenuWidth;
        // 开始位移
        $(this).css({left: unfoldX })
      } else {
        // 获取展开时候导航球的宽度
        var circleX = width / (375 / $('.circle').data('width')); 
        // 计算展开后距离左边的距离
        var scrollLeftX = (circleX - navMenuWidth) / 2;
        // 计算展开后距离右边的距离
        var scrollRightX =  width - (circleX + navMenuWidth) / 2;
        
        var rightX = x < width / 2 ? scrollLeftX : scrollRightX;
        // 展开情况下要按钮要有点距离
        $(this).css({left: rightX})
      }
    } else {
      // 进入这里是为移动了
      if ($('.circle').hasClass('hide')) {
        // 判断此时的位置在左边还是右边
        if (x < width / 2) {
          $(this).css({
            left: 0
          })
        } else {
          $(this).css({
            left: width - navMenuWidth
          })
        }
      }
    }
  });

  // 判断过度动画是否完成
  $('.circle').on('transitionend', function () {
    // 还必须按钮不是展开的时候才恢复开关flag
    flag = true;
  })
}

// 底部点击注册按钮点击跳转到登录页面 
// 需要拼接自己的url过去(好让用户注册完跳转回来)
$('.register').on('tap', function () {
  location = '/pages/register.html?returnUrl=' + location.href;
})

// 底部登录按钮点击跳转登录页面
$('.login').on('tap', function () {
  location = '/pages/login.html?returnUrl=' + location.href;
})

// 头部logo点击跳转到主页
$('.logo').on('tap', function () {
  location = '/index.html';
})

// 获取url?后面的参数
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return encodeURI(r[2]);
  return null;
}