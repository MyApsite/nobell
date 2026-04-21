$(document).ready(function () {
	  
	$(".fancybox").fancybox();
	
	$(".select").selectize({});
	
	//Плавный скролл до блока .div по клику на .scroll
	//Документация: https://github.com/flesler/jquery.scrollTo
	$(".scroll").click(function() {
		$.scrollTo($(".divScroll"), 800, {
			offset: 0
		});
	});

	var controller = new ScrollMagic.Controller();

    $('.in_home .gear').click(function(){
    	$(this).removeClass('active');
    	$('.lm_list').removeClass('active');
    	$('#main_menu').addClass('active');
    	$('.pt').removeClass('active');
    	$('.entrance_t').addClass('active');
    	//$('.in_home .pt').text('Войти');
    });

    $('.about_l').click(function(event){
    	event.preventDefault();
    	$('.in_home .gear').addClass('active');
    	$('.lm_list').removeClass('active');
    	$('#about_menu').addClass('active');
    	//$('.in_home .pt').text('Нобель');
    	$('.pt').removeClass('active');
    	$('.about_t').addClass('active');
    	$('.in_home .gear').addClass('active');
    	$('.in_home .closes').addClass('active');
    });   

    $('.service_l').click(function(event){
    	event.preventDefault();
     	$('.in_home .gear').addClass('active');
     	$('.lm_list').removeClass('active');
     	$('#service_menu').addClass('active');
     	$('.in_home .pt').text('Services');
     	$('.pt').removeClass('active');
     	$('.service_t').addClass('active');
     	$('.in_home .gear').addClass('active');
     	$('.in_home .closes').addClass('active');
     }); 

    // $('.product_l').click(function(event){
    // 	event.preventDefault();
    // 	$('.in_home .gear').addClass('active');
    // 	$('.lm_list').removeClass('active');
    // 	$('#product_menu').addClass('active');
    // 	$('.in_home .product_t').text('Продукция');
    // 	$('.pt').removeClass('active');
    // 	$('.product_t').addClass('active');
    // 	$('.in_home .gear').addClass('active');
    // 	$('.in_home .closes').addClass('active');
    // });     

	
	$(".left_menu").swipe({
	  swipeLeft:function(event, direction, distance, duration, fingerCount) {
    	$('.left_menu').removeClass('open');
    	$('#wrapper').removeClass('open');
    	$('#wrapper').removeClass('open');
    	$('.bt_menu .btn_menu').removeClass('active');
	  }
	});


	$(window).scroll(function(){
		if($(window).scrollTop() >= 100){
			$('#main_pline').removeClass('active')
		}else{
			$('#main_pline').addClass('active')
		}		
	});  

    // $(window).scroll(function(){
	   //  if($(window).scrollTop() >= $header) {
	   //  	$('.btn_menu').addClass('fixed'); 
	   //  	$('.btn_menu_close').addClass('active');
	   //  	$('.left_menu').addClass('top');
    // 	} else {
    //    		$('.btn_menu').removeClass('fixed'); 
    //    		$('.btn_menu_close').removeClass('active');
    //    		$('.left_menu').removeClass('top');
    // 	}
    // }); 

    // $(window).scroll(function(){
   	// if($(window).scrollTop() >= 10){
    // 		$('.line_top').addClass('active');
    // 		$('.wrapper_all').addClass('active');
    // 	}else{
    //  		$('.line_top').removeClass('active');
    // 		$('.wrapper_all').removeClass('active');   		
    // 	}
    // });  


	// var $window = $(window),
	//     lastScrollTop = 0;
	// function onScroll (e) {
	//     var top = $window.scrollTop();
	//     if (lastScrollTop > top) {
 //    		$('.line_top').addClass('active');
 //    		$('.wrapper_all').addClass('active');
	//     }else if (lastScrollTop < top) {
 //     		$('.line_top').removeClass('active');
 //    		$('.wrapper_all').removeClass('active'); 
	//     } 
	//     lastScrollTop = top;
	//     if (lastScrollTop < 10) {
 //    		$('.line_top').removeClass('active');
 //    		$('.wrapper_all').removeClass('active');
	//     }
	// }

	// $window.on('scroll', onScroll);


    $('.btn_menu .g_menu').click(function(){
    	$(this).toggleClass('open');
    	$('.left_menu').toggleClass('open');
    	$('#wrapper').toggleClass('open');
    	$('#wrapper').toggleClass('open');
    	// if($(this).text() === 'Menu'){
    	// 	$(this).text('Close');
    	// 	$('.btn_menu_close .g_menu').text('Close');
    	// }else{
    	// 	$(this).text('Menu');
    	// 	$('.btn_menu_close .g_menu').text('Menu');
    	// } 
		//$('html, body').animate({scrollTop: 0}, 0);
    });  

    // $('.btn_menu_close .g_menu').click(function(){
    // 	$('.left_menu').toggleClass('open');
    // 	$('#wrapper').toggleClass('open');
    // 	// if($(this).text() === 'Close'){
    // 	// 	$(this).text('Menu');
    // 	// 	$('.btn_menu .g_menu').text('Menu');
    // 	// }else{
    // 	// 	$(this).text('Close');
    // 	// 	$('.btn_menu .g_menu').text('Close');
    // 	// }  
    // }); 

    $('.bt_menu .btn_menu').click(function(){
    	$(this).toggleClass('active');
    	$('body').toggleClass('active');
    	$('.left_menu').toggleClass('open');
    	$('#wrapper').toggleClass('open');
    	$('.lm_list').removeClass('active');
    	$('#main_menu').addClass('active');
    	$('.pt').removeClass('active');
    	$('.entrance_t').addClass('active');
    	//$('.in_home .pt').text('Войти');   
    	//console.log('1111111');
    	// $('.in_home .gear').hide();
    	// $('.in_home .closes').show();
    	//$('html, body').animate({scrollTop: 0}, 0); 	
    	// if($(this).text() === 'Menu'){
    	// 	$(this).text('Close');
    	// 	$('.btn_menu_close .g_menu').text('Close');
    	// }else{
    	// 	$(this).text('Menu');
    	// 	$('.btn_menu_close .g_menu').text('Menu');
    	// } 
   //  	setTimeout(function(){
			// document.body.addEventListener('click', boxCloser, false);
   //  	}, 150); 	
    	
    });    

    $('#wrapper').click(function(){
    	$('.left_menu').removeClass('open');
    	$('#wrapper').removeClass('open');
    	$('body').removeClass('active');
    	$('.bt_menu .btn_menu').removeClass('active');
    	//$('html, body').animate({scrollTop: 0}, 0);
    });

    // $('.left_menu').click(function(){
    // 	$('.left_menu').removeClass('open');
    // 	$('#wrapper').removeClass('open');
    // 	$('body').removeClass('active');
    // });    

	$('.entrance_t').click(function(){
		$(this).closest('.in_home').find('.gear').addClass('active');
		$('.lm_list').removeClass('active');
		$('#entrance_menu').addClass('active');
		$('.in_home .pt').removeClass('active');
		$('.in_home .language_t').addClass('active').text('Language & Location');		
    	$('.in_home .gear').addClass('active');
    	$('.in_home .closes').addClass('active');		
	});

	$('.gear').click(function(){
		$(this).addClass('active');
		$(this).closest('.in_home').find('.closes').addClass('active');
		$('.lm_list').removeClass('active');
		$('#entrance_menu').addClass('active');
		$('.in_home .pt').removeClass('active');
		$('.in_home .language_t').addClass('active').text('Language & Location');
		// $('.in_home .pt').removeClass('active');
		// $('.in_home .entrance_t').addClass('active');
	});	

	$('.closes').click(function(){
		$(this).removeClass('active');
		$(this).closest('.in_home').find('.gear').removeClass('active');
		$('.lm_list').removeClass('active');
		$('#main_menu').addClass('active');
		//$('.in_home .pt').text('Войти'); 
		$('.in_home .pt').removeClass('active');
		$('.in_home .entrance_t').addClass('active');			
	});		


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



	// if($('.bb_gray').length){
	// 	$('.bb_gray').each(function(){
	// 		var $dataId = $(this).find('.trg').attr('data-id');
	// 		var $id = $(this).attr('id');
	// 		var tmspn = new TimelineMax({
	// 			onComplete: function(){
	// 				sceneH.destroy();
	// 			}       
	// 		});
	// 		var $id = tmspn.fromTo("#" + $id + " .mm_bg", 0.5, {scale: 1.1, ease: Power0.easeNone}, {scale: 1, ease: Power0.easeNone}); 
	// 		var sceneH = new ScrollMagic.Scene({
	// 			triggerElement: "#q" + $dataId,
	// 			triggerHook: 0.95,
	// 		})
	// 		.setTween(tmspn)  
	// 		//.addIndicators({name: "pin8 scene", colorStart: "black"})
	// 		.addTo(controller);
	// 	});
	// };

	// if($('.bb_white').length){
	// 	$('.bb_white').each(function(){
	// 		var $dataId = $(this).find('.trg').attr('data-id');
	// 		var $id = $(this).attr('id');
	// 		var tmspn = new TimelineMax({
	// 			onComplete: function(){
	// 				sceneH.destroy();
	// 			}       
	// 		});
	// 		var $id = tmspn.fromTo("#" + $id + " .mm_bg", 0.5, {scale: 1.1, ease: Power0.easeNone}, {scale: 1, ease: Power0.easeNone}); 
	// 		var sceneH = new ScrollMagic.Scene({
	// 			triggerElement: "#q" + $dataId,
	// 			triggerHook: 0.95,
	// 		})
	// 		.setTween(tmspn)  
	// 		//.addIndicators({name: "pin8 scene", colorStart: "black"})
	// 		.addTo(controller);
	// 	});
	// };	


	// var parallaxTl2 = new TimelineMax();
	// parallaxTl2 
	// 	.from('.mm_bg_over_top .mm_bg', 2, {y: '-30%', ease: Power0.easeNone})

	// var slideParallax = new ScrollMagic.Scene({
	// 	triggerElement: '.mm_bg_over_top .mm_bg',
	// 	triggerHook: 1,
	// 	duration: '200%'
	// })
	// .setTween(parallaxTl2)
	// .addTo(controller);	

	// if($('.mib_desc_in').length){
	// 	$('.mib_desc_in').each(function(){
	// 		var $dataId = $(this).find('.trg').attr('data-id');
	// 		var $id = $(this).attr('id');
	// 		var tmspn = new TimelineMax({
	// 			onComplete: function(){
	// 				sceneH.destroy();
	// 			}       
	// 		});
	// 		var $id = tmspn.fromTo("#" + $id + " .bg_img", 0.5, {scale: 1.1, ease: Power0.easeNone}, {scale: 1, ease: Power0.easeNone}); 
	// 		var sceneH = new ScrollMagic.Scene({
	// 			triggerElement: "#q" + $dataId,
	// 			triggerHook: 0.95,
	// 		})
	// 		.setTween(tmspn)  
	// 		//.addIndicators({name: "pin8 scene", colorStart: "black"})
	// 		.addTo(controller);
	// 	});
	// };	

	if($('.b_apl').length){
		$('.b_apl').each(function(){
			var $dataId = $(this).find('.trg').attr('data-id');
			var $id = $(this).attr('id');
			var tmspn = new TimelineMax({
				onComplete: function(){
					sceneH.destroy();
				}       
			});
			var $id = tmspn.fromTo("#" + $id + " .mm_bg", 0.5, {scale: 1.1, ease: Power0.easeNone}, {scale: 1, ease: Power0.easeNone}); 
			var sceneH = new ScrollMagic.Scene({
				triggerElement: "#q" + $dataId,
				triggerHook: 0.95,
			})
			.setTween(tmspn)  
			//.addIndicators({name: "pin8 scene", colorStart: "black"})
			.addTo(controller);
		});
	};			

    $('.slr_product_imperial').each(function(){
    	var mySwiperImperial = new Swiper (this, {
    		direction: 'horizontal',
    		loop: false,
    		slidesPerView: 2,
    		slidesPerGroup: 2,
    		speed: 2700,
    		setWrapperSize: true,
    		observer: true,
    		observeParents: true,
    		//centeredSlides: true,
    		//initialSlide: 0,
			pagination: {
			    el: '.swp',
			    type: 'bullets',
			},    		
			scrollbar: {
		        el: '.swiper-scrollbar',
		        hide: false,
		        draggable: true,
		        dragSize: 100
		    },     		
    		// navigation: {
    		// 	nextEl: $(this).find('.swiper-button-next')[0],
    		// 	prevEl: $(this).find('.swiper-button-prev')[0]
    		// },
    		breakpoints: {
    			450:{
    				slidesPerView: 2
    			}
    		}
    	})
    }); 

    $('.slr_product_aphrodite').each(function(){
    	var mySwiperImperial = new Swiper (this, {
    		direction: 'horizontal',
    		loop: false,
    		slidesPerView: 2,
    		slidesPerGroup: 2,
    		speed: 2700,
    		setWrapperSize: true,
    		observer: true,
    		observeParents: true,
    		//centeredSlides: true,
    		//initialSlide: 0,
			pagination: {
			    el: '.swp',
			    type: 'bullets',
			},    		
			scrollbar: {
		        el: '.swiper-scrollbar',
		        hide: false,
		        draggable: true,
		        dragSize: 100
		    },     		
    		// navigation: {
    		// 	nextEl: $(this).find('.swiper-button-next')[0],
    		// 	prevEl: $(this).find('.swiper-button-prev')[0]
    		// },
    		breakpoints: {
    			450:{
    				slidesPerView: 2
    			}
    		}
    	})
    });

    $('.slr_product_black').each(function(){
    	var mySwiperImperial = new Swiper (this, {
    		direction: 'horizontal',
    		loop: false,
    		slidesPerView: 2,
    		slidesPerGroup: 2,
    		speed: 2700,
    		setWrapperSize: true,
    		observer: true,
    		observeParents: true,
    		//centeredSlides: true,
    		//initialSlide: 0,
			pagination: {
			    el: '.swp',
			    type: 'bullets',
			},    		
			scrollbar: {
		        el: '.swiper-scrollbar',
		        hide: false,
		        draggable: true,
		        dragSize: 100
		    },     		
    		// navigation: {
    		// 	nextEl: $(this).find('.swiper-button-next')[0],
    		// 	prevEl: $(this).find('.swiper-button-prev')[0]
    		// },
    		breakpoints: {
    			450:{
    				slidesPerView: 2
    			}
    		}
    	})
    }); 

    $('.slr_product_brown').each(function(){
    	var mySwiperImperial = new Swiper (this, {
    		direction: 'horizontal',
    		loop: false,
    		slidesPerView: 2,
    		slidesPerGroup: 2,
    		speed: 2700,
    		setWrapperSize: true,
    		observer: true,
    		observeParents: true,
    		//centeredSlides: true,
    		//initialSlide: 0,
			pagination: {
			    el: '.swp',
			    type: 'bullets',
			},    		
			scrollbar: {
		        el: '.swiper-scrollbar',
		        hide: false,
		        draggable: true,
		        dragSize: 100
		    },     		
    		// navigation: {
    		// 	nextEl: $(this).find('.swiper-button-next')[0],
    		// 	prevEl: $(this).find('.swiper-button-prev')[0]
    		// },
    		breakpoints: {
    			450:{
    				slidesPerView: 2
    			}
    		}
    	})
    });             

    $('.slr_product_bath').each(function(){
    	var mySwiperBath = new Swiper (this, {
    		direction: 'horizontal',
    		loop: false,
    		slidesPerView: 2,
    		speed: 2700,
    		setWrapperSize: true,
    		observer: true,
    		observeParents: true,
			pagination: {
			    el: '.swp',
			    type: 'bullets',
			},     		
			scrollbar: {
		        el: '.swiper-scrollbar',
		        hide: false,
		        draggable: true,
		        dragSize: 100
		    },    		
    		// navigation: {
    		// 	nextEl: $(this).find('.swiper-button-next')[0],
    		// 	prevEl: $(this).find('.swiper-button-prev')[0]
    		// },
    		breakpoints: {
    			450:{
    				slidesPerView: 2
    			}
    		}
    	})
    });

    $('.slr_phone').each(function(){
    	var mySwiperPhone = new Swiper (this, {
    		loop: true,
    		slidesPerView: 1,
    		speed: 2700,
    		setWrapperSize: true,
    		observer: true,
    		observeParents: true,
	    	effect: 'fade', 
	    	fadeEffect: {
	    		crossFade: true 
	    	},	    		
			pagination: {
			    el: '.swiper-pagination',
			    type: 'bullets',
			},
			navigation: {
			    nextEl: '.swiper-button-next',
			    prevEl: '.swiper-button-prev',
			},			    		
    	});
		mySwiperPhone.on('slideChange', function () {
			console.log(mySwiperPhone.realIndex);
			$('.spt').hide().removeClass('active');
			$('div[data-ip='+mySwiperPhone.realIndex+']').show().addClass('active');
		});    	
    }); 


    $('.slr_phone2').each(function(){
    	var mySwiperPhone2 = new Swiper (this, {
    		loop: true,
    		slidesPerView: 1,
    		speed: 2700,
    		setWrapperSize: true,
    		observer: true,
    		observeParents: true,
	    	effect: 'fade', 
	    	fadeEffect: {
	    		crossFade: true 
	    	},	    		
			pagination: {
			    el: '.swiper-pagination2',
			    type: 'bullets',
			},
			navigation: {
			    nextEl: '.swiper-button-next2',
			    prevEl: '.swiper-button-prev2',
			},			    		
    	});
		mySwiperPhone2.on('slideChange', function () {
			console.log(mySwiperPhone2.realIndex);
			$('.spt2').hide().removeClass('active');
			$('div[data-ip2='+mySwiperPhone2.realIndex+']').show().addClass('active');
		});    	
    });     


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

	$('.read_more').hover(
	    function(){ $(this).closest('.mi_info ').addClass('hover')},
	    function(){ $(this).closest('.mi_info ').removeClass('hover')}
	);
	
	$('.slr_tab').each(function(){
	    var mySwiper = new Swiper (this, {
			autoplay: {
				delay: 3200, 
			},	    	
	      direction: 'horizontal',
	      loop: true,
	      slidesPerView: 2,
	      slidesPerGroup: 2,
	      speed: 2700,
	      setWrapperSize: true,
	      observer: true,
	      observeParents: true,
	      slideToClickedSlide: true,
	      navigation: {
	        nextEl: $(this).find('.swiper-button-next')[0],
	        prevEl: $(this).find('.swiper-button-prev')[0]
	      },
	      breakpoints: {
			650: {
			      slidesPerView: 1
			}	      	
	      }
	    })
	}); 

	$('.slr_tab2').each(function(){
	    var mySwiper = new Swiper (this, {
			autoplay: {
				delay: 3200,
			},	    	
	      direction: 'horizontal',
	      loop: true,
	      slidesPerView: 3,
	      speed: 2700,
	      setWrapperSize: true,
	      observer: true,
	      observeParents: true,
	      slideToClickedSlide: true,
	      navigation: {
	        nextEl: $(this).find('.swiper-button-next')[0],
	        prevEl: $(this).find('.swiper-button-prev')[0]
	      },
	      breakpoints: {
			550: {
			      slidesPerView: 1
			},	      	
			750: {
			      slidesPerView: 2
			}	      	
	      }
	    })
	}); 	

	$('.slr_apl').each(function(){
	    var mySwiper = new Swiper (this, {
			autoplay: {
				delay: 7200,
			},	    	
		    direction: 'horizontal',
		    loop: true,
		    slidesPerView: 1,
		    speed: 2700,
		    setWrapperSize: true,
		    observer: true,
		    observeParents: true,
		    slideToClickedSlide: true,
		    navigation: {
		        nextEl: $(this).closest('.apl_slrs').find('.swiper-button-next')[0],
		        prevEl: $(this).closest('.apl_slrs').find('.swiper-button-prev')[0]
		    },
			pagination: {
			    el: $(this).closest('.apl_slrs').find('.swiper-pagination'),
			    type: 'bullets',
			    clickable: true
			},	      
	    });
	});	


    $('select[name="city"]').change(function(){
    	var el = $(this).val();
    	$('.b_city .ct').css('display','none');
    	$('#c'+el).css('display','block');
    });	


	$('#ft').waypoint(function() {
		$('#ft').addClass('animated fadeInUp');
	}, { offset: '95%' }); 

	$('#t1').waypoint(function() {
		$('#t1').addClass('animated fadeInUp');
	}, { offset: '95%' });    

	$('#t2').waypoint(function() {
		$('#t2').addClass('animated fadeInUp');
	}, { offset: '95%' }); 

	$('#t3').waypoint(function() {
		$('#t3').addClass('animated fadeInUp');
	}, { offset: '95%' }); 

	$('#t4').waypoint(function() {
		$('#t4').addClass('animated fadeInUp');
	}, { offset: '95%' }); 

	$('#t5').waypoint(function() {
		$('#t5').addClass('animated fadeInUp');
	}, { offset: '95%' }); 	

	$('#t6').waypoint(function() {
		$('#t6').addClass('animated fadeInUp');
	}, { offset: '95%' });

	$('#t7').waypoint(function() {
		$('#t7').addClass('animated fadeInUp');
	}, { offset: '95%' });

	$('#t8').waypoint(function() {
		$('#t8').addClass('animated fadeInUp');
	}, { offset: '95%' }); 

	$('#t9').waypoint(function() {
		$('#t9').addClass('animated fadeInUp');
	}, { offset: '95%' });

	$('#t10').waypoint(function() {
		$('#t10').addClass('animated fadeInUp');
	}, { offset: '95%' }); 

	$('#t11').waypoint(function() {
		$('#t11').addClass('animated fadeInUp');
	}, { offset: '95%' }); 	

	$('#t12').waypoint(function() {
		$('#t12').addClass('animated fadeInUp');
	}, { offset: '95%' }); 

	$('#t13').waypoint(function() {
		$('#t13').addClass('animated fadeInUp');
	}, { offset: '95%' }); 

	$('#t14').waypoint(function() {
		$('#t14').addClass('animated fadeInUp');
	}, { offset: '95%' }); 	

	$('#t15').waypoint(function() {
		$('#t15').addClass('animated fadeInUp');
	}, { offset: '95%' }); 

	$('#t16').waypoint(function() {
		$('#t16').addClass('animated fadeInUp');
	}, { offset: '95%' }); 

	$('#t17').waypoint(function() {
		$('#t17').addClass('animated fadeInUp');
	}, { offset: '95%' }); 	

	$('#t18').waypoint(function() {
		$('#t18').addClass('animated fadeInUp');
	}, { offset: '95%' }); 

	$('#t19').waypoint(function() {
		$('#t19').addClass('animated fadeInUp');
	}, { offset: '95%' }); 

	$('#t20').waypoint(function() {
		$('#t20').addClass('animated fadeInUp');
	}, { offset: '95%' }); 	

	$('#t21').waypoint(function() {
		$('#t21').addClass('animated fadeInUp');
	}, { offset: '95%' }); 

	$('#t22').waypoint(function() {
		$('#t22').addClass('animated fadeInUp');
	}, { offset: '95%' }); 

	$('#t23').waypoint(function() {
		$('#t23').addClass('animated fadeInUp');
	}, { offset: '95%' }); 		

	$('#t24').waypoint(function() {
		$('#t24').addClass('animated fadeInUp');
	}, { offset: '95%' });

	$('#t25').waypoint(function() {
		$('#t25').addClass('animated fadeInUp');
	}, { offset: '95%' });	

	$('#t26').waypoint(function() {
		$('#t26').addClass('animated fadeInUp');
	}, { offset: '95%' });

	$('#t27').waypoint(function() {
		$('#t27').addClass('animated fadeInUp');
	}, { offset: '95%' });	

	$('#t28').waypoint(function() {
		$('#t28').addClass('animated fadeInUp');
	}, { offset: '95%' });

	$('#t29').waypoint(function() {
		$('#t29').addClass('animated fadeInUp');
	}, { offset: '95%' });	

	$('#t30').waypoint(function() {
		$('#t30').addClass('animated fadeInUp');
	}, { offset: '95%' });	

	$('#t31').waypoint(function() {
		$('#t31').addClass('animated fadeInUp');
	}, { offset: '95%' });	

	$('#t32').waypoint(function() {
		$('#t32').addClass('animated fadeInUp');
	}, { offset: '95%' });	

	$('#t33').waypoint(function() {
		$('#t33').addClass('animated fadeInUp');
	}, { offset: '95%' });	

	$('#t34').waypoint(function() {
		$('#t34').addClass('animated fadeInUp');
	}, { offset: '95%' });	

	$('#t35').waypoint(function() {
		$('#t35').addClass('animated fadeInUp');
	}, { offset: '95%' });	

	$('#t36').waypoint(function() {
		$('#t36').addClass('animated fadeInUp');
	}, { offset: '95%' });	

	$('#t37').waypoint(function() {
		$('#t37').addClass('animated fadeInUp');
	}, { offset: '95%' });	

	$('#t38').waypoint(function() {
		$('#t38').addClass('animated fadeInUp');
	}, { offset: '95%' });	

	$('#t39').waypoint(function() {
		$('#t39').addClass('animated fadeInUp');
	}, { offset: '95%' });

	$('#t40').waypoint(function() {
		$('#t40').addClass('animated fadeInUp');
	}, { offset: '95%' });							

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
	$('#l87').waypoint(function() {
		$('#l87').addClass('animated fadeInUp');
	}, { offset: '100%' });	
	$('#lq').waypoint(function() {
		$('#lq').addClass('animated fadeInUp');
	}, { offset: '100%' });

	function showScreen(){
		// var spanT = $('.f_ttl_txt .t'),
		// 	spanB = $('.f_ttl_txt .b'),
		// 	spanOne = $('.f_ttl_txt1'),
		// 	spanTwo = $('.f_ttl_txt2'),
		// 	ff_logo = $('.logom'),
		// 	zarw = $('.zarw'),
		// 	crc2 = $('.f_ttl_txt2 .crc');

		// var tlStar2 = new TimelineMax({repeat: -1, repeatDelay: 1.5});
		// tlStar2
		// .to(crc2, 2.25, {scale: 1.5, rotation: 180,  ease: Power0.easeNone})
		// .fromTo(crc2, 3, {x: -20, autoAlpha: 1,  ease: Power0.easeNone}, {x: 290, autoAlpha: 0,  ease: Power0.easeNone, repeat: 1, yoyo: true}, "+=0.75")
		// .to(crc2, 0, {scale: 0,  ease: Power0.easeNone});  		

		var tlT = new TimelineMax();
		tlT
		.to('.splash_screen', 3, {ease: Power1.easeInOut, y: -1050, delay: 2.5})
		// .to(ff_logo, 1, {autoAlpha: 1, ease: Power1.easeInOut}, "-=0.8")
		// .fromTo(spanT, 2.5, {y: -83, autoAlpha: 0}, {y: 0, autoAlpha: 1, ease: Power1.easeInOut})
		// .fromTo(spanB, 2.5, {y: 83, autoAlpha: 0}, {y: 0, autoAlpha: 1, ease: Power1.easeInOut}, "-=2.5")
		// .to(spanOne, 1.5, {autoAlpha: 0, ease: Power2.easeInOut, delay: 2}, "+=1")
		// .to(spanTwo, 1.5, {autoAlpha: 1, ease: Power2.easeInOut})
		// .to(zarw, 1.5, {autoAlpha: 1, ease: Power1.easeInOut}, "-=1.5")
		// .add(tlStar2);

	};

	function showScreen2(){
		var tlT2 = new TimelineMax();
		tlT2
		.to('.splash_screen', 0, {ease: Power1.easeInOut, y: -1050, delay: 0})
	}

	var $screen2 = $.cookie("screen2");
	var date = new Date();
	var minutes = 60;
	date.setTime(date.getTime() + (minutes * 60 * 1000));		
	if($screen2 == null) {
		$.cookie("screen2", "foo", { expires: date, path: '/' });
		showScreen();
	} else {
		showScreen2();
	}

	var bgmLogo = $('.bgm_forms .logom'),
		bgmTtl = $('.bgm_forms .bf_ttl'),
		bmgH = $('.bgm_forms .bgm_h5'),
		bmgFinp = $('.bgm_forms #finp'),
		bmgFpass = $('.bgm_forms #fpass'),
		bmgFbtn = $('.bgm_forms #fbtn'),
		bmgOver = $('.bgm_forms .over');

	var star = $('.bgm_forms .crc');
	var tlStar = new TimelineMax({repeat: -1, repeatDelay: 2});

	tlStar
	.to(star, 2.25, {scale: 1.5, rotation: 180,  ease: Power0.easeNone})
	.fromTo(star, 3, {x: -28, autoAlpha: 1,  ease: Power0.easeNone}, {x: 230, autoAlpha: 0,  ease: Power0.easeNone, repeat: 1, yoyo: true}, "+=0.75")
	.to(star, 0, {scale: 0,  ease: Power0.easeNone}); 


	var tlBmg = new TimelineMax();
	tlBmg.to(bmgOver, 1.5, {autoAlpha: 1, ease: Power0.easeNone}, "+=0.5")
	.to(bgmLogo, 1, {autoAlpha: 1, ease: Power0.easeNone}, "+=0.4")
	.to(bgmTtl, 1, {autoAlpha: 1, ease: Power0.easeNone})
	.to(bmgH, 1, {autoAlpha: 1, ease: Power0.easeNone}, "-=1")
	.to(bmgFinp, 1, {autoAlpha: 1, ease: Power0.easeNone}, "-=0.9")
	.to(bmgFpass, 1, {autoAlpha: 1, ease: Power0.easeNone}, "-=0.85")
	.to(bmgFbtn, 1, {autoAlpha: 1, ease: Power0.easeNone}, "-=0.8")
	.add(tlStar);		



});

$(window).load(function() {
	$("#loaders").hide("fast", function(){
		$(this).remove();
	});

    var $header = $('#header').outerHeight(true);

	    var swiperSlr = new Swiper('.m_slr', {
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
	        //grabCursor: true,
	        //slideToClickedSlide: true,
	        loop: false,
	        speed: 3200,
		    observer: true,
		    observeParents: true,
			pagination: {
				el: '.swp',
				type: 'bullets',
			}						  
	    });	
		swiperSlr.on('slideChange', function () {
			$('.slr_main_desc .m_slr_txt').hide().removeClass('active');
			$('div[data-id='+swiperSlr.activeIndex+']').show().addClass('active');
		});	



	    var swiperSlrX = new Swiper('.m_slrx', {
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
	        //grabCursor: true,
	        //slideToClickedSlide: true,
	        loop: false,
	        speed: 3200,
		    observer: true,
		    observeParents: true,
			pagination: {
				el: '.swpx',
				type: 'bullets',
			}		  
	    });	
		swiperSlrX.on('slideChange', function () {
			//console.log(swiperSlrX.activeIndex);
			$('.slr_main_descx .m_slr_txtx').hide().removeClass('active');
			$('div[data-idx='+swiperSlrX.activeIndex+']').show().addClass('active');
		});	

	
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
		$('.cnt_list').on('click', 'li:not(.active)', function() {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.cnt_tabs').find('.cnt_tabs_desc').removeClass('active').eq($(this).index()).addClass('active');
		});
	});
})(jQuery);







$(function() {
 $("body").on("submit", "#member_form", function(e) {
	e.preventDefault();
	var form = $(this);
	form.find(".notvalid").removeClass("notvalid");
	var err = false;
	form.find("input, select, textarea").each(function() {
		if($(this).hasClass("req") && $(this).val() == "")
		{
			err = true;
			$(this).addClass("notvalid");
		}
	});
	if(err) return false;
	$.post(
		"/ajax/ajax_membership_mobile_send.php",
		{data: form.serialize()},
		function(res)
		{
			if(res == "") 
			{
				form.trigger("reset");
				// popup msg
			}
		}
	);
 });
});
