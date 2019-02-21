//当前页
var pageCurent;
//总页数
var totalPage;
queryData(0);
//分页数据接口调用以及渲染模板
function queryData(page) {
    //当当前页为第一页和最后一页时 不再渲染数据
    if (page < 0 || page > 14) return;
    pageCurent = page;

    $.ajax({
        url: 'http://localhost:9090/api/getmoneyctrl',
        data: {
            pageid: page,

        },
        success: function (res) {
            console.log(res);
            totalPage = Math.ceil(res.totalCount / res.pagesize);
            var html = template('tplMoneyCtrl', res);
            $('#main .mui-table-view').html(html);
            selectData(totalPage);
            $('#selectAge').val(pageCurent + 1);
        }
    })
}
//绑定选择框分页数据
function selectData(totalPages) {
    var str = '';
    for (var i = 0; i < totalPages; i++) {
        str += '<option value="' + (1 + i) + '">' + (i + 1) + '/' + totalPages + '</option>'
    }
    //加到选择框
    $('#selectAge').html(str)
}

$(function () {
    //分页选择框数据改变重新绑定
    $('#paging').on('change', '#selectAge', function (e) {
        e.preventDefault();
        queryData(this.value - 1)


    })

    // $('#paging').on('tap','#next',function(){
    //     console.log(1);
    //     a=1;
    // })
    //logo返回首页
    $('.logo').on('tap', function () {
        location = '../index.html'
    })


    //点击登录返回登录页面
    $('.login').on('tap', function () {
        location = '../pages/login.html'
    })

    //点击注册返回注册页面
    $('.register').on('tap', function () {
        location = '../pages/register.html'
    })

    mmb.navMenu();

    //获得slider插件对象
   
})