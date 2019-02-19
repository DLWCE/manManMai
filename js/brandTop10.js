$(function() {
    var id = Number(location.search.split('&')[0].split('=')[1]);
    var brandTitle = decodeURI(location.search.split('&')[1].split('=')[1]);
    // console.log(brandTitle);
    var keyword = brandTitle.substr(0,brandTitle.indexOf('十'));
    // console.log(keyword);

    //xxx哪个牌子好
    $.ajax({
        url:'http://localhost:9090/api/getbrand',
        data:{
            brandtitleid:id
        },
        success:function(data) {
            // console.log(data);
            var html1 = template('brandsTpl',data);
            $('.brands .mui-table-view').html(html1);
            $('.brands h4').html(keyword + '哪个牌子好');
        }
    })
    //xxxx销量排行
    $.ajax({
        url:'http://localhost:9090/api/getbrandproductlist',
        data:{
            brandtitleid:id,
            pagesize :4
        },
        success:function(data) {
            // console.log(data);
            var html2 = template('numTpl',data);
            $('.num .mui-table-view').html(html2);
            $('.num h4').html(keyword + '产品销量排行'); 
            queryComment(data);
        }
    })
    //xxxx最新评论
    function queryComment(data) {
        $.ajax({
            url:'http://localhost:9090/api/getproductcom',
            data:{
                productid:id
            },
            success:function(res) {
                var i = 0;
                
                $(res.result).each(function() {
                   if(i < data.result.length) {
                    data.result[i].comName = this.comName;
                    data.result[i].comTime = this.comTime;
                    data.result[i].comContent = this.comContent;
                    i++;
                   }else {
                    return false;
                   }
                })
                console.log(data);
                var html3 = template('commentTpl',data);
                $('.commentArea .content').html(html3);
                $('.comment h4').html(keyword + '最新评论'); 
            }
        })
    }
})