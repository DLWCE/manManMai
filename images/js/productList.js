$(function () {
            // 渲染导航栏区域
            var categoryId = getQueryString('categoryId');
            console.log(categoryId)
            $.ajax({
                url: "http://localhost:9090/api/getcategorybyid",
                data: {
                    categoryid: categoryId
                },
                success: function (data) {
                    // console.log(data)
                    var html = template('productNavTpl', data);
                    $(".nav").html(html);
                }

            })
            var dataPage;

            $.ajax({
                url: 'http://localhost:9090/api/getproductlist',
                data: {
                    categoryid: categoryId,
                    pageid: 1
                },
                success: function (data) {
                    // console.log(data)
                    var html = template('productListTpl', data);
                    dataPage = data.result;
                    $('#main').html(html);
                }
            });


            // 给主体商品列表渲染和分页按钮
            // 下一页
            var page = 1;
            console.log(dataPage);
            $('.mui-content-padded .nextPage').on('tap',function(){
                ++page;
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
                    }
                });
            })


            //上一页
            $('.mui-content-padded .lastPage').on('tap',function(){
                console.log(page);
                --page;
                $.ajax({
                    url: 'http://localhost:9090/api/getproductlist',
                    data: {
                        categoryid: categoryId,
                        pageid: page
                    },
                    success: function (data) {
                        // console.log(data)
                        var html = template('productListTpl', data);
                        $('#main').html(html);
                    }
                });
            })





            





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