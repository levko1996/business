$(document).ready(function () {
			var w = $(window).outerWidth();
			var h = $(window).outerHeight();
			var ua = window.navigator.userAgent;
			var msie = ua.indexOf("MSIE ");
			var isMobile = {
				Android: function () {
					return navigator.userAgent.match(/Android/i);
				},
				BlackBerry: function () {
					return navigator.userAgent.match(/BlackBerry/i);
				},
				iOS: function () {
					return navigator.userAgent.match(/iPhone|iPad|iPod/i);
				},
				Opera: function () {
					return navigator.userAgent.match(/Opera Mini/i);
				},
				Windows: function () {
					return navigator.userAgent.match(/IEMobile/i);
				},
				any: function () {
					return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
				}
			};

			function isIE() {
				ua = navigator.userAgent;
				var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
				return is_ie;
			}
			if (isIE()) {
				$('body').addClass('ie');
			}
			if (isMobile.any()) {
				$('body').addClass('touch');
			}
function testWebP(callback) {

	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

	if (support == true) {
		document.querySelector('body').classList.add('webp');
	}
});
	var isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function () {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};
	if (isMobile.any()) {}

	if (location.hash) {
		var hsh = location.hash.replace('#', '');
		if ($('.popup-' + hsh).length > 0) {
			popupOpen(hsh);
		} else if ($('div.' + hsh).length > 0) {
			$('body,html').animate({
				scrollTop: $('div.' + hsh).offset().top,
			}, 500, function () {});
		}
	}
	$('.wrapper').addClass('loaded');

	var act = "click";
	if (isMobile.iOS()) {
		var act = "touchstart";
	}

	$('.menu-header__icon').click(function (event) {
		$(this).toggleClass('active');
		$('.menu-header__menu').toggleClass('active');
		if ($(this).hasClass('active')) {
			$('body').data('scroll', $(window).scrollTop());
		}
		$('body').toggleClass('lock');
		if (!$(this).hasClass('active')) {
			$('body,html').scrollTop(parseInt($('body').data('scroll')));
		}
	});

	//ZOOM
	if ($('.gallery').length > 0) {
		baguetteBox.run('.gallery', {
			// Custom options
		});
	}
	/*
	CLOUD-ZOOM
	<a rel="position:'right',adjustX:25,adjustY:0,Width: 432" href="img/product/zoom.jpg" class="cloud-zoom product-main-mainimage__item">
		<img class="cloudzoom-gallery" src="img/product/zoom.jpg" alt="" />
	</a>
	*/


	//POPUP
	$('.pl').click(function (event) {
		var pl = $(this).attr('href').replace('#', '');
		var v = $(this).data('vid');
		popupOpen(pl, v);
		return false;
	});

	function popupOpen(pl, v) {
		$('.popup').removeClass('active').hide();
		if (!$('.header-menu').hasClass('active')) {
			$('body').data('scroll', $(window).scrollTop());
		}
		if (!isMobile.any()) {
			$('body').css({
				paddingRight: $(window).outerWidth() - $('.wrapper').outerWidth()
			}).addClass('lock');
			$('.pdb').css({
				paddingRight: $(window).outerWidth() - $('.wrapper').outerWidth()
			});
		} else {
			setTimeout(function () {
				$('body').addClass('lock');
			}, 300);
		}
		history.pushState('', '', '#' + pl);
		if (v != '' && v != null) {
			$('.popup-' + pl + ' .popup-video__value').html('<iframe src="https://www.youtube.com/embed/' + v + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>');
		}
		$('.popup-' + pl).fadeIn(300).delay(300).addClass('active');

		if ($('.popup-' + pl).find('.slick-slider').length > 0) {
			$('.popup-' + pl).find('.slick-slider').slick('setPosition');
		}
	}

	function openPopupById(popup_id) {
		$('#' + popup_id).fadeIn(300).delay(300).addClass('active');
	}

	function popupClose() {
		$('.popup').removeClass('active').fadeOut(300);
		if (!$('.header-menu').hasClass('active')) {
			if (!isMobile.any()) {
				setTimeout(function () {
					$('body').css({
						paddingRight: 0
					});
					$('.pdb').css({
						paddingRight: 0
					});
				}, 200);
				setTimeout(function () {
					$('body').removeClass('lock');
					$('body,html').scrollTop(parseInt($('body').data('scroll')));
				}, 200);
			} else {
				$('body').removeClass('lock');
				$('body,html').scrollTop(parseInt($('body').data('scroll')));
			}
		}
		$('.popup-video__value').html('');

		history.pushState('', '', window.location.href.split('#')[0]);
	}
	$('.popup-close,.popup__close').click(function (event) {
		popupClose();
		return false;
	});
	$('.popup').click(function (e) {
		if (!$(e.target).is(".popup>.popup-table>.cell *") || $(e.target).is(".popup-close") || $(e.target).is(".popup__close")) {
			popupClose();
			return false;
		}
	});
	$(document).on('keydown', function (e) {
		if (e.which == 27) {
			popupClose();
		}
	});

	$('.goto').click(function () {
		var el = $(this).attr('href').replace('#', '');
		var offset = 0;
		$('body,html').animate({
			scrollTop: $('.' + el).offset().top + offset
		}, 500, function () {});

		if ($('.header-menu').hasClass('active')) {
			$('.header-menu,.header-menu__icon').removeClass('active');
			$('body').removeClass('lock');
		}
		return false;
	});

	function ibg() {
		$.each($('.ibg'), function (index, val) {
			if ($(this).find('img').length > 0) {
				$(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
			}
		});
	}
	ibg();

	//Клик вне области
	$(document).on('click touchstart', function (e) {
		if (!$(e.target).is(".select *")) {
			$('.select').removeClass('active');
		};
	});

	//UP
	$(window).scroll(function () {
		var w = $(window).width();
		if ($(window).scrollTop() > 50) {
			$('#up').fadeIn(300);
		} else {
			$('#up').fadeOut(300);
		}
	});
	$('#up').click(function (event) {
		$('body,html').animate({
			scrollTop: 0
		}, 300);
	});

	$('body').on('click', '.tab__navitem', function (event) {
		var eq = $(this).index();
		if ($(this).hasClass('parent')) {
			var eq = $(this).parent().index();
		}
		if (!$(this).hasClass('active')) {
			$(this).closest('.tabs').find('.tab__navitem').removeClass('active');
			$(this).addClass('active');
			$(this).closest('.tabs').find('.tab__item').removeClass('active').eq(eq).addClass('active');
			if ($(this).closest('.tabs').find('.slick-slider').length > 0) {
				$(this).closest('.tabs').find('.slick-slider').slick('setPosition');
			}
		}
	});
	$.each($('.spoller.active'), function (index, val) {
		$(this).next().show();
	});
	$('body').on('click', '.spoller', function (event) {
		if ($(this).hasClass('mob') && !isMobile.any()) {
			return false;
		}
		if ($(this).hasClass('closeall') && !$(this).hasClass('active')) {
			$.each($(this).closest('.spollers').find('.spoller'), function (index, val) {
				$(this).removeClass('active');
				$(this).next().slideUp(300);
			});
		}
		$(this).toggleClass('active').next().slideToggle(300, function (index, val) {
			if ($(this).parent().find('.slick-slider').length > 0) {
				$(this).parent().find('.slick-slider').slick('setPosition');
			}
		});
		return false;
	});



	function scrolloptions() {
		var scs = 100;
		var mss = 50;
		var bns = false;
		if (isMobile.any()) {
			scs = 10;
			mss = 1;
			bns = true;
		}
		var opt = {
			cursorcolor: "#fff",
			cursorwidth: "4px",
			background: "",
			autohidemode: true,
			cursoropacitymax: 0.4,
			bouncescroll: bns,
			cursorborderradius: "0px",
			scrollspeed: scs,
			mousescrollstep: mss,
			directionlockdeadzone: 0,
			cursorborder: "0px solid #fff",
		};
		return opt;
	}

	function scroll() {
		$('.scroll-body').niceScroll('.scroll-list', scrolloptions());
	}
	if (navigator.appVersion.indexOf("Mac") != -1) {} else {
		if ($('.scroll-body').length > 0) {
			scroll();
		}
	}

	/*
	function scrollwhouse(){
			var scs=100;
			var mss=50;
			var bns=false;
		if(isMobile.any()){
			scs=10;
			mss=1;
			bns=true;
		}
		var opt={
			cursorcolor:"#afafaf",
			cursorwidth: "5px",
			background: "",
			autohidemode:false,
			railalign: 'left',
			cursoropacitymax: 1,
			bouncescroll:bns,
			cursorborderradius: "0px",
			scrollspeed:scs,
			mousescrollstep:mss,
			directionlockdeadzone:0,
			cursorborder: "0px solid #fff",
		};
		return opt;
	}
	$('.whouse-content-body').niceScroll('.whouse-content-scroll',scrollwhouse());
	$('.whouse-content-body').scroll(function(event) {
			var s=$(this).scrollTop();
			var r=Math.abs($(this).outerHeight()-$('.whouse-content-scroll').outerHeight());
			var p=s/r*100;
		$('.whouse-content__shadow').css({opacity:1-1/100*p});
	});
	*/


	if ($('.t,.tip').length > 0) {
		tip();
	}

	function tip() {
		$('.t,.tip').webuiPopover({
			placement: 'top',
			trigger: 'hover',
			backdrop: false,
			//selector:true,
			animation: 'fade',
			dismissible: true,
			padding: false,
			//hideEmpty: true
			onShow: function ($element) {},
			onHide: function ($element) {},
		}).on('show.webui.popover hide.webui.popover', function (e) {
			$(this).toggleClass('active');
		});
	}
function map(n) {
	google.maps.Map.prototype.setCenterWithOffset = function (latlng, offsetX, offsetY) {
		var map = this;
		var ov = new google.maps.OverlayView();
		ov.onAdd = function () {
			var proj = this.getProjection();
			var aPoint = proj.fromLatLngToContainerPixel(latlng);
			aPoint.x = aPoint.x + offsetX;
			aPoint.y = aPoint.y + offsetY;
			map.panTo(proj.fromContainerPixelToLatLng(aPoint));
			//map.setCenter(proj.fromContainerPixelToLatLng(aPoint));
		}
		ov.draw = function () {};
		ov.setMap(this);
	};
	var markers = new Array();
	var infowindow = new google.maps.InfoWindow({
		//pixelOffset: new google.maps.Size(-230,250)
	});
	var locations = [
		[new google.maps.LatLng(53.819055, 27.8813694)],
		[new google.maps.LatLng(53.700055, 27.5513694)],
		[new google.maps.LatLng(53.809055, 27.5813694)],
		[new google.maps.LatLng(53.859055, 27.5013694)],
	]
	var options = {
		zoom: 3,
		panControl: false,
		mapTypeControl: false,
		center: locations[0][0],
		styles: [{
			"featureType": "landscape.natural",
			"elementType": "geometry.fill",
			"stylers": [{
				"visibility": "on"
			}, {
				"color": "#e0efef"
			}]
		}, {
			"featureType": "poi",
			"elementType": "geometry.fill",
			"stylers": [{
				"visibility": "on"
			}, {
				"hue": "#1900ff"
			}, {
				"color": "#c0e8e8"
			}]
		}, {
			"featureType": "road",
			"elementType": "geometry",
			"stylers": [{
				"lightness": 100
			}, {
				"visibility": "simplified"
			}]
		}, {
			"featureType": "road",
			"elementType": "labels",
			"stylers": [{
				"visibility": "off"
			}]
		}, {
			"featureType": "transit.line",
			"elementType": "geometry",
			"stylers": [{
				"visibility": "on"
			}, {
				"lightness": 700
			}]
		}, {
			"featureType": "water",
			"elementType": "all",
			"stylers": [{
				"color": "#7dcdcd"
			}]
		}],
		scrollwheel: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById('map'), options);
	var icon = {
		url: 'assets/img/icons/map.svg',
		scaledSize: new google.maps.Size(24, 29),
		anchor: new google.maps.Point(12, 15)
	}
	for (var i = 0; i < locations.length; i++) {
		var marker = new google.maps.Marker({
			icon: icon,
			position: locations[i][0],
			map: map,
		});
		google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {
				for (var m = 0; m < markers.length; m++) {
					markers[m].setIcon(icon);
				}
				var cnt = i + 1;
				infowindow.setContent($('.contacts-map-item_' + cnt).html());
				infowindow.open(map, marker);
				marker.setIcon(icon);
				map.setCenterWithOffset(marker.getPosition(), 0, 0);
				setTimeout(function () {
					baloonstyle();
				}, 10);
			}
		})(marker, i));
		markers.push(marker);
	}

	if (n) {
		var nc = n - 1;
		setTimeout(function () {
			google.maps.event.trigger(markers[nc], 'click');
		}, 500);
	}
}

function baloonstyle() {
	$('.gm-style-iw').parent().addClass('baloon');
	$('.gm-style-iw').prev().addClass('baloon-style');
	$('.gm-style-iw').next().addClass('baloon-close');
	$('.gm-style-iw').addClass('baloon-content');
}
if ($("#map").length > 0) {
	map(1);
}


/* YA
function map(n){
	ymaps.ready(init);
	function init(){ 
		// Создание карты.
		var myMap = new ymaps.Map("map", {
			// Координаты центра карты.
			// Порядок по умолчанию: «широта, долгота».
			// Чтобы не определять координаты центра карты вручную,
			// воспользуйтесь инструментом Определение координат.
			controls: [],
			center: [43.585525,39.723062],
			// Уровень масштабирования. Допустимые значения:
			// от 0 (весь мир) до 19.
			zoom: 10
		});
		
		myPlacemar = new ymaps.Placemark([43.585525,39.723062],{
			id:'2'
		},{
			// Опции.
			hasBalloon:false,
			hideIconOnBalloonOpen:false,
			// Необходимо указать данный тип макета.
			iconLayout: 'default#imageWithContent',
			// Своё изображение иконки метки.
			iconImageHref: 'img/icons/map.svg',
			// Размеры метки.
			iconImageSize: [40, 40],
			// Смещение левого верхнего угла иконки относительно
			// её "ножки" (точки привязки).
			iconImageOffset: [-20, -20],
			// Смещение слоя с содержимым относительно слоя с картинкой.
			iconContentOffset: [0,0],
		});
		myMap.geoObjects.add(myPlacemar);

		myMap.behaviors.disable('scrollZoom');
	}
}
*/
});