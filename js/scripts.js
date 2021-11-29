jQuery(document).ready(function($) {

//Page Preloader
$(window).load(function() { 
	$(".mask").delay(1000).fadeOut("slow");
});

// Fullscreen Slider
	$('#fullscreen-slider').superslides({
		animation: 'slide',
		pagination: 'false',
		play: 8000
	});
// SliderCaptions
	function metroSlideconfig(){
		$('.slider-captions').each(function(){
			var windowHeight = ($(window).height()/2),
			windowWidth = ($(window).width()/2),
			captionHeight = ($('.slider-captions').height()/2),
			captionWidth = ($('.slider-captions').width()/2);

				
			$('#fullscreen-slider').css({'height': (windowHeight * 2 ) + 'px' });
			$('#fullscreen-slider li').css({'width': $(window).width() + 'px' });
			
				
		});
	};
	metroSlideconfig()
	jQuery(window).resize(metroSlideconfig);

//Responsive Nav
	$('.nav a.colapse-menu1').click(function () { $(".navbar-collapse").collapse("hide") });
	$('body').on('touchstart.dropdown', '.dropdown-menu', function (e) { e.stopPropagation(); });	
		
//onepage nav
	var $nav = $('#navs');
	var $nav2 = $('.slider-captions');
    $nav.onePageNav({
       currentClass: 'active',
       filter: ':not(.external)',
       scrollThreshold: 0.25,
       scrollOffset: 30
    });
	$nav2.on('click', 'a', function(e) {
		var currentPos = $(this).parent().prevAll().length;

		$nav.find('li').eq(currentPos).children('a').trigger('click');

		e.preventDefault();
	});

//Sticky Nav
    $(".main-nav").sticky({ topSpacing: 0 });
//Parallax	
	$(window).bind('load', function () {
		parallaxInit();						  
	});

	function parallaxInit() {
		$('#parallax').parallax("30%", 0.1);
		$('#parallax-1').parallax("30%", 0.1);
		$('#parallax-2').parallax("30%", 0.1);
		/*add as necessary*/
	}
//Responsive slide For blog
	$(".rslides-portfolio").responsiveSlides({
		nav: true,
		auto: true,
		prevText: "<i class='fa fa-angle-left'></i>",
		nextText: "<i class='fa fa-angle-right'></i>"
	});	

//Animated Progress Bars
	$('.skill li').each(function () {
		$(this).appear(function() {
		  $(this).animate({opacity:1,left:"0px"},1200);
		  var b = $(this).find("span").attr("data-width");
		  $(this).find("span").animate({
			width: b + "%"
		  }, 1700, "easeOutCirc");
		});	
	});
//
//Portfolio Isotop
$(window).load(function(){
	var container = $('.portfolio-container');	
	container.isotope({
		animationEngine : 'best-available',
	  	animationOptions: {
	     	duration: 200,
	     	queue: false
	   	},
		layoutMode: 'fitRows'
	});	

	$('#options a').click(function(){
		$('#options a').removeClass('selected');
		$(this).addClass('selected');
		var selector = $(this).attr('data-option-value');
	  	container.isotope({ filter: selector });
        setProjects();		
	  	return false;
	});
		
		
		function splitColumns() { 
			var winWidth = $(window).width(), 
				columnNumb = 1;
			
			
			if (winWidth > 1024) {
				columnNumb = 5;
			} else if (winWidth > 900) {
				columnNumb = 2;
			} else if (winWidth > 479) {
				columnNumb = 2;
			} else if (winWidth < 479) {
				columnNumb = 1;
			}
			
			return columnNumb;
		}		
		
		function setColumns() { 
			var winWidth = $(window).width(), 
				columnNumb = splitColumns(), 
				postWidth = Math.floor(winWidth / columnNumb);
			
			container.find('.portfolio-item').each(function () { 
				$(this).css( { 
					width : postWidth + 'px' 
				});
			});
		}		
		
		function setProjects() { 
			setColumns();
			container.isotope('reLayout');
		}		
		
		container.imagesLoaded(function () { 
			setColumns();
		});
		
	
		$(window).bind('resize', function () { 
			setProjects();			
		});
  });

//Video carosule
	$("#video-carosule").owlCarousel({
	 
		//autoPlay: 3000, //Set AutoPlay to 3 seconds
		 
		items : 3,
		itemsDesktop : [1199,3],
		itemsDesktopSmall : [979,3],
		navigation: true,
		navigationText: [
		"<i class='fa fa-angle-left'></i>",
		"<i class='fa fa-angle-right'></i>"
		],
	});

//Testimonials Carosule
	$("#testimonials-carosule").owlCarousel({
	 
		//autoPlay: 3000, //Set AutoPlay to 3 seconds
		 
		items : 1,
		itemsDesktop : [1199,1],
		itemsDesktopSmall : [979,1],
		navigation: false
	});
 //prettyphoto
	jQuery("a[data-rel^='prettyPhoto']").prettyPhoto({hook: 'data-rel'});
	jQuery('a[data-rel]').each(function() {
	jQuery(this).attr('rel', $(this).attr('data-rel')).removeAttr('data-rel');
	});      


//Ajax portfolio load
	$(window).load(function() { 		
			var toLoad;
			$('.portfolio-container a').click(function(){
				$('html, body').animate({scrollTop:$('#portfolio').position().top}, 'slow');
				toLoad = $(this).attr('href');　
				$('.close-button').delay(1000).show(500);
				$('.portfolio-view .row').hide('fast',loadContent);
				$('.ajax-portfolio-loader').slideDown(500);　
				function loadContent() {　
					$('.portfolio-view .row').load(toLoad,showNewContent());
			　　	}　
				function showNewContent() {
					$('.portfolio-view .row').show(500,hideLoader());
				}
				function hideLoader() {
					$('.ajax-portfolio-loader').slideUp(500);
				}
				return false;
			});
			
			$(".close-button").click(function() {
				$('.portfolio-view .row').html('');
				$(this).hide('fast');
				$('.ajax-portfolio-loader').slideUp(500);
			});

	});
//Google Maps
      $('#gmap').gmap3({
        marker:{address:"Haltern am See, Weseler Str. 151", options:{icon: "img/location1.png"}},
        map:{
            options:{
              zoom: 14
            }
           }
      });

    //Contact From
    $(document).ready(function ()
    { 
     $('#submit').formValidator({
        scope: '#form'
      });
      
      $('#post-commentsss').formValidator({
        scope: '#comments-form'
      });
      
      $('#submit,#post-commentsss').click(function() {
            $('input.error-input, textarea.error-input').delay(300).animate({marginLeft:0},100).animate({marginLeft:10},100).animate({marginLeft:0},100).animate({marginLeft:10},100);
        });

      // Form plugin

      var options = {

        beforeSubmit: function() {
          $('.sending').show();

        },
        success: function() {
          $('.sending').hide();
          $('#form').hide();
          $(".mess").show().html('<h5>Thanks !</h5><h5>Your message has been sent.</h5>'); // Change Your message post send
          $('.mess').delay(3000).fadeOut(function() {

            $('#form').clearForm();
            $('#form').delay(3500).show();

          });
        }
      };
      

      $('#form').submit(function() {
        $(this).ajaxSubmit(options);
        return false;
      });
        
    });            
});	