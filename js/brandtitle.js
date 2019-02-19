$(function() {
    $.ajax({
        url:'http://localhost:9090/api/getbrandtitle',
        success:function(data) {
            console.log(data);
            var html = template('hotBrandsTpl',data);
            $('.mui-table-view').html(html);
        }
    })
})