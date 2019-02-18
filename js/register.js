$(function () {
  // 手机验证点击获取验证码
  $('.getvcode-btn').on('tap', function () {
    var getvodeValue = $('.getvcode').val().trim();
    if (getvodeValue == 5705) {
      mui.alert('手机验证码为: 8888', '提示', '确定');
    } else {
      mui.alert('请输入获取手机验证码', '提示', '确定');
    }
  });
});

// 注册按钮提交表单->注册账号
$('.register-btn').on('tap', function () {
  // 开关思想, 只有全部表单都有值才true -> 如果是没有输入则flase
  var flag = true;

  // 遍历所有表单 -> 非空判断
  $('input').each(function (index, ele) {
    var value = $(ele).val().trim();
    if (value == '') {
      var message = $(ele).data('user');
      mui.toast(message + '不能为空,请重新输入', {
        duration: 1500,
        type: 'div'
      });
      // 只有有空值开关思想则不执行
      flag = false;
      return false;
    }
  });
  if (flag) { // 进入这里证明表单都有值

    // 用户名长度判断
    var username = $('.username').val().trim();
    if (username.length < 6 || username.length > 20) {
      mui.toast('请输入6位-20位合法的用户名', {
        duration: 1500,
        type: 'div'
      });
      return false;
    }
    // 密码长度判断
    var password = $('.password').val().trim();
    if (password.length < 6 || password.length > 20) {
      mui.toast('请输入6位-20位合法的密码', {
        duration: 1500,
        type: 'div'
      });
      return false;
    }

    // 判断手机号是否为有效手机号
    var mobile = $('.mobile').val().trim();
    if (!(/^1(3|4|5|7|8|9)\d{9}$/.test(mobile))) {
      mui.toast('请输入合法的手机号', {
        duration: 1500,
        type: 'div'
      });
      return false;
    }

    // 判断手机验证码是否正确
    if ($('.mobilevcode').val().trim() != 8888) {
      mui.toast('手机验证码错误,请重新输入', {
        duration: 1500,
        type: 'div'
      });
      return false;
    }

    // 邮箱验证
    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    var eamil = $('.eamil').val().trim();
    if (!reg.test(eamil)) {
      mui.toast('请输入正确的邮箱地址', {
        duration: 1500,
        type: 'div'
      });
      return false;
    }

    // 如果从别的页面中跳转过来带了renturnUrl则获取传递过来的url
    var url = getQueryString('returnUrl');
    if (url) {
      // 如果有则拼接url
      location = '/pages/login.html?returnUrl=' + url;
    } else {
      // 如果无就直接跳转页面
      location = '/pages/login.html';
    }
  }

  
});