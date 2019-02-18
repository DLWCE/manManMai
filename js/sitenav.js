$(function() {
    // 返回上一级
    $('#header .left').on('tap', function() {
            history.back();
        })
        // 初始化上下拉动
    mui('.mui-scroll-wrapper').scroll({
        indicators: true, //是否显示滚动条
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    // 请求品牌数据
    $.ajax({
        url: "http://localhost:9090/api/getsitenav",
        success: function(data) {
            var html = template('navlinkTpl', data);
            $('#nav > .mui-row').html(html);
        }
    })
})