$(document).ready(function () { 

	var ddd;
	var fbtn = $('#fbtn'),
	    fpass = $('#fpass'),
	    finp = $('#finp'),
	    f2 = $('#f2'),
	    ff_logo = $('.ff_logo'),
	    f5 = $('#f5');
 
	tlForm = new TimelineMax();
	tlForm
	.to(ff_logo, 1, {autoAlpha: 1, ease: Power1.easeInOut})
	.to(f2, 1, {autoAlpha: 1, ease: Power1.easeInOut}, '-=1')
	.to(f5, 1, {autoAlpha: 1, ease: Power1.easeInOut}, '-=1')
	.to(finp, 1, {autoAlpha: 1, ease: Power1.easeInOut}, '-=1')
	.to(fpass, 1, {autoAlpha: 1, ease: Power1.easeInOut}, '-=1')
	.to(fbtn, 1, {autoAlpha: 1, ease: Power1.easeInOut}, '-=1');	

 
	$(".fancybox").fancybox({
		padding: [0,0,0,0],
		fitToView: false
	});

	$(".select").selectize({});

	$(".scroll").click(function() {
		$.scrollTo($(".divScroll"), 800, {
			offset: 0
		});
	});	
 
	$('.btn_nav').click(function(){
		$('.main_nav').addClass('open');
		var $mnLogo = $('.mn_logo'),
		$navMenu = $('.nav_menu'),
		$span = $('.main_nav .bsck'),
		$crc = $('.nav_menu .crc');

		var tlCrc = new TimelineMax({repeat: -1, repeatDelay: 2});
		tlCrc.to($crc, 2.25, {scale: 1.5, rotation: 180,  ease: Power0.easeNone})
		.fromTo($crc, 5, {x: -45, autoAlpha: 1,  ease: Power0.easeNone}, {x: 625, autoAlpha: 0,  ease: Power0.easeNone, repeat: 1, yoyo: true}, "+=0.75")
		.to($crc, 0, {scale: 0,  ease: Power0.easeNone})

		var tlM = new TimelineMax();
		tlM.to($mnLogo, 1, {autoAlpha: 1, ease: Power1.easeInOut, delay: 0.05})
		.to($navMenu, 1, {autoAlpha: 1, ease: Power1.easeInOut}, "-=1")
		.fromTo($span, 1, {autoAlpha: 0, ease: Power0.easeNone}, {autoAlpha: 1, ease: Power0.easeNone}, "-=1")
		.add(tlCrc);		
	});

	$('.main_nav .mn_close').click(function(){
		$('.main_nav').removeClass('open');
		var $mnLogo = $('.mn_logo'),
		$navMenu = $('.nav_menu'),
		$span = $('.main_nav .bsck'),
		$crc = $('.nav_menu .crc');

		TweenMax.to($mnLogo, 0, {
			autoAlpha: 0
		});
		TweenMax.to($navMenu, 0, {
			autoAlpha: 0
		});
		TweenMax.to($span, 0, {
			autoAlpha: 0
		});	
		TweenMax.to($crc, 0, {
			rotation: -180,
			x: 0,
			scale: 0
		});	

		TweenMax.killTweensOf($crc);									
	});	

	var mLi = $('.nav_menu > li');
	$(mLi).mouseover(function () {
		$(this).children().addClass('active');
		$(this).children('.cbp-hrsub').stop().slideDown(0);
		$('.main_nav .bsck').addClass('hide');
	});
	$(mLi).mouseout(function () {
		$(this).children().removeClass('active');
		$(this).children('.cbp-hrsub').stop().slideUp(0);
		$('.main_nav .bsck').removeClass('hide');
	});	

	$('.member').click(function(e){
		$('.nav_member01').addClass('open');	
		e.preventDefault();
	});

	$('.nav_member01 .mn_close').click(function(){
		$('.nav_member01').removeClass('open');
		$('.rg_form01 .rows .cols input').removeClass('notvalid');
		$('.rg_form01 input').removeClass('notvalid');
	});

	$('.member2').click(function(e){
		$('.nav_member02').addClass('open');	
		e.preventDefault();
	});

	$('.nav_member02 .mn_close').click(function(){
		$('.nav_member02').removeClass('open');
		$('.rg_form02 .rows .cols input').removeClass('notvalid');
		$('.rg_form02 input').removeClass('notvalid');
	});





	$('.h_login').click(function(e){
		$('.f_form').addClass('open');	
		e.preventDefault();
	});

	$('.f_form .mn_close').click(function(){
		$('.f_form').removeClass('open');
		$('.rg_form .rows .cols input').removeClass('notvalid');
		$('.rg_form input').removeClass('notvalid');
	});		

	$('.nav_menu li a').click(function(){
		$('.main_nav').removeClass('open');
		$('.nav_member').removeClass('open');
		var $mnLogo = $('.mn_logo'),
		$navMenu = $('.nav_menu'),
		$span = $('.main_nav .bsck'),
		$crc = $('.nav_menu .crc');

		TweenMax.to($mnLogo, 0, {
			autoAlpha: 0
		});
		TweenMax.to($navMenu, 0, {
			autoAlpha: 0
		});
		TweenMax.to($span, 0, {
			autoAlpha: 0
		});	
		TweenMax.to($crc, 0, {
			rotation: -180,
			x: 0,
			scale: 0
		});	

		TweenMax.killTweensOf($crc);		
	});

	var controller = new ScrollMagic.Controller();

	var parallaxTl = new TimelineMax();
	parallaxTl 
	.from('.apl_bg', 0.1, {ease: Power0.easeNone}, 0.1)
	.from('#application_bg', 2, {y: '-50%', ease: Power0.easeNone}, 0)

	var slideParallax = new ScrollMagic.Scene({
		triggerElement: '.apl_bg',
		triggerHook: 1,
		duration: '100%'
	})
	.setTween(parallaxTl)
	.addTo(controller); 

	if($('#header').is('.vs_logo')){
		$('.main_text').addClass('tp');
	}

	// $('.s_logo').click(function(){
	// 	$('body').removeClass('active');
	//     var splashS = $('.splash_screen');
	//     TweenMax.to(splashS, 2, {ease: Power0.easeNone, top: -2200, repeat:0});
	//     TweenMax.to('#cp1', 2, {ease: Power4.easeOut, opacity: 1, repeat:0, y: -65, delay: 0.5});
	//     swiperSlr.slideTo(0);
	// }); 

	function showScreen(){
		var logo = $('.flogo');
		var tlLogo = new TimelineMax();
		tlLogo
		.fromTo(logo, 1.2,{autoAlpha: 0}, {autoAlpha: 1, onComplete: showSlr});

		var star = $('.f_ttl .crc');
		var tlStar = new TimelineMax({repeat: -1, repeatDelay: 1});

		tlStar
		.to(star, 2.25, {scale: 1.5, rotation: 180,  ease: Power0.easeNone})
		.fromTo(star, 5, {x: -45, autoAlpha: 1,  ease: Power0.easeNone}, {x: 525, autoAlpha: 0,  ease: Power0.easeNone, repeat: 1, yoyo: true}, "+=0.75")
		.to(star, 0, {scale: 0,  ease: Power0.easeNone})

		var spanT = $('.f_ttl_txt .t'),
			spanB = $('.f_ttl_txt .b'),
			spanOne = $('#fttl1'),
			spanTwo = $('#fttl2'),
			top_link = $('.top_link');
			
		var tlSpan = new TimelineMax();	
		tlSpan 
			.fromTo(spanT, 2.5, {y: -100, autoAlpha: 0}, {y: 0, autoAlpha: 1, ease: Power1.easeInOut})
			.fromTo(spanB, 2.5, {y: 100, autoAlpha: 0}, {y: 0, autoAlpha: 1, ease: Power1.easeInOut}, "-=2.5")
			.to(spanOne, 1.5, {autoAlpha: 0, ease: Power2.easeInOut, delay: 2.15}, "+=1")
			.to(spanTwo, 1.5, {autoAlpha: 1, ease: Power2.easeInOut})
			.to(top_link, 1.5, {autoAlpha: 1, ease: Power2.easeInOut}, "-=1.5")

		$('.splash_screen').addClass('show_splash_screen');
		var tl = new TimelineMax({delay: 3});
		tl
		.to("#l2", 0, {className:"+=active"})
		.to("#l2", 0, {opacity:1, ease:Power1.easeInOut}, "-=1")
		.to(".mlonodn", 0, {opacity:1, ease:Power1.easeInOut}, "-=1")
		.to("body", 0, {className:"-=active"})
		.to('.splash_screen', 3, {ease: Power1.easeInOut, y: -1100})
		.add(tlLogo, "-=2.5")
		.add(tlSpan, "-=0.5")
		.add(tlStar);
	}

	function showSlr(){
		var swiperSlr = new Swiper('.sm_slr', {
			initialSlide: 0,  	    	
	    	autoplay: {
	    		delay: 3200,
	    		disableOnInteraction: false
	    	},	
	    	//autoplay: false,    	
	    	effect: 'fade', 
	    	fadeEffect: {
	    		crossFade: true 
	    	},	    	
	    	direction: 'vertical',
	    	grabCursor: false,
	    	slideToClickedSlide: true,
	    	loop: false,
	    	speed: 3200,
	    	observer: true,
	    	observeParents: true,
			on: {
				init: function () {
					TweenMax.fromTo('#cp2', 2, {opacity: 0, y: 50}, {ease: Power4.easeOut, opacity: 1, repeat:0, y: 0, delay: 1});
				},
			},		    	
	    });

		swiperSlr.on('slideChange', function () {
			if(swiperSlr.activeIndex == 2){
  				TweenMax.fromTo('#cp1', 2, {opacity: 0, y: 50}, {ease: Power4.easeOut, opacity: 1, repeat:0, y: 0, delay: 1});
  				TweenMax.to('#cp2', 0, {ease: Power0.easeNone, opacity: 0, repeat:0, y: 50});
  				TweenMax.to('.cp_list li .t', 0, {ease: Power0.easeNone, opacity: 0, repeat: 0, y: 50});	
		    }else if(swiperSlr.activeIndex == 0){
	  			TweenMax.fromTo('#cp2', 2, {ease: Power4.easeOut, opacity: 0, repeat:0, y: 50, delay: 1}, {ease: Power4.easeOut, opacity: 1, repeat:0, y: 0, delay: 1});
	  			TweenMax.to('#cp1', 0, {ease: Power0.easeNone, opacity: 0, repeat:0, y: 50});
	  			TweenMax.to('.cp_list li .t', 0, {ease: Power0.easeNone, opacity: 0, repeat: 0, y: 50});		
		    }else if(swiperSlr.activeIndex == 1){	
	  			var t = $('.cp_list li .t');
	  			TweenMax.fromTo(t, 2, {ease: Power4.easeOut, opacity: 0, repeat:0, y: 50, delay: 1}, {ease: Power4.easeOut, opacity: 1, repeat:0, y: 0, delay: 1});
		    	TweenMax.to('#cp1', 0, {ease: Power0.easeNone, opacity: 0, repeat:0, y: 50});
	  			TweenMax.to('#cp2', 0, {ease: Power0.easeNone, opacity: 0, repeat:0, y: 50});
		    }
		});
	};


	var $screen = $.cookie("screen");
	console.log($screen)
	var date = new Date();
	var minutes = 60;
	date.setTime(date.getTime() + (minutes * 60 * 1000));		
	if($screen == null) {
		$.cookie("screen", "foo", { expires: date, path: '/' });
		showScreen();
	} else {
		showSlr();
	}


	$('.b_logo a').click(function(){
		$('.h_menu').hide();
	  	//swiperSlr.slideTo(1);
	});	

	// if($('.mi_desc').length){
	// 	$('.mi_desc').each(function(){
	// 		var $dataId = $(this).find('.trg').attr('data-id');
	// 		var $id = $(this).attr('id');
	// 		var tml = new TimelineMax({
	// 			onComplete: function(){
	// 				sceneM.destroy();
	// 			}       
	// 		});
	// 		var $id = tml.to("#" + $id + " .mid_bg", 0.5, {scale: 1, ease: Power0.easeNone}); 
	// 		var sceneM = new ScrollMagic.Scene({
	// 			triggerElement: "#tm" + $dataId,
	// 			triggerHook: 0.95,
	// 		})
	// 		.setTween(tml)  
	// 		//.addIndicators({name: "pin2 scene", colorStart: "green"})
	// 		.addTo(controller);
	// 	});
	// };  

	// if($('.block_img').length){
	// 	$('.block_img').each(function(){
	// 		var $dataId = $(this).find('.trg').attr('data-id');
	// 		var $id = $(this).attr('id');
	// 		var tml = new TimelineMax({
	// 			onComplete: function(){
	// 				sceneM.destroy();
	// 			}       
	// 		});
	// 		var $id = tml.to("#" + $id + " .bck_img", 0.5, {scale: 1, ease: Power0.easeNone}); 
	// 		var sceneM = new ScrollMagic.Scene({
	// 			triggerElement: "#tm" + $dataId,
	// 			triggerHook: 0.95,
	// 		})
	// 		.setTween(tml)  
	// 		//.addIndicators({name: "pin2 scene", colorStart: "green"})
	// 		.addTo(controller);
	// 	});
	// }; 	

	// if($('.chess_order').length){
	// 	$('.chess_order').each(function(){
	// 		var $dataId = $(this).find('.trg').attr('data-id');
	// 		var $id = $(this).attr('id');
	// 		var tml = new TimelineMax({
	// 			onComplete: function(){
	// 				scene_txt5.destroy();
	// 			}       
	// 		});
	// 		var $id = tml.to("#" + $id + " .co_img_over img", 0.5, {scale: 1, ease: Power0.easeNone}); 
	// 		var scene_txt5 = new ScrollMagic.Scene({
	// 			triggerElement: "#q" + $dataId,
	// 			triggerHook: 1,
	// 		})
	// 		.setTween(tml)  
	// 		//.addIndicators({name: "pin1 scene", colorStart: "green"})
	// 		.addTo(controller);
	// 	});
	// };  

	if($('.mi_desc').length){
		$('.mi_desc').each(function(){
			var $dataId = $(this).find('.trg').attr('data-id');
			var $id = $(this).attr('id');
			var tmspn = new TimelineMax({
				onComplete: function(){
					sceneH.destroy();
				}       
			});
			var $id = tmspn.fromTo("#" + $id + " .imid_bg", 0.5, {scale: 0.8, ease: Power0.easeNone}, {scale: 1, ease: Power0.easeNone}); 
			var sceneH = new ScrollMagic.Scene({
				triggerElement: "#tm" + $dataId,
				triggerHook: 1,
			})
			.setTween(tmspn)  
			//.addIndicators({name: "pin8 scene", colorStart: "black"})
			.addTo(controller);
		});
	}; 



var scene7 = new ScrollMagic.Scene({
	triggerElement: "#tra1"
})
.setTween("#albo1 .app_lin_bg", 5, {
	y: 0,
	ease: Power0.easeInOut
})
.addTo(controller);	

var scene8 = new ScrollMagic.Scene({
	triggerElement: "#tra2"
})
.setTween("#albo2 .app_lin_bg", 5, {
	y: 0,
	ease: Power0.easeInOut
})
.addTo(controller);


var soc_li = new TimelineMax({
	onComplete: function(){
		soc_liSC.destroy();
	}     	
});
var soc_liS = soc_li.to('#footer .footer_in .social_list li', 3, {y: 0, ease: Power4.easeNone});
var soc_liSC = new ScrollMagic.Scene({
	triggerElement: "#trg_ftr"
})
.setTween(soc_liS)	
.addTo(controller);	


var foll = new TimelineMax({
	onComplete: function(){
		follC.destroy();
	}     	
});
var follS = foll.to("#footer .footer_in .foll", 3, {scale: 1, delay: 1, ease: Back.easeOut.config(3.7)});
var follC = new ScrollMagic.Scene({
	triggerElement: "#trg_ftr"
})
.setTween(follS)	
.addTo(controller);	


var scenePrl = new ScrollMagic.Scene({
	triggerElement: "#bgx_trg"
})
.setTween(".bgx_in", 4, {
	y: 40,
	ease: Power0.easeInOut
})
.addTo(controller);   


var markers = new TimelineMax({
	onComplete: function(){
		scMarkers.destroy();
	}       
}); 
var scMarker = markers.staggerFromTo('.marker', 3, {yPercent: -100, autoAlpha: 0, ease: Power1.easeInOut}, {yPercent: 0, autoAlpha: 1, ease: Back.easeOut.config(1.3)}, 0.4);
var scMarkers = new ScrollMagic.Scene({
	triggerElement: "#member_trigger"
})
.setTween(scMarker)  
.addTo(controller);


	var parallaxTl = new TimelineMax();
	parallaxTl 
		.from('.prl_bg2 .bg_i', 2, {y: '-30%', ease: Power0.easeNone}, 0)

	var slideParallax = new ScrollMagic.Scene({
		triggerElement: '.prl_bg2',
		triggerHook: 1,
		duration: '180%'
	})
	.setTween(parallaxTl)
	.addTo(controller);	

	var parallaxTl2 = new TimelineMax();
	parallaxTl2 
		.from('.prl_bg .bg_i', 2, {y: '-30%', ease: Power0.easeNone}, 0)

	var slideParallax = new ScrollMagic.Scene({
		triggerElement: '.prl_bg2',
		triggerHook: 1,
		duration: '180%'
	})
	.setTween(parallaxTl2)
	.addTo(controller);	



$('.read_more').hover(
	function(){ $(this).closest('.chess_order').addClass('hover')},
	function(){ $(this).closest('.chess_order').removeClass('hover')}
);


$( window).scroll(function() {
	var $header = $('#header').outerHeight(true);
	if ($(window).scrollTop() > $header) {
		$('.btn_nav').addClass('fix');
	} else if ($(window).scrollTop() < $header){
		$('.btn_nav').removeClass('fix'); 
	}
});


  jQuery.validator.setDefaults({
  	debug: true,
  	success: "valid"
  });

  // if($('input').is('.phone')){
  // 	$('input.phone').inputmask("(999) 999-99-99");
  // }

  // $('input.email').inputmask({
  // 	mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
  // 	greedy: !1,
  // 	onBeforePaste: function (pastedValue, opts) {
  // 		pastedValue = pastedValue.toLowerCase();
  // 		return pastedValue.replace("mailto:", "");
  // 	},
  // 	definitions: {
  // 		'*': {
  // 			validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]",
  // 			cardinality: 1,
  // 			casing: "lower"
  // 		},
  // 		"-": {
  // 			validator: "[0-9A-Za-z-]",
  // 			cardinality: 1,
  // 			casing: "lower"
  // 		}
  // 	}
  // });		

  $(".connect_us").validate({
  	rules: {
  		firstName: {
  			required: true,
                //minlength: 3
            }, 
            lastName:{
            	required: true
            },           
            phone:{
            	required: true       
            },
            email:{
            	required: true,
            	email: true               
            },
            enquiry:{
            	required: true                
            }
        },
        messages: {
        	firstName: {
        		required: "Введите имя",
        		firstName: "Введите имя"
                //minlength: "Введите минимум 3 символа"

            }, 
            lastName:{
            	required: "Введите фамилию",
            	firstName: "Введите фамилию"
            },           
            phone:{
            	required: "Введите телефон",
            	phone: "Введите телефон"           
            },                        
            email:{
            	required: "Введите E-mail",
            	email: "Введите E-mail"            
            },
            enquiry:{
            	required: "Введите сообщение",
            	enquiry: "Введите сообщение"          
            }           
        }
    });

    // $(window).scroll(function(){
    // 	var header = $('#header').outerHeight(true);
    //     if($(window).scrollTop() >= header) {
    //         $('.fix_menu').addClass('active'); 
    //     } else {
    //         $('.fix_menu').removeClass('active'); 
    //     };
    //     $('.h_menu').slideDown();    	
    // });


    $('.slr_tab').each(function(){
    	var mySwiper = new Swiper (this, {
    		loop: true,
    		slidesPerGroup: 1,
    		//slidesPerView: 4,
    		slidesPerView: 'auto',
    		spaceBetween: 115,
    		speed: 2700,
    		setWrapperSize: true,
    		observer: true,
    		observeParents: true,
    		navigation: {
    			nextEl: $(this).closest('.p_slrs_tabs_desc').find('.swiper-button-next')[0],
    			prevEl: $(this).closest('.p_slrs_tabs_desc').find('.swiper-button-prev')[0]
    		}
    	})
    }); 


    $('select[name="city"]').change(function(){
    	var el = $(this).val();
    	$('.b_city .ct').css('display','none');
    	$('#c'+el).css('display','block');
    });

	// debouncing function from John Hann
	(function($,sr){
	    var debounce = function (func, threshold, execAsap) {
	        var timeout;
	        return function debounced () {
	            var obj = this, args = arguments;
	            function delayed () {
	                if (!execAsap)
	                    func.apply(obj, args);
	                timeout = null;
	            };
	            if (timeout)
	                clearTimeout(timeout);
	            else if (execAsap)
	                func.apply(obj, args);
	            timeout = setTimeout(delayed, threshold || 100);
	        };
	    }
	    // smartresize 
	    jQuery.fn[sr] = function(fn){
	        return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
	    };
	})(jQuery,'smartresize');

	$(window).smartresize(function(){
	    Waypoint.refreshAll();
	});	


	// $('.comein').click(function(e){
	// 	$('.rg_form .rows .cols input').addClass('notvalid');
	// 	//e.preventDefault();
	// });
	// $('.comein').click(function(e){
	// 	$('.rg_form input').addClass('notvalid');
	// 	//e.preventDefault();
	// });

});


(function($){
	// console.log(navigator.userAgent);
	/* Adjustments for Safari on Mac */
	if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Mac') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
		// console.log('Safari on Mac detected, applying class...');
		$('html').addClass('safari_mac'); // provide a class for the safari-mac specific css to filter with
	}
})(jQuery);


(function($) {
	$(function() {
		$('.pst_list').on('click', 'li:not(.active)', function() {
			$(this)
			.addClass('active').siblings().removeClass('active')
			.closest('.p_slrs_tabs').find('.p_slrs_tabs_desc').removeClass('active').eq($(this).index()).addClass('active');
		});
	});
})(jQuery);




$(window).load(function () {

	$("#loaders").hide("fast", function(){
		$(this).remove();
	});


	if($('.sw_slr').length){
		getSlr();

		function getSlr(){

			var $window = $(window).height();
			var $hHeader = $('#header').height();
			var $rezultH = $window - $hHeader;
			var $hSlr = $window - $rezultH;
			//var $imgSlr = $('.sm_slr .swiper-wrapper .swiper-slide .bg').height();
			//console.log($hHeader);
			$('.sw_slr').height($rezultH);
			
			//$('.mp_ttl').css({'marginTop': $window});

		}

		$(window).resize(function(){
			getSlr();
		});	
	}

	// if($('.all_screen').length){

	// 	getHightBg();

	// 	function getHightBg(){
	// 		var $window = $(window).height();
	// 		var $hHeader = $('#header').height();
	// 		var $rezultH = $window - $hHeader;	
	// 		$('.all_screen').height($rezultH);
	// 		//console.log($rezultH);		
	// 	}

	// 	$(window).resize(function(){
	// 		getHightBg();
	// 	});			

	// }



	if($('.abg').length){

		showSlr();

		function showSlr(){
			var $window = $(window).height();
			var $hHeader = $('#header').height();
			var $rezultH = $window - $hHeader;
			$('.prl_bg_product').height($rezultH);
			$('.prl_bg_product2').height($rezultH);
		}

		$(window).scroll(function(){
			var $window = $(window).height();
			var $hHeader = $('#header').height();
			var $hprod = $('.f_prod').height();
			var $rezultH = $window - $hHeader - 50;
			//console.log($hHeader);
			//console.log($rezultH);
			var zz = ($rezultH * -0.5) + $hHeader;
			//console.log(zz);
			if($(window).scrollTop() > $rezultH / 2){
				$('.f_prod').addClass('fix').css({'top': zz});
				$('.production_slrs').css({'marginTop': $hprod + $hHeader});
			}else{
				$('.f_prod').removeClass('fix');
				$('.production_slrs').css({'marginTop': 100})				
			}
		});

		$(window).resize(function(){
			showSlr();
		});	
	} 

	$('.s1').click(function(){
		$('.abg').removeClass('active');
		$('#production_bg1').addClass('active');
	}); 	
	$('.s2').click(function(){
		$('.abg').removeClass('active');
		$('#production_bg2').addClass('active');
	});
	$('.s3').click(function(){
		$('.abg').removeClass('active');
		$('#production_bg3').addClass('active');
	});
	$('.s4').click(function(){
		$('.abg').removeClass('active');
		$('#production_bg4').addClass('active');
	});

	$('.fdin').waypoint(function() {
		$('.fdin').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('.fdin2').waypoint(function() {
		$('.fdin2').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('.mi_ttl_desc .mtd_l').waypoint(function() {
		$('.mi_ttl_desc .mtd_l').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('.mi_ttl_desc .mtd_r').waypoint(function() {
		$('.mi_ttl_desc .mtd_r').addClass('animated fadeInUp');
	}, { offset: '100%' }); 

	$('#ttl_txt1').waypoint(function() {
		$('#ttl_txt1').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#txt_txt1').waypoint(function() {
		$('#txt_txt1').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#ttlm_txt1').waypoint(function() {
		$('#ttlm_txt1').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#sp1').waypoint(function() {
		$('#sp1').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#th1').waypoint(function() {
		$('#th1').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#img2').waypoint(function() {
		$('#img2').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#ttl_txt2').waypoint(function() {
		$('#ttl_txt2').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#txt_txt2').waypoint(function() {
		$('#txt_txt2').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#bsck2').waypoint(function() {
		$('#bsck2').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#th2').waypoint(function() {
		$('#th2').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#img3').waypoint(function() {
		$('#img3').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#ttl_txt3').waypoint(function() {
		$('#ttl_txt3').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#txt_txt3').waypoint(function() {
		$('#txt_txt3').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#th3').waypoint(function() {
		$('#th3').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#img4').waypoint(function() {
		$('#img4').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#ttl_txt4').waypoint(function() {
		$('#ttl_txt4').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#txt_txt4').waypoint(function() {
		$('#txt_txt4').addClass('animated fadeInUp');
	}, { offset: '100%' });	

	$('#bsck4').waypoint(function() {
		$('#bsck4').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#th4').waypoint(function() {
		$('#th4').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#sdin1').waypoint(function() {
		$('#sdin1').addClass('animated fadeInUp');
	}, { offset: '100%' });							

	$('#mtd_l1').waypoint(function() {
		$('#mtd_l1').addClass('animated fadeInUp');
	}, { offset: '100%' });	

	$('#mtd_r1').waypoint(function() {
		$('#mtd_r1').addClass('animated fadeInUp');
	}, { offset: '100%' });	

	$('#img1').waypoint(function() {
		$('#img1').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#bsck1').waypoint(function() {
		$('#bsck1').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#img2').waypoint(function() {
		$('#img2').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#bsck3').waypoint(function() {
		$('#bsck3').addClass('animated fadeInUp');
	}, { offset: '100%' });		

	$('#img5').waypoint(function() {
		$('#img5').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#txt_txt5').waypoint(function() {
		$('#txt_txt5').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#nm1').waypoint(function() {
		$('#nm1').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#nm2').waypoint(function() {
		$('#nm2').addClass('animated fadeInUp');
	}, { offset: '100%' });	

	$('#nm3').waypoint(function() {
		$('#nm3').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#o1').waypoint(function() {
		$('#o1').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#o2').waypoint(function() {
		$('#o2').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#ol1').waypoint(function() {
		$('#ol1').addClass('animated fadeInUp');
	}, { offset: '100%' });	

	$('#ol2').waypoint(function() {
		$('#ol2').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#ol3').waypoint(function() {
		$('#ol3').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#ol4').waypoint(function() {
		$('#ol4').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#ol5').waypoint(function() {
		$('#ol5').addClass('animated fadeInUp');
	}, { offset: '100%' });	

	$('#ol6').waypoint(function() {
		$('#ol6').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#ol7').waypoint(function() {
		$('#ol7').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#ol8').waypoint(function() {
		$('#ol8').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#cti_h1').waypoint(function() {
		$('#cti_h1').addClass('animated fadeInUp');
	}, { offset: '100%' });	

	$('#brdh1').waypoint(function() {
		$('#brdh1').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#cti_t1').waypoint(function() {
		$('#cti_t1').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#rm1').waypoint(function() {
		$('#rm1').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#cti_h2').waypoint(function() {
		$('#cti_h2').addClass('animated fadeInUp');
	}, { offset: '100%' });	

	$('#brdh2').waypoint(function() {
		$('#brdh2').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#cti_t2').waypoint(function() {
		$('#cti_t2').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#rm2').waypoint(function() {
		$('#rm2').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#cti_h3').waypoint(function() {
		$('#cti_h3').addClass('animated fadeInUp');
	}, { offset: '100%' });	

	$('#brdh3').waypoint(function() {
		$('#brdh3').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#cti_t3').waypoint(function() {
		$('#cti_t3').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#rm3').waypoint(function() {
		$('#rm3').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#cti_h4').waypoint(function() {
		$('#cti_h4').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#brdh4').waypoint(function() {
		$('#brdh4').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#cti_t4').waypoint(function() {
		$('#cti_t4').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#rm4').waypoint(function() {
		$('#rm4').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#cti_h5').waypoint(function() {
		$('#cti_h5').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#brdh5').waypoint(function() {
		$('#brdh5').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#cti_t5').waypoint(function() {
		$('#cti_t5').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#rm5').waypoint(function() {
		$('#rm5').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#cti_h6').waypoint(function() {
		$('#cti_h6').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#brdh6').waypoint(function() {
		$('#brdh6').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#cti_t6').waypoint(function() {
		$('#cti_t6').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#rm6').waypoint(function() {
		$('#rm6').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#cti_h7').waypoint(function() {
		$('#cti_h7').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#brdh7').waypoint(function() {
		$('#brdh7').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#cti_t7').waypoint(function() {
		$('#cti_t7').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#rm7').waypoint(function() {
		$('#rm7').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#cti_h8').waypoint(function() {
		$('#cti_h8').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#brdh8').waypoint(function() {
		$('#brdh8').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#cti_t8').waypoint(function() {
		$('#cti_t8').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#rm8').waypoint(function() {
		$('#rm8').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#cti_h9').waypoint(function() {
		$('#cti_h9').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#brdh9').waypoint(function() {
		$('#brdh9').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#cti_t9').waypoint(function() {
		$('#cti_t9').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#rm9').waypoint(function() {
		$('#rm9').addClass('animated fadeInUp');
	}, { offset: '100%' });		

	$('#cti_h10').waypoint(function() {
		$('#cti_h10').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#brdh10').waypoint(function() {
		$('#brdh10').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#cti_t10').waypoint(function() {
		$('#cti_t10').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#rm10').waypoint(function() {
		$('#rm10').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#cti_h11').waypoint(function() {
		$('#cti_h11').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#brdh11').waypoint(function() {
		$('#brdh11').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#cti_t11').waypoint(function() {
		$('#cti_t11').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#rm11').waypoint(function() {
		$('#rm11').addClass('animated fadeInUp');
	}, { offset: '100%' });	

	$('#mtd').waypoint(function() {
		$('#mtd').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#tpp1').waypoint(function() {
		$('#tpp1').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#txt1').waypoint(function() {
		$('#txt1').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#txt2').waypoint(function() {
		$('#txt2').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#txt3').waypoint(function() {
		$('#txt3').addClass('animated fadeInUp');
	}, { offset: '100%' });	

	$('#sdin1p1').waypoint(function() {
		$('#sdin1p1').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#sdin1p2').waypoint(function() {
		$('#sdin1p2').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#sdin1p').waypoint(function() {
		$('#sdin1p').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#ttlh1').waypoint(function() {
		$('#ttlh1').addClass('animated fadeInUp');
	}, { offset: '90%' });

	$('#sdin1_2').waypoint(function() {
		$('#sdin1_2').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#mtdi').waypoint(function() {
		$('#mtdi').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#tpp1_2').waypoint(function() {
		$('#tpp1_2').addClass('animated fadeInUp');
	}, { offset: '100%' });	

	$('#img1_1').waypoint(function() {
		$('#img1_1').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#ttl_txt1_1').waypoint(function() {
		$('#ttl_txt1_1').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#txt_txt1_1').waypoint(function() {
		$('#txt_txt1_1').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#bsck1_1').waypoint(function() {
		$('#bsck1_1').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#img2_1').waypoint(function() {
		$('#img2_1').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#ttl_txt2_1').waypoint(function() {
		$('#ttl_txt2_1').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#txt_txt2_1').waypoint(function() {
		$('#txt_txt2_1').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#bsck2_1').waypoint(function() {
		$('#bsck2_1').addClass('animated fadeInUp');
	}, { offset: '100%' });

	$('#th41').waypoint(function() {
		$('#th41').addClass('animated fadeInUp');
	}, { offset: '95%' });


	$('#t1').waypoint(function() {
		$('#t1').addClass('animated fadeInUp');
	}, { offset: '100%' });	
	$('#t2').waypoint(function() {
		$('#t2').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#t3').waypoint(function() {
		$('#t3').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#t4').waypoint(function() {
		$('#t4').addClass('animated fadeInUp');
	}, { offset: '100%' });	
	$('#t5').waypoint(function() {
		$('#t5').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#t6').waypoint(function() {
		$('#t6').addClass('animated fadeInUp');
	}, { offset: '100%' });	
	$('#t7').waypoint(function() {
		$('#t7').addClass('animated fadeInUp');
	}, { offset: '100%' });	
	$('#t8').waypoint(function() {
		$('#t8').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#t9').waypoint(function() {
		$('#t9').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#t10').waypoint(function() {
		$('#t10').addClass('animated fadeInUp');
	}, { offset: '100%' });	
	$('#t11').waypoint(function() {
		$('#t11').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#t12').waypoint(function() {
		$('#t12').addClass('animated fadeInUp');
	}, { offset: '100%' });	
	$('#t13').waypoint(function() {
		$('#t13').addClass('animated fadeInUp');
	}, { offset: '100%' });	
	$('#t14').waypoint(function() {
		$('#t14').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#t15').waypoint(function() {
		$('#t15').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#t16').waypoint(function() {
		$('#t16').addClass('animated fadeInUp');
	}, { offset: '100%' });	
	$('#t17').waypoint(function() {
		$('#t17').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#t18').waypoint(function() {
		$('#t18').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#t19').waypoint(function() {
		$('#t19').addClass('animated fadeInUp');
	}, { offset: '100%' });	
	$('#t20').waypoint(function() {
		$('#t20').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#t21').waypoint(function() {
		$('#t21').addClass('animated fadeInUp');
	}, { offset: '100%' });	
	$('#t22').waypoint(function() {
		$('#t22').addClass('animated fadeInUp');
	}, { offset: '100%' });	
	$('#t23').waypoint(function() {
		$('#t23').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#t24').waypoint(function() {
		$('#t24').addClass('animated fadeInUp');
	}, { offset: '100%' });	
	$('#t25').waypoint(function() {
		$('#t25').addClass('animated fadeInUp');
	}, { offset: '100%' });	
	$('#t26').waypoint(function() {
		$('#t26').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#t27').waypoint(function() {
		$('#t27').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#t28').waypoint(function() {
		$('#t28').addClass('animated fadeInUp');
	}, { offset: '100%' });	
	$('#t29').waypoint(function() {
		$('#t29').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#t30').waypoint(function() {
		$('#t30').addClass('animated fadeInUp');
	}, { offset: '100%' });	
	$('#t31').waypoint(function() {
		$('#t31').addClass('animated fadeInUp');
	}, { offset: '100%' });	
	$('#t32').waypoint(function() {
		$('#t32').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#t33').waypoint(function() {
		$('#t33').addClass('animated fadeInUp');
	}, { offset: '100%' });				
		

	$('#l1').waypoint(function() {
		$('#l1').addClass('animated fadeInUp');
	}, { offset: '100%' });	
	$('#l2').waypoint(function() {
		$('#l2').addClass('animated fadeInUp');
	}, { offset: '100%' });	
	$('#l3').waypoint(function() {
		$('#l3').addClass('animated fadeInUp');
	}, { offset: '100%' });	
	$('#l4').waypoint(function() {
		$('#l4').addClass('animated fadeInUp');
	}, { offset: '100%' });	
	$('#l5').waypoint(function() {
		$('#l5').addClass('animated fadeInUp');
	}, { offset: '100%' });	
	$('#l6').waypoint(function() {
		$('#l6').addClass('animated fadeInUp');
	}, { offset: '100%' });	
	$('#l7').waypoint(function() {
		$('#l7').addClass('animated fadeInUp');
	}, { offset: '100%' });	
	$('#l8').waypoint(function() {
		$('#l8').addClass('animated fadeInUp');
	}, { offset: '100%' });	
	$('#l9').waypoint(function() {
		$('#l9').addClass('animated fadeInUp');
	}, { offset: '100%' });	
	$('#l10').waypoint(function() {
		$('#l10').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l11').waypoint(function() {
		$('#l11').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l12').waypoint(function() {
		$('#l12').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l13').waypoint(function() {
		$('#l13').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l14').waypoint(function() {
		$('#l14').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l15').waypoint(function() {
		$('#l15').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l16').waypoint(function() {
		$('#l16').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l17').waypoint(function() {
		$('#l17').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l18').waypoint(function() {
		$('#l18').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l19').waypoint(function() {
		$('#l19').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l20').waypoint(function() {
		$('#l20').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l21').waypoint(function() {
		$('#l21').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l22').waypoint(function() {
		$('#l22').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l23').waypoint(function() {
		$('#l23').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l24').waypoint(function() {
		$('#l24').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l25').waypoint(function() {
		$('#l25').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l26').waypoint(function() {
		$('#l26').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l27').waypoint(function() {
		$('#l27').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l28').waypoint(function() {
		$('#l28').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l29').waypoint(function() {
		$('#l29').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l30').waypoint(function() {
		$('#l30').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l31').waypoint(function() {
		$('#l31').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l32').waypoint(function() {
		$('#l32').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l33').waypoint(function() {
		$('#l33').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l34').waypoint(function() {
		$('#l34').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l35').waypoint(function() {
		$('#l35').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l36').waypoint(function() {
		$('#l36').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l37').waypoint(function() {
		$('#l37').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l38').waypoint(function() {
		$('#l38').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l39').waypoint(function() {
		$('#l39').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l40').waypoint(function() {
		$('#l40').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l41').waypoint(function() {
		$('#l41').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l42').waypoint(function() {
		$('#l42').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l43').waypoint(function() {
		$('#l43').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l44').waypoint(function() {
		$('#l44').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l45').waypoint(function() {
		$('#l45').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l46').waypoint(function() {
		$('#l46').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l47').waypoint(function() {
		$('#l47').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l48').waypoint(function() {
		$('#l48').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l49').waypoint(function() {
		$('#l49').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l50').waypoint(function() {
		$('#l50').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l51').waypoint(function() {
		$('#l51').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l52').waypoint(function() {
		$('#l52').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l53').waypoint(function() {
		$('#l53').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l54').waypoint(function() {
		$('#l54').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l55').waypoint(function() {
		$('#l55').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l56').waypoint(function() {
		$('#l56').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l57').waypoint(function() {
		$('#l57').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l58').waypoint(function() {
		$('#l58').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l59').waypoint(function() {
		$('#l59').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l60').waypoint(function() {
		$('#l60').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l61').waypoint(function() {
		$('#l61').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l62').waypoint(function() {
		$('#l62').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l63').waypoint(function() {
		$('#l63').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l64').waypoint(function() {
		$('#l64').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l65').waypoint(function() {
		$('#l65').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l66').waypoint(function() {
		$('#l66').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l67').waypoint(function() {
		$('#l67').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l68').waypoint(function() {
		$('#l68').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l69').waypoint(function() {
		$('#l69').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l70').waypoint(function() {
		$('#l70').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l71').waypoint(function() {
		$('#l71').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l72').waypoint(function() {
		$('#l72').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l73').waypoint(function() {
		$('#l73').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l74').waypoint(function() {
		$('#l74').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l75').waypoint(function() {
		$('#l75').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l76').waypoint(function() {
		$('#l76').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l77').waypoint(function() {
		$('#l77').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l78').waypoint(function() {
		$('#l78').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l79').waypoint(function() {
		$('#l79').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l80').waypoint(function() {
		$('#l80').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l81').waypoint(function() {
		$('#l81').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l82').waypoint(function() {
		$('#l82').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l83').waypoint(function() {
		$('#l83').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l84').waypoint(function() {
		$('#l84').addClass('animated fadeInUp');
	}, { offset: '100%' });
	$('#l85').waypoint(function() {
		$('#l85').addClass('animated fadeInUp');
	}, { offset: '100%' });	
	$('#l86').waypoint(function() {
		$('#l86').addClass('animated fadeInUp');
	}, { offset: '100%' });	



	$('#d1').waypoint(function() {
		$('#d1').addClass('animated fadeInUp2');
	}, { offset: '100%' });
	$('#d2').waypoint(function() {
		$('#d2').addClass('animated fadeInUp2');
	}, { offset: '100%' });
	$('#d3').waypoint(function() {
		$('#d3').addClass('animated fadeInUp2');
	}, { offset: '100%' });
	$('#d4').waypoint(function() {
		$('#d4').addClass('animated fadeInUp2');
	}, { offset: '100%' });
	$('#d5').waypoint(function() {
		$('#d5').addClass('animated fadeInUp2');
	}, { offset: '100%' });
	$('#d6').waypoint(function() {
		$('#d6').addClass('animated fadeInUp2');
	}, { offset: '100%' });





	if($('.offset').length){
		move();
	}
	function move(){
		var $offSet = $('.container1266').offset().left;
		//console.log($offSet);
		$('.offset').css({"left": $offSet});
		$('.offsetRight').css({"right": $offSet});
		$('.lion_bg .two_column').css({"left": $offSet});
	};

	$(window).resize(function(){

		if($('.offset').length){
			move();
		}

	});


    if ($('#dayWithPremis').length > 0) {
        /*
         * need to know when the first image for day with premis hits the nav. then we gotta lock it in.
         * then we need to know when we reach the bottom of the section with the text in the center. at this point, the image needs to just be position absolute to the bottom of its container so you can keep scrolling by.
         */
         var phoneStartingPos, phoneEndingPos, premisOffset, premisHeight, windowScrollTop, windowHeight, premisDayContentOffsets = [], phoneHeight, headerHeight, premisImageHeight;

        // this needs to be set on page resize because elements may move. sets all variables needed for premis day content.
        var premisDayVars = _.throttle(function () {
        	premisOffset = $('#dayWithPremis').offset().top;
        	premisHeight = $('#dayWithPremis').height();
        	windowHeight = $(window).height();
        	phoneHeight = $('#dayWithPremisPhone').height();
        	headerHeight = $('.header_top').outerHeight(true);
        	xHeight = $('#aplct').outerHeight(true);
        	phoneStartingPos = (windowHeight - phoneHeight)/2;
        	phoneEndingPos = -(phoneStartingPos - headerHeight - xHeight);
        	phoneDiff = phoneStartingPos - headerHeight * 2;

        	var i = 0;
        	$('.premis-day__day-content').each(function () {
        		var $this = $(this);
        		premisDayContentOffsets[i] = $this.offset().top;
        		i++;
        	});
        }, 1000);

        // this needs to happen on scroll. handles when you enter and exit premis day component.
        var premisDayCheck = _.throttle(function () {
        	windowScrollTop = $(window).scrollTop();
        	premisOffset = $('#dayWithPremis').offset().top;

            // when top of day with Premis area hits the top of the window, make it sticky.
            if (windowScrollTop > premisOffset && ((windowScrollTop + windowHeight) < premisOffset + premisHeight)) {
                // make it sticky
                $('#dayWithPremis').addClass('premis-day--fixed').removeClass('premis-day--bottom');
                // get % of page we have scrolled through and multiply it by the phoneDiff to move it.
                var percent = -((windowScrollTop - premisOffset + windowHeight) / (premisHeight) * 100);
                //$('#dayWithPremisPhone').css('top', (percent + phoneStartingPos));
                // if you scroll out of day w/ premis area, remove it
            } else {
            	if (premisOffset > (windowScrollTop - headerHeight)) {
            		$('#dayWithPremis').removeClass('premis-day--fixed');
            	} else if (((premisOffset + premisHeight) > (windowScrollTop - headerHeight))) {
            		$('#dayWithPremis').removeClass('premis-day--fixed').addClass('premis-day--bottom');
            	}
            }
        }, 10);

        var premisDayContentCheck = _.throttle(function () {
            // if the content is approximately 40% from the bottom of the screen, we want to add in the text and maybe also change the photo
            for (var i = 0; i < premisDayContentOffsets.length; i++) {
            	var dayContentOffset = premisDayContentOffsets[i];
            	var phoneScreen = $($('.premis-day__block')[i]).data('phonescreen');
            	if ((windowScrollTop + headerHeight + windowHeight) > (dayContentOffset + (windowHeight * 0.3))) {
                    //console.log((windowScrollTop + headerHeight + windowHeight), 'first parameter');
                    //console.log((dayContentOffset + (windowHeight * 0.3)), 'second parameter');
                    // fade in the new content. hide old image and fade in the new one.
                    $($('.premis-day__day-content')[i]).addClass('premis-day__day-content--visible');
                    $('.premis-day__image').removeClass('premis-day__image--visible');
                    $('.premis-day__content').removeClass('premis-day__content--active');
                    $('.premis-day__phone-inner').removeClass('premis-day__phone-inner--visible')
                    $($('.premis-day__content')[i]).addClass('premis-day__content--active');
                    $($('.premis-day__image')[i]).addClass('premis-day__image--visible');
                    $($('.premis-day__phone-inner')[i]).addClass('premis-day__phone-inner--visible');
                    // swap out phone screen
                    $('#dayWithPremisPhone .premis-day__phone-inner').css('background-image', phoneScreen);
                    
                }
            }
        }, 500);
        premisDayVars();
        $('#dayWithPremisPhone').css('top', phoneStartingPos);

        var scrollFunctions = function () {
        	premisDayCheck();
        	premisDayContentCheck();
        }
        mediaCheck({
        	media: '(min-width: 1000px)',
        	entry: function () {
        		$(window).on('scroll', scrollFunctions);
        		$(window).on('resize', premisDayVars);
        		if ($('#dayWithPremis').hasClass('slick-slider')) {
        			$('#dayWithPremis').slick('unslick');
        		}
        		premisDayVars();
                //console.log('bigger size');
            },
            exit: function () {
            	$(window).off('scroll', scrollFunctions);
            	$(window).off('resize', premisDayVars);

            	$('#dayWithPremis').slick({
            		slide: '.premis-day__block',
            		infinite: false,
            		dots: true
            	});
            	premisDayVars();
                //console.log('smaller size');   
            }
        });
        
    }


});		
 

 
$(function() {
    $("body").on("submit", "#member_form", function(e) {
        e.preventDefault();
        var form = $(this);
        form.find(".notvalid").removeClass("notvalid");
        var err = false;
        form.find("input, select, textarea").each(function() {
            if ($(this).hasClass("req") && $(this).val() == "") {
                err = true;
                $(this).addClass("notvalid");
            }
        });
        if (err) return false;
        $.post(
            "/ajax/ajax_membership_send.php", { data: form.serialize() },
            function(res) {
                if (res == "") {
                    form.trigger("reset");
                    // popup msg
                    //alert("OK");
                }
            }
        );
    });
});


$(function() {
    $("body").on("submit", "#member_form2", function(e) {
        e.preventDefault();
        var form = $(this);
        form.find(".notvalid").removeClass("notvalid");
        var err = false;
        form.find("input, select, textarea").each(function() {
            if ($(this).hasClass("req") && $(this).val() == "") {
                err = true;
                $(this).addClass("notvalid");
            }
        });
        if (err) return false;
        $.post(
            "/ajax/ajax_membership_send2.php", { data: form.serialize() },
            function(res) {
                if (res == "") {
                    form.trigger("reset");
                    // popup msg
                    //alert("OK");
                }
            }
        );
    });
});
$(function() {
	$("body").on("submit", "#form-service", function(e) {
			e.preventDefault();
			var form = $(this);
			form.find(".notvalid").removeClass("notvalid");
			var err = false;
			form.find("input, select, textarea").each(function() {
					if ($(this).hasClass("req") && $(this).val() == "") {
							err = true;
							$(this).addClass("notvalid");
					}
			});
			if (err) return false;
			$.post(
					"/moscow/ajax/ajax_form_service.php", { data: form.serialize() },
					function(res) {
							if (res == "") {
									form.trigger("reset");
									// popup msg
									//alert("OK");
							}
							$(form).closest('.co_txt_in').find('.success').addClass('active').css('display', 'block').hide().fadeIn();
							setTimeout(function() {
								$(form).closest('.co_txt_in').find('.success').removeClass('active').fadeOut();
								form.trigger("reset");
							}, 8000);
					}
			);
	});
});