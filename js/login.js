$(function () {

  mmb.register();   // 底部点击注册按钮点击跳转到登录页面 
  // mmb.login();      // 底部登录按钮点击跳转登录页面
  mmb.logo();       // 头部logo点击跳转到主页

  $('.login').on('tap', function () {
    var username = $('.username').val().trim();
    var password = $('.password').val().trim();
    // 非空判断
    if (!username) {
      mui.toast('用户名不能为空!', {
        duration: 'long',
        type: 'div'
      });
      return false;
    }
    if (!password) {
      mui.toast('密码不能为空!', {
        duration: 'short',
        type: 'div'
      });
      return false;
    }

    // 获取传递过来的url
    var url = getQueryString('returnUrl');
      // if (url) {
      //   // 有则跳转链接过来的页面
      //   location = url;
      // }else {
        // 没有则跳到主页
        location = '/index.html';
      // }
  })

  // 点击注册跳转注册页面
  $('.register').on('tap', function () {
    location = '/pages/register.html';
  })
});