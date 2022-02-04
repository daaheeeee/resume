$(window).on('load', function(){   
    $('.loading').delay(3000).fadeOut() //3초동안 딜레이 했다가 없애줘, hide()는 넓이 높이 둘 다 사라짐,괄호안에 초 써야 함, fadeOut()는 빈괄호로 쓰면 됨
})

//새로고침 했을 때 스크롤바를 맨 위로 올라가게
$('html, body').stop().animate({
    scrollTop : 0
}, 1000)

$('.slideInner').slick({
    autoplay:true,
    autoplaySpeed:5000,
    speed:1000,
    dots:false,
    prevArrow:'<button class="slick-arrow slick-prev"><img src="./images/back.png" alt="이전버튼"></button>',
    nextArrow:'<button class="slick-arrow slick-next"><img src="./images/next (1).png" alt="다음버튼"></button>',
    fade:false,
    vertical: false, 
    slidesToShow:1,
    slidesToScroll:1,
    arrows: true,
    pauseOnHOver:false,
   
})



$('#sect2 .abSlide').slick({
    centerMode: true,
    centerPadding: '0',
    autoplay: false, // 자동재생
    speed: 600, // 바뀌는 시간
    slidesToShow: 1, // 보여질 슬라이드 수
    slidesToScroll: 1, // 이동슬라이드 수
    cssEase:'linear', // 속도함수
    arrows: true, // 좌우화살표 사용여부
    prevArrow:'<button class="slick-arrow slick-prev2"><i class="fas fa-chevron-left"></i></button>',
    nextArrow:'<button class="slick-arrow slick-next2"><i class="fas fa-chevron-right"></i></button>',
})
  


  


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
var sct=0;
$(window).on('scroll', function(){
    // var wh = $(this).height()
    sct = $(this).scrollTop()
    if ( sct>=sDist0 && sct<sDist1) {
        $('#menu li').eq(0).addClass('on').siblings().removeClass('on') 
        
    } else if ( sct>=sDist1 && sct<sDist2 ) {
        $('#menu li').eq(1).addClass('on').siblings().removeClass('on')
       
    } else if ( sct>=sDist2 && sct<sDist3) {
        $('#menu li').eq(2).addClass('on').siblings().removeClass('on')

    } else if ( sct>=sDist3 && sct<lastSect) {
        $('#menu li').eq(3).addClass('on').siblings().removeClass('on')
        
    } else if ( sct>=lastSect) {
        $('#menu li').eq(4).addClass('on').siblings().removeClass('on')
       
    } 

})


// https://rendro.github.io/easy-pie-chart/
    var arrChartColor = ['#8b1912', '#cf99a8', '#3d68bf', '#7f4f2d', '#87b250','#cf99a8'];
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

TweenMax.to($('#sect2 .cont'), 1, {
    marginTop: 15,
    repeat: -1, 
    yoyo: true, 
    repeatDelay: 0, 
    ease: Quad.easeInOut
});
TweenMax.to($('#sect2 .cont3'), 1, {
    marginTop: -45,
    repeat: -1, //무한반복
    yoyo: true, //올라갔다 내려갔다
    repeatDelay: 0, //반복지연
    ease: Quad.easeInOut
});
TweenMax.to($('#sect3 .bfy1'), 1, {
    marginTop: 10,
    repeat: -1, //무한반복
    yoyo: true, //올라갔다 내려갔다
    repeatDelay: 0, //반복지연
    ease: Quad.easeInOut
});
TweenMax.to($('#sect3 .bfy2'), 1, {
    marginTop: -10,
    repeat: -1,
    yoyo: true,
    repeatDelay: 0,
    ease: Quad.easeInOut
});
TweenMax.to($('#sect3 .bfy3'), 1, {
    marginTop: -10,
    repeat: -1,
    yoyo: true,
    repeatDelay: 0,
    ease: Quad.easeInOut
});

TweenMax.to($('#sect3 .bfy4'), 1, {
    marginTop: -10,
    repeat: -1,
    yoyo: true,
    repeatDelay: 0,
    ease: Quad.easeInOut
});
TweenMax.to($('#sect3 .bfy5'), 1, {
    marginTop: 10,
    repeat: -1,
    yoyo: true,
    repeatDelay: 0,
    ease: Quad.easeInOut
});

$('#sect4 li > div').on('mouseover mouseout', function(){
    $(this).toggleClass('on')
})



$('#sect4 li> div .btn > a ').on('click',function () {
    var num = $(this).parents('li').index()
    $('#sect4 .big').addClass('on')
    $('#sect4 .big .ppf > div').eq(num).fadeIn().siblings().fadeOut()
    return false //a태그 때매 return false안하면 맨 위로 올라감
});
$('#sect4 .close').on('click', function(){
    $('#sect4 .big').removeClass('on')
    $('#sect4 .big .ppf > div').fadeOut()

})

// contact me 메일전송
var name, address, subject, body
$('.contact a').on('click', function(){    
    name = $('#name').val()
    address = '?cc=' + $('#email').val()
    subject = '?subject=' + $('#subject').val()
    body = '?body=' + '[' + name + ']' + $('#message').val()
    href = 'mailto:wdh123456@naver.com' + address + subject + body
    $(this).attr('href', href)
})


