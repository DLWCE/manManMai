$(function () {
    mmb.register(); // 底部点击注册按钮点击跳转到登录页面 
    mmb.login(); // 底部登录按钮点击跳转登录页面
    mmb.logo(); // 头部logo点击跳转到主页
    // 渲染导航栏区域
    var categoryId = getQueryString('categoryId');
    console.log(categoryId)
    $.ajax({
        url: "http://localhost:9090/api/getcategorybyid",
        data: {
            categoryid: categoryId
        },
        success: function (data) {
            var html = template('productNavTpl', data);
            $(".nav").html(html);
        }

    })
    var pageNext;
    $.ajax({
        url: 'http://localhost:9090/api/getproductlist',
        data: {
            categoryid: categoryId,
            pageid: 1
        },
        success: function (data) {
            console.log(data)
            pageNext = Math.ceil(data.totalCount / data.pagesize);
            var html = template('productListTpl', data);
            $('#main').html(html);
            $('.mui-content-padded .pageNum2').html(pageNext);
        }
    });


    // 给主体商品列表渲染和分页按钮
    // 下一页
    var page = 1;

    $('.mui-content-padded .nextPage').on('tap', function () {
        if (page < pageNext) {
            ++page;
        } else {
            $('.mui-content-padded .nextPage').attr('href', 'javascript:;')
            // alert('已经是最后一页了')
            mui.alert('已经是最后一页了', '提示', '确定');
        }

        $.ajax({
            url: 'http://localhost:9090/api/getproductlist',
            data: {
                categoryid: categoryId,
                pageid: page
            },
            success: function (data) {
                console.log(data)
                var html = template('productListTpl', data);
                $('#main').html(html);
                $('.mui-content-padded .pageNum1').html(page);
            }
        });
    })


    //上一页
    $('.mui-content-padded .lastPage').on('tap', function () {
        console.log(page);
        if (page > 1) {
            --page;
        } else {
            $('.mui-content-padded .lastPage').attr('href', 'javascript:;')
            mui.alert('目前在第一页,不能再退了', '提示', '确定');
        }

        $.ajax({
            url: 'http://localhost:9090/api/getproductlist',
            data: {
                categoryid: categoryId,
                pageid: page
            },
            success: function (data) {
                var html = template('productListTpl', data);
                $('#main').html(html);
                $('.mui-content-padded .pageNum1').html(page);
            }
        });
    })
    // $('.mui-content-padded .pageNum1').html(pageNext);











    // 使用网上封装好的正则的方式完成url参数的值的获取
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            // 默认使用encodeURI去对中文进行的加密  使用decodeURI解密
            return decodeURI(r[2]);
        }
        return null;
    }

})