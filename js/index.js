//loading
$(window).on('load', function(){
    var animData = {
        wrapper: document.querySelector('.loading'),
        animType: 'svg',
        loop: true,
        prerender: true,
        autoplay: true,
        path: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/35984/LEGO_loader.json'
    };
    var anim = bodymovin.loadAnimation(animData);
    anim.setSpeed(2.9)
    $('.loading').delay(4500).fadeOut()
})


//sect1 도형 움직임
var html = '';
for (var i = 1; i <= 50; i ++) {
    html += '<div class="shape-container--'+i+' shape-animation"><div class="random-shape"></div></div>';
}   
document.querySelector('.shape').innerHTML += html;


// mousewheel
$('section').on('mousewheel', function(e, delta){
    //console.log(delta)
    if (delta>0) {    // 마우스휠을 위로 굴리면 양수
        $('html, body').stop().animate({
            scrollTop: $(this).prev().offset().top
        }, 1000)
    } else if (delta<0) {  // 마우스휠을 아래로 굴리면 음수
        $('html, body').stop().animate({
            scrollTop: $(this).next().offset().top
        }, 1000)
    }
})

//  
$('#menu li').eq(0).addClass('on')

$('#menu li a').on('click', function(){
    $(this).parent().addClass('on').siblings().removeClass('on')
    var index = $(this).parent().index()
    var offTop = $('section').eq(index).offset().top
    $('html').animate({
        scrollTop:offTop
    }, 500)
    return false
}) 


var sDist0 = $('#sect1').offset().top
var sDist1 = $('#sect2').offset().top
var sDist2 = $('#sect3').offset().top
var sDist3 = $('#sect4').offset().top

// 마지막구간이 윈도우높이보다 클때
//var lastSect = $('#sect5').offset().top             
// 마지막구간이 윈도우높이보다 작을때
var lastSect = $('body').height() - $(window).height()
// var sct=0;

$(window).on('scroll', function(){
    var sct = $(this).scrollTop()
    if ( sct>=sDist0 && sct<sDist1 ) {
        $('#menu li').eq(0).addClass('on').siblings().removeClass('on') 
        // $('.letter').removeClass('on')
    } else if ( sct>=sDist1 && sct<sDist2 ) {
        $('#menu li').eq(1).addClass('on').siblings().removeClass('on')
        // $('.letter').removeClass('on')
    } else if ( sct>=sDist2 && sct<sDist3 ) {
        $('#menu li').eq(2).addClass('on').siblings().removeClass('on')
        // $('.letter').removeClass('on')
    } else if ( sct>=sDist3 && sct<lastSect ) {
        $('#menu li').eq(3).addClass('on').siblings().removeClass('on')
        // $('.letter').removeClass('on')
    } else if ( sct>=lastSect ) {
        $('#menu li').eq(4).addClass('on').siblings().removeClass('on')
        // $('.letter').addClass('on') // letter가 계속 보이게 하고 싶은데 안됨

    } 

})

// https://rendro.github.io/easy-pie-chart/
var arrChartColor = ['#92D027', '#63DEF3', '#eb413b', '#ff9d52', '#f9eb2f'];
var arrPercent = [90, 80, 70, 60, 50]

$('.skills').each(function(idx){ //idx 매개변수 = 자동으로 인덱스번호가 됨
    $(this).attr({'data-percent':arrPercent[idx]})//0%rk 90,80,70,60 ...으로 됨
    $(this).easyPieChart({
        animate: 2000,       // 진행시간
        easing: 'easeOutBounce', // 속도함수
        barColor: arrChartColor[idx],   // 채워지는 색상
        trackColor: '#efefef', // 트색 색상
        scaleColor: false, // 눈금선 색상
        lineCap:'round', // 선의 끝 모양(butt, round, square)
        lineWidth:30, // 선의 폭
        size:180, // 원형차트의 크기
        onStart:$.noop,
        onStop:$.noop,
        onStep: function(from, to, percent) {  
            $(this.el).find('.percent').text(Math.round(percent));// 글씨써지는 박스만 지목 html에서 percent박스
        }
    })
})    

var flag = true;
$(window).on('scroll', function(){
    var sct = $(this).scrollTop();
    if (sct>=0 ) { //스킬 구간에 들어오면 sct>=skillTop, 근데 콘솔창에 찍어보면 계속 skillTop이 0이라서 쓸모없음
        //이 구간에 들어오면 그래프 새로그려라
        $('.skills').each(function(idx){
            $(this).data('easyPieChart').disableAnimation().update(0).enableAnimation().update(arrPercent[idx]);
        })
        flag = false
    } else if ( sct===0 && !flag ) { // sct<=skillTop = sct===0 첫번째 구간에 갔을 때를 의미
        $('.skills').each(function(idx){
            $(this).attr({
                'data-percent':0
            })
            $(this).data('easyPieChart').disableAnimation().update(0).enableAnimation().update(0);
        })
        flag = true
    } 
});


TweenMax.to($('#sect3 img:nth-child(2)'), 1, {
    marginTop: 15,
    repeat: -1, 
    yoyo: true, 
    repeatDelay: 0, 
    ease: Quad.easeInOut
});


// contact 메일전송
var name, address, subject, body
$('.contact a').on('click', function(){    
    name = $('#name').val()
    address = '?cc=' + $('#email').val()
    subject = '?subject=' + $('#subject').val()
    body = '?body=' + '[' + name + ']' + $('#message').val()
    href = 'mailto:wdh123456@naver.com' + address + subject + body
    $(this).attr('href', href)
})
