$(function () {
    var currentId =0;
    $(window).scrollTop(0);
    console.log($(window).scrollTop());
    // 从上之下添加功能
    // 点击返回按钮，返回上一页
    $('.back').on('tap', function () {
        window.history.back();
    })
    // 点击顶部下载图标，到下载页面
    $('.downLoad').on('tap', function () {
        location.href = "../index.html";
    })

    // nav滑动动态生成
    $(window).on('resize',function(){
        console.log('111');
    })
    // 滚动条长度
    var scrollLength=0;
    // 滚动容器长度
    var scrollWrapper = $('.nav-muban').width();
    // console.log(scrollWrapper);
    queryNavList();
    // 渲染nav方法
    function queryNavList() {
        $.ajax({
            url: "http://localhost:9090/api/getbaicaijiatitle",
            success: function (res) {
                console.log(res);
                var html = template('navTpl', res);
                $('.nav-muban').html(html);
                // 设置滚动框的长度
                
                $('.nav-list li').each(function (index, value) { 
                     scrollLength += $(value).width();
                });
                $('.mui-scroll').css('width',scrollLength / 100 +'rem');

            //    为页面注册滚动事件
            console.log($(window).scrollTop());
            
                    $(window).on('scroll',function(){
                        if($(window).scrollTop()>=$('#header').height()){
                            $('.nav-wraper').css({"position":'fixed',"top":0});
                            $('#main').css("paddingTop",$('.nav-wraper').height()); 
                        }else{
                            $('#main').css("paddingTop",0); 
                            $('.nav-wraper').css({"position":'relative'});
                        }
                        if($(window).scrollTop()>=300){
                            $('#goTop').show();
                        }else{
                            $('#goTop').hide();
                        }
                        console.log($(window).scrollTop());
    
                    })
                          
              
              
                // nav滑动
                setTimeout(function(){
                    mui('.mui-scroll-wrapper').scroll({
                        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                        scrollY: false, //是否竖向滚动
                        scrollX: true, //是否横向滚动
                        indicators: false, //是否显示滚动条
                    });
                },1000)
              
            }
        });
    }
    // 为nav每个li添加tap事件
      $('.nav-muban').on('tap','.nav-list li',function(){
        $(this).addClass('active').siblings().removeClass('active');
        $('.quanBu').removeClass('active');
        $(window).scrollTop($('#header').height());
        // 点击li位移一小段
        // li元素的索引
        //  console.log($(this).index());
        // 1.当点击第四个元素时，scroll移动一个元素的距离
        // 2.当移动到scroll的长度-swiper的长度时停止移动
        var disT =scrollWrapper -scrollLength;
        var disTT =0;
        var index1 =$(this).index();
        for(var i=0;i<index1-2;i++){
            disTT += -$('.nav-list li').eq(i).width();
        }
        if(disTT <= disT){
            disTT = disT;
        }
        $('.mui-scroll').css('transform',"translate3d("+disTT+"px, 0px, 0px)");
        
   
        currentId = $(this).data('id');
        queryProduct();
    })
    // 为quanBu按钮添加点击事件
    $('.nav-muban').on('tap','.quanBu',function(){
        $('.quanBu').addClass('active');
        $('.nav-list li').removeClass('active');
        $(window).scrollTop($('#header').height());
        // 当点击全部按钮时，scroll移动至最右端
        $('.mui-scroll').css('transform',"translate3d(0px, 0px, 0px)");

        currentId = $(this).data('id');
        queryProduct();
    })

    // 渲染product方法
    queryProduct();
    function queryProduct(){
        $.ajax({
            url: "http://localhost:9090/api/getbaicaijiaproduct",
            data:{titleid:currentId},
            success: function (res) {
                console.log(res);
                var html = template('productTpl',res);
                $('.content').html(html);
            }
        });
    }
    // 文字返回按钮
    $('.fanhui').on('tap',function(){
        $(window).scrollTop(0);
    })
    function goUp(){
        var flag = false;
        var timeId = setInterval(function(){
            var dis = $(window).scrollTop(); 
            var step =Math.floor((0 - dis)/10) ;
            dis += step;
            if(dis<=0){
                dis =0;
                flag = true;
            }
            $(window).scrollTop(dis); 
            if(flag){
                clearInterval(timeId);
            }
        },20)   
    }
    // 图标向上按钮
    $('#goTop').on('tap',function(){
        goUp();
    })
    // 点击菜单按钮，显示和隐藏搜索框
    $('.search-menu').on('tap', function () {
        $(' .search').toggleClass('hide');
    })
    // 登录按钮
    $('.login').on('tap',function(){
        location.href = './login.html';
    })
    // 注册按钮
    $('.register').on('tap',function(){
        location.href = './register.html';
    })
    // 点击手机版返回首页
    $('.second').on('tap',function(){
        location.href = '../index.html'
    })
})