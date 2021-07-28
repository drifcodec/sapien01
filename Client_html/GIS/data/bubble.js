$(function() {
    var noticeData = [
        { item: 'duplicated_mast_item', color: 'purple', pannel: 'duplicated mast item' },
        { item: 'normal', color: 'green', pannel: 'normal' },
        { item: 'medium_risk', color: 'yellow', pannel: 'medium_risk' },
        { item: 'high_risk', color: 'red', pannel: 'high_risk' },
        { item: 'low_risk', color: 'blue', pannel: 'low_risk' }
    ];
    var html = '<div id="activeBubble">';
    for (var i = 0; i < noticeData.length; i++) {
        var nt = noticeData[i];
        html += '<div class="ball ball_' + nt.color + '" title="' + nt.item + '"><a href="javascript:;" data-pannel="' + nt.pannel + '">' + nt.number + '</a></div>';
    }
    html += '</div>';
    $('body').append(html);

    var bw = $('#activeBubble').width(); //边界宽
    var bh = $('#activeBubble').height(); //边界高
    var maxX = 8,
        maxY = 16; //最高速
    var playBall = function() {
        var ball;
        var x, y, l, t, w, h;
        for (var i = 0; i < noticeData.length; i++) {
            nt = noticeData[i];
            ball = $('#activeBubble .ball_' + nt.color);
            l = $(ball).position().left; //球左
            t = $(ball).position().top; //球上
            w = $(ball).width(); //球宽
            h = $(ball).height(); //球高

            fx = $(ball).data('fx') || 1; //横向正负方向
            fy = $(ball).data('fy') || 1; //竖向正负方向
            x = $(ball).data('x') !== "" && $(ball).data('x') !== undefined ? $(ball).data('x') : Math.random() * maxX / 2 + maxX / 2; //横向步进距离
            y = $(ball).data('y') !== "" && $(ball).data('y') !== undefined ? $(ball).data('y') : Math.random() * maxY / 2 + maxY / 2; //竖向步进距离

            //横判断
            if (l + fx * x == 0 || l + fx * x + w == bw) { //正好到达，开始反弹
                x = Math.random() * maxX / 2 + maxX / 2;
                fx = fx == -1 ? 1 : -1;
            } else if (l + fx * x < 0) { //即将越左界
                x = l;
            } else if (l + fx * x + w > bw) { //即将越右界
                x = bw - l - w;
            }
            $(ball).data('x', x);
            $(ball).data('fx', fx);

            //竖判断
            if (t + fy * y == 0 || t + fy * y + h == bh) { //正好到达，开始反弹
                y = Math.random() * maxY / 2 + maxY / 2;
                fy = fy == -1 ? 1 : -1;
            } else if (t + fy * y < 0) { //即将越上界
                y = t;
            } else if (t + fy * y + h > bh) { //即将越下界
                y = bh - t - h;
            }
            $(ball).data('y', y);
            $(ball).data('fy', fy);
            $(ball).css({ left: l + fx * x, top: t + fy * y });

        }
    }

    var limit = 200;
    var ballInterval = setInterval(playBall, limit);
    $('#activeBubble .ball').hover(function() {
        clearInterval(ballInterval);
    }, function() {
        ballInterval = setInterval(playBall, limit);
    });
    style = "color:white;padding-top:20%;padding-right:14%;line-height:80%;"
    style_p = "text-align:center;font-size:60%";
    //给小球赋值
    $('.ball a[data-pannel="duplicated mast item"]').show().html('<h4 style="' + style + '">0<br><p style="' + style_p + '">abnormal</p></h4>')

    $('.ball a[data-pannel="high_risk"]').show().html(high_risk + '<br>' + "<font style='inline-height:30px'> high</font>");

    $('.ball a[data-pannel="high_risk"]').show().html('<h4 style="' + style + '">0<br><p style="' + style_p + '">high</p></h4>')
    $('.ball a[data-pannel="low_risk"]').show().html('<h4 style="' + style + '">0<br><p style="' + style_p + '">low </p></h4>');
    $('.ball a[data-pannel="medium_risk"]').show().html('<h4 style="' + style + '">0<br><p style="' + style_p + '">medium </p></h4>');
    $('.ball a[data-pannel="normal"]').show().html('<h4 style="' + style + '" id="normal_site" >0<br><p style="' + style_p + '">normal </p></h4>');



    //小球被点击事件
    $('.ball a').click(function() {
        /*      var value = $(this).attr('data-pannel');
             value = value.replace('_',' ');
             console.log(value);
             if(value == 'duplicated mast item'){
                 S('site_model_datagrid').search(    
                 {
                     'risk_level': '',
                     'abnormal_reason': value
                     }
                 )
             }else{
                 S('site_model_datagrid').search(    
                 {'risk_level': value,
                 'abnormal_reason': '',
                 }
                 )
             } */
    });


});