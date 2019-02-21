$(function () {
    mmb.navMenu(); // 导航菜单(导航球)
    mmb.register(); // 底部点击注册按钮点击跳转到登录页面 
    mmb.login(); // 底部登录按钮点击跳转登录页面
    mmb.logo(); // 头部logo点击跳转到主页
    $.ajax({
        url: 'http://localhost:9090/api/getbrandtitle',
        success: function (data) {
            console.log(data);
            var html = template('hotBrandsTpl', data);
            $('.mui-table-view').html(html);
            // mmb.rocket(); // 点击火箭返回顶部

        }
    })
})