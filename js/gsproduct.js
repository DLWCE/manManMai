$(function() {
    // 返回上一级
    $('#header .left').on('tap', function() {
            history.back();
        })
        // 初始化上下拉动
    mui('.mui-scroll-wrapper').scroll({
        indicators: true,
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    $('.title a').on('tap', function() {
        var sortType = $(this).data('sort-type');
        var sort = $(this).data('sort');
        sort = sort == 1 ? 2 : 1;
        $(this).data('sort', sort);
        if (this == $('.title .tag')[0]) {
            return false;
        };
        if (sort == 1) {
            sort = 2;
            $(this).find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
            $('.twoList').stop(true, false).fadeOut();
        } else {
            sort = 1;
            $(this).find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
            $('.twoList').stop(true, false).fadeIn();
        }
        // 获取id来对应接口后缀
        var id = $(this).data('id');
        $.ajax({
            url: 'http://localhost:9090/api/' + id,
            success: function(data) {
                var html = template('shopIdTpl', data);
                $('.titleList').html(html);

            }
        })
    })
    $('.twoList ul').on('tap', '.mui-table-view-cell', function() {
        // var id = $(this).data('id');
        var shopid = $(this).data('shop');
        console.log(shopid);
        var areaid = $(this).data('area')
        console.log(areaid);
        if (areaid == undefined) {
            areaid = 0;
        }
        if (shopid == undefined) {
            shopid = 0;
        }
        // console.log(id);
        $.ajax({
            url: "http://localhost:9090/api/getgsproduct",
            data: {
                shopid: shopid,
                areaid: areaid
            },
            success: function(data) {
                console.log(data)
                var html = template('productIdTpl', data);
                $('#main .mui-row').html(html);
            }
        })
    })

    // 页面刷新时候默认请求一次
    $.ajax({
        url: "http://localhost:9090/api/getgsproduct",
        data: {
            shopid: 0,
            areaid: 0
        },
        success: function(data) {
            console.log(data)
            var html = template('productIdTpl', data);
            $('#main .mui-row').html(html);
        }
    })
})