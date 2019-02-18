$(function () {
    // 渲染分类页列表模板
    $.ajax({
        url: "http://localhost:9090/api/getcategorytitle",
        success: function (data) {
            console.log(data);
            var html = template('categoryTitleTpl', data);
            $('#category .mui-table-view').html(html);
        }
    });
    // 渲染商品分类列表模板
    $(".mui-table-view").on('tap','a',function () { 
        var id = $(this).data('id');
        console.log(id)
        $.ajax({
            url:"http://localhost:9090/api/getcategory",
            data:{
                titleid: id
            },
            success: function(data){
                console.log(data);
                var html = template('categoryThingTpl', data);
                $('#category .mui-collapse-content').html(html);
            }
        }) 
     })
     
})
