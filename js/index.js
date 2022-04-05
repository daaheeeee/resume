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

//새로고침 했을 때 스크롤바를 맨 위로 올라가게
$('html, body').stop().animate({
    scrollTop : 0
}, 1000)


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
//마지막구간이 윈도우높이보다 작을때
var lastSect = $('body').height() - $(window).height()
// var sct=0;

$(window).on('scroll', function(){
    var sct = $(this).scrollTop()
    if ( sct>=sDist0 && sct<sDist1 ) {
        $('#menu li').eq(0).addClass('on').siblings().removeClass('on')
        
    } else if ( sct>=sDist1 && sct<sDist2 ) {
        $('#menu li').eq(1).addClass('on').siblings().removeClass('on')
        $('#sect2 .meTxt').addClass('on').fadeIn()
        
    } else if ( sct>=sDist2 && sct<sDist3 ) {
        $('#menu li').eq(2).addClass('on').siblings().removeClass('on')
       
    } else if ( sct>=sDist3 && sct<lastSect ) {
        $('#menu li').eq(3).addClass('on').siblings().removeClass('on')
        $('#sect5 .letter li').removeClass('on').fadeOut() 
        $('#sect5 .formMailWrap ').removeClass('on').fadeOut() 
        $('#sect5 .box').removeClass('on').fadeOut()
       
    } else if ( sct>=lastSect ) {
        $('#menu li').eq(4).addClass('on').siblings().removeClass('on')
        $('#sect5 .letter li').addClass('on').fadeIn() 
        $('#sect5 .formMailWrap ').addClass('on').fadeIn() 
        $('#sect5 .box').addClass('on').fadeIn()
       
    } 

})

var typingBool = false; 
var typingIdx=0; 
var liIndex = 0;
var liLength = $(".typing-txt li").length;
// 타이핑될 텍스트를 가져온다 
var typingTxt = $(".typing-txt li").eq(liIndex).text(); 
typingTxt=typingTxt.split("");  
if(typingBool==false){ 
    typingBool=true; 
    var tyInt = setInterval(typing,500); 
}  
function typing(){ 
    if(typingIdx<typingTxt.length){  
    $(".typing").append(typingTxt[typingIdx]); 
    typingIdx++; 
    } else{ 
        if(liIndex>=liLength-1){
            liIndex=0;
        }else{ 
            liIndex++; 
        } 
    //다음문장을 타이핑하기위한 셋팅
        typingIdx=0;
        typingBool = false; 
        typingTxt = $(".typing-txt li").eq(liIndex).text(); 
    //다음문장 타이핑전 
        clearInterval(tyInt);
        setTimeout(function(){
            $(".typing").html('');
            tyInt = setInterval(typing,500);
        },2000);
    } 
}

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

//sect2 back
var particles = document.getElementById("particles");
var border = ["0%","0%"];
var colors = ["#9ed027","#EB413B","#ff9d00","#Fbc800","#63D2F3"];

function createParticle(event){
    var x = event.clientX;
    var y = event.clientY;
    var color = Math.floor(Math.random() * 5);

    var div = document.createElement("div");
    div.style.marginLeft = x+"px";
    div.style.marginTop = y+"px";
    div.style.width = "10px";
    div.style.borderTop = "5px solid transparent";
    div.style.borderRight = "5px solid transparent";
    div.style.borderLeft = "5px solid transparent";
    div.style.borderBottom = "10px solid "+colors[color];
    div.style.animation = "move 3s ease-in infinite";
    particles.appendChild(div);
    setTimeout(
        function(){
            div.remove();
        }
    , 5000);
}

function getParticles(){
    var np = document.documentElement.clientWidth / 40;
    particles.innerHTML = "";
    for (var i = 0; i < np; i++) {
        var w = document.documentElement.clientWidth;
        var h = document.documentElement.clientHeight;
        var rndw = Math.floor(Math.random() * w ) + 1;
        var rndh = Math.floor(Math.random() * h ) + 1;
        var widthpt = Math.floor(Math.random() * 8) + 5;
        var opty = Math.floor(Math.random() * 4) + 1;
        var anima = Math.floor(Math.random() * 12) + 8;
        var bdr = Math.floor(Math.random() * 2);
        var color = Math.floor(Math.random() * 5);

        var div = document.createElement("div");
        div.style.position = "absolute";
        div.style.marginLeft = rndw+"px";
        div.style.marginTop = rndh+"px";
        div.style.width = widthpt+"px";
        div.style.height = widthpt+"px";
        div.style.opacity = opty;
        div.style.backgroundColor = colors[color];
        div.style.borderRadius = border[bdr];
        div.style.animation = "move "+anima+"s ease-in infinite";
        particles.appendChild(div);
    }
}

function main(event){
    getParticles();
    particles.addEventListener("click", createParticle);
}

window.addEventListener("resize", main);
window.addEventListener("load", main);


// https://rendro.github.io/easy-pie-chart/
var arrChartColor = ['#92D027', '#63DEF3', '#eb413b', '#ff9d52', '#f9eb2f', '#92D027'];
var arrPercent = [90, 90, 75, 80, 80, 75, ]

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


$('#sect4 .circle .btn ').on('click',function () {
    var num = $(this).parents('li').index()
    $('#sect4 .pf').addClass('on')
    $('#sect4 .pf .ppf > div').eq(num).fadeIn().siblings().fadeOut()
    return false //a태그 때매 return false안하면 맨 위로 올라감
});
$('#sect4 .close').on('click', function(){
    $('#sect4 .pf').removeClass('on')
    $('#sect4 .pf .ppf > div').fadeOut()

})

TweenMax.to($('#sect4 .circle1'), 1, {
    marginTop: 45,
    repeat: -1, 
    yoyo: true, 
    repeatDelay: 0, 
    ease: Quad.easeInOut
});

TweenMax.to($('#sect4 .circle2'), 1, {
    marginTop: -35,
    repeat: -1, 
    yoyo: true, 
    repeatDelay: 0, 
    ease: Quad.easeInOut
});
TweenMax.to($('#sect4 .circle3'), 1, {
    marginTop: -60,
    repeat: -1, 
    yoyo: true, 
    repeatDelay: 0, 
    ease: Quad.easeInOut
});
TweenMax.to($('#sect4 .circle4'), 1, {
    marginTop: 30,
    repeat: -1, 
    yoyo: true, 
    repeatDelay: 0, 
    ease: Quad.easeInOut
});
TweenMax.to($('#sect4 .circle5'), 1, {
    marginTop: -10,
    repeat: -1, 
    yoyo: true, 
    repeatDelay: 0, 
    ease: Quad.easeInOut
});
TweenMax.to($('#sect4 .circle6'), 1, {
    marginTop: -20,
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

