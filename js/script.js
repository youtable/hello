

$(function() {
    


//상단 내비 바    
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

//gnb 스크롤시 사라지게
function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('header').removeClass('nav-up').addClass('nav-down');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('nav-down').addClass('nav-up');
        }
    }
    
    lastScrollTop = st;
}

//내비 바 부드럽게 이동
$('.gnb-list li a').click(function () {
    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top-70
    }, 500);
    
    return false;
    
  });
 $('.mo-gnb-list').click(function () {
   
    $('.header-menu').removeClass( 'open' );
   
     
  });
    
//모바일 내비 바   
 $('.mo-gnb-btn').click(function () {
    $(this).toggleClass( 'open' );
    $('.header-menu').toggleClass( 'open' );
  });   
    

 

// work부분 텍스트 고정
    var secOffset = $('.left-side').offset().top;
    var secWrap = $('.work-last').offset().top;

    $(window).scroll(function(){

        var w_scroll = $(window).scrollTop();
         
        if(  w_scroll >= secWrap - 10  ) {
            $('.left-side').addClass('relative');
        
        }else if ( w_scroll <= secOffset + 3500  ) {
           $('.left-side').removeClass('relative');
  
        } 

     });
    
//스크롤 텍스트
var $sidescroll	= (function() {
					
				var $rows			= $('#ss-container > div.ss-row'),
					$links			= $('#ss-links > a'),
					$win			= $(window),
					winSize			= {},
					anim			= false,
					scollPageSpeed	= 2000 ,
					scollPageEasing = 'easeInOutExpo',
					hasPerspective	= false,
					perspective		= hasPerspective && Modernizr.csstransforms3d,
					init			= function() {
						getWinSize();
						initEvents();
						defineViewport();
						setViewportRows();
						if( perspective ) {
							$rows.css({
								'-webkit-perspective'			: 600,
								'-webkit-perspective-origin'	: '50% 0%'
							});
						}	
					},
					// 처음에 볼 수 있는 행 요소를 수집하는 선택기를 정의합니다.
					// 요소의 위쪽이 창 높이보다 작으면 요소가 보입니다.
					// 이러한 요소는 페이지를 스크롤할 때 영향을 받지 않습니다.
					defineViewport	= function() {
						$.extend( $.expr[':'], {
							inviewport	: function ( el ) {
								if ( $(el).offset().top < winSize.height ) {
									return true;
								}
								return false;
							}
						});
					},
					// 처음에 볼 수 있는 행을 확인합니다.
					setViewportRows	= function() {
						$rowsViewport 		= $rows.filter(':inviewport');
						$rowsOutViewport	= $rows.not( $rowsViewport )
					},
					// 윈도우 사이즈를 맞춘다.
					getWinSize		= function() {
						winSize.width	= $win.width();
						winSize.height	= $win.height();
					},
					// 몇 가지 행사를 초기화
					initEvents		= function() {
						$(window).on({
							// 창 크기 조정 시 처음에 볼 수 있는 행(이 행은 애니메이션하지 않음)을 다시 정의해야 합니다.
							'resize.Scrolling' : function( event ) {
								// 윈도우 사이즈를 다시 맞춘다.
								getWinSize();
								// 처음에 볼 수 있는 행 재정의(:inviewport)
								setViewportRows();
								// 모든 행의 포인터를 제거하다
								$rows.find('a.ss-circle').removeClass('ss-circle-deco');
								// 뷰포트 행 및 각 포인터에 표시
								$rowsViewport.each( function() {
									$(this).find('div.ss-left')
										   .css({ left   : '0%' })
										   .end()
										   .find('div.ss-right')
										   .css({ right  : '0%' })
								});
							},
							// 페이지를 스크롤할 때 각 행의 위치를 변경합니다.
							'scroll.Scrolling' : function( event ) {
								// 그것을 피하기 위해 타임아웃을 설정한다.
								// placeRows 함수는 모든 스크롤 트리거에서 호출됩니다.
								if( anim ) return false;
								anim = true;
								setTimeout( function() {
									
									placeRows();
									anim = false;
									
								}, 10 );
							}
						});
					},
					// 행(왼쪽 및 오른쪽 행 요소)의 위치를 설정합니다.
					// 이 두 요소 모두 왼쪽/오른쪽에서 -50%로 시작합니다(보이지 않음).
					// 그리고 요소가 위에 있을 때 이 값은 0%(최종 위치)여야 합니다.
					// 윈도우 중앙
					placeRows		= function() {
							// 우리가 지금까지 얼마나 스크롤했는지
						var winscroll	= $win.scrollTop(),
							// 화면 중앙에 대한 y 값
							winCenter	= winSize.height / 2 + winscroll;
						
						// 뷰포트에 없는 모든 행에 대해
						$rowsOutViewport.each( function(i) {
							var $row	= $(this),
								// 왼쪽 요소
								$rowL	= $row.find('div.ss-left'),
								// 오른쪽 요소
								$rowR	= $row.find('div.ss-right'),
								// top value
								rowT	= $row.offset().top;
							// 뷰포트 아래에 있는 경우 행을 숨깁니다.
							if( rowT > winSize.height + winscroll ) {
								if( perspective ) {
									$rowL.css({
										'-webkit-transform'	: 'translate3d(-75%, 0, 0) rotateY(-90deg) translate3d(-75%, 0, 0)',
										'opacity'			: 0
									});
									$rowR.css({
										'-webkit-transform'	: 'translate3d(75%, 0, 0) rotateY(90deg) translate3d(75%, 0, 0)',
										'opacity'			: 0
									});
								}
								else {
									$rowL.css({ left 		: '-50%' });
									$rowR.css({ right 		: '-50%' });
								}
							}
							// 그렇지 않으면 화면 중앙에 가까워질수록 행이 표시됩니다(왼쪽/오른쪽의 0%).
							else {
									// row's 높이
								var rowH	= $row.height(),
									// 각 스크롤 단계의 값은 화면 중앙에서 높이까지의 거리에 비례합니다.
									factor 	= ( ( ( rowT + rowH / 2 ) - winCenter ) / ( winSize.height / 2 + rowH / 2 ) ),
									// 각 행의 왼쪽/오른쪽에 대한 값입니다.
									// 0%가 한계입니다.
									val		= Math.max( factor * 50, 0 );
								// 계산된 값을 설정하다
								if( perspective ) {
									var	t		= Math.max( factor * 75, 0 ),
										r		= Math.max( factor * 90, 0 ),
										o		= Math.min( Math.abs( factor - 1 ), 1 );
									$rowL.css({
										'-webkit-transform'	: 'translate3d(-' + t + '%, 0, 0) rotateY(-' + r + 'deg) translate3d(-' + t + '%, 0, 0)',
										'opacity'			: o
									});
									$rowR.css({
										'-webkit-transform'	: 'translate3d(' + t + '%, 0, 0) rotateY(' + r + 'deg) translate3d(' + t + '%, 0, 0)',
										'opacity'			: o
									});
								}
								else {
									$rowL.css({ left 	: - val + '%' });
									$rowR.css({ right 	: - val + '%' });
								}
							}	
						});
					};
				return { init : init };
			})();
			$sidescroll.init();

//팀 슬라이드
    var teamSlide = new Swiper('.team-slide', {
        
      slidesPerView: 'auto',
      spaceBetween: 30,
//      loop: true,
//      autoplay: {
//          delay: 3000,
//          disableOnInteraction: false,
//     },
        slideOffsetAfter:500,
        freeMode:true,
      pagination: {
          el: ".swiper-pagination",
          type: "progressbar",
      },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
         
        breakpoints: {
         780: {
           slidesPerView: 'auto',
         
        }
        },
        
    });
    
    teamSlide.on('slideChange', function () {
        if(this.activeIndex === 1) {
             $(".swiper-slide-active").addClass('dd');
        }
    });

//텍스트 슬라이드
$('.marquee-slide').marquee({  
        duration:28000,
       easing:'linear',
        delayBeforeStart:0,
            direction:'left',
      duplicated: true
    });
    
//하단으로 이동
// $('#go-down').click(function() {
//        $('html, body').animate({scrollTop: $(document).height()}, 400);
//        return false;
//    });
// 

//모바일 프로젝트 소개 팝업
//$(".main-sec04 .right-side li").click(function() {
//        $(this).find('.listing-img img').addClass('open');
//    $('.listing-img img').removeClass('open');
//        
//        
//});   
    
    
$(".right-side .btn-close").click(function() {
    $(this).find('.listing-img img').removeClass('open');


});

//개인정보 팝업
$('input[type="checkbox"]').click(function(){
            if($(this).is(":checked")){
                $('.popup-wrap').addClass('open');
            }
            else if($(this).is(":not(:checked)")){
                console.log("Checkbox is unchecked.");
            }
        });

// $("#checkBtn").click(function() {
//        $('.popup-wrap').addClass('open');
//        
//    }); 
$(".popup-wrap .btn-close").click(function() {
        $('.popup-wrap').removeClass('open');
        
        
    });    
    $(".project-tit-wrap").click(function() {
            $('.listing-img').removeClass('active');
            $(this).siblings('.listing-img').addClass('active');
           $('.asideBack').addClass("show");
            
         });
         $(".right-side .close-btn").click(function() {
            $(this).parent('.listing-img').removeClass('active');
             $('.asideBack').removeClass("show");
         });
   
   
    
// submit
    $("#offerForm").submit(function(){
				var loginid = ["#userid", "#useremail", "#usercompany", "#useroffer", "#usernumber"];
				var loginiddata = ["아이디가", "이메일이", "회사명이", "제안타입이", "연락처가"];
				for(var index=0; index<2; index++)//초기.종료.변화
				{  // 1 여기서부터 반복
				if( $( loginid[index] ).val() == "")// loginid[0]
				{   alert( loginiddata[index] + "빈칸입니다.\n확인해주세요");  
				    $(loginid[index]).focus();   return false;   }
			     } // 1여기까지
			});
 });





$(document).ready(function () {
 
    
//모바일, pc따로  
$(window).on("resize", function (e) {
        checkScreenSize();
    });

    checkScreenSize();

    function checkScreenSize(){
        var newWindowWidth = $(window).width();
        if (newWindowWidth < 768) {
        //모바일 work 팝업
         
         
         $("#checkBtn").click(function() {
            $('.agree-wrap').addClass('active');
             
         });
            $(".popup-wrap .btn-close").click(function() {
            $('.agree-wrap').removeClass('active');
            
         });
  
            
        }
        else
        {
           $('.project-tit-wrap').hover(
      function () {
        $(this).find('.pr01').addClass('fx');
        $(this).find('.pr02').addClass('fx');
        $(this).siblings('.listing-img').addClass('active');
      },
      function () {
        $(this).find('.pr01').removeClass('fx');
        $(this).find('.pr02').removeClass('fx');
        $(this).siblings('.listing-img').removeClass('active');
      }
    );
        }
    }
});