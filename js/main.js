var $body,
	windowHeight,
	windowWidth,
	mediaPoint1 = 1024,
	mediaPoint2 = 768,
	mediaPoint3 = 480,
	mediaPoint4 = 320;



$(document).ready(function ($) {
    //------------------------------------------------------------custom

    /*функция показа модального окна*/
    function showPopup(icon, popup) {
        $(icon).on('click', function (e) {
            e.preventDefault();
            $(popup).addClass('popup-show');
            $(popup).parents('.fixed-overlay').addClass('is-visible');
            $('body').addClass('body-popup');
        });
    }

    showPopup(".header-phone", '.popup__request-call');
    showPopup(".header-email", '.popup__write-to-us');
    showPopup(".header-cabinet", '.popup-authorization');
    showPopup(".header-city", '.popup-city');
    showPopup(".header-mobile__city", '.popup-city');


    $('.popup-authorization .popup-authorization__reg').on('click', function (e) {
        e.preventDefault();
        $(this).parents('.popup').removeClass('popup-show');
        $(this).parents('.fixed-overlay').removeClass('is-visible');
        $('.popup-reg').addClass('popup-show');
        $('.popup-reg').parents('.fixed-overlay').addClass('is-visible');
    });

    $('.popup-reg .popup-authorization__auth').on('click', function (e) {
        e.preventDefault();
        $(this).parents('.popup').removeClass('popup-show');
        $(this).parents('.fixed-overlay').removeClass('is-visible');
        $('.popup-authorization').addClass('popup-show');
        $('.popup-authorization').parents('.fixed-overlay').addClass('is-visible');
    });

    $(".popup-close").click(function (e) {
        e.preventDefault();
        $(this).parents('.popup').removeClass('popup-show');
        $('.fixed-overlay').removeClass('is-visible');
        $('body').removeClass('body-popup');
    });


    $("#mobile-reg").click(function (e) {
        e.preventDefault();
        $('.popup').removeClass('popup-show');
        $('.popup-reg').addClass('popup-show');
        $('.popup-reg').parents('.fixed-overlay').addClass('is-visible');
        $('body').addClass('body-popup');
    });

    $("#mobile-auth").click(function (e) {
        e.preventDefault();
        $('.popup').removeClass('popup-show');
        $('.popup-authorization').addClass('popup-show');
        $('.popup-authorization').parents('.fixed-overlay').addClass('is-visible');
        $('body').addClass('body-popup');
    });

    /*показ мобильного поиска*/
    $(".header-mobile__search .icon-search").click(function (e) {
        e.preventDefault();
        $('.header-mobile__search-box').show();
        $('.header-mobile__menu').hide();
        $('.header-mobile__search .icon-search').hide();
        $('.icon-search-mobile').show();
        $('.header-mobile__search-input').focus();
        $('.header-mobile__auth').removeClass('popup-slide__show');
        $('.header').addClass('header-top__hide');
    });

    /*скрываем мобильного поиска*/
    $(".icon-search-mobile").click(function (e) {
        e.preventDefault();
        $('.header-mobile__search-box').hide();
        $('.header-mobile__menu').show();
        $('.header-mobile__search .icon-search').show();
        $(this).hide();
        $('.header').removeClass('header-top__hide');
    });

    $(document).mouseup(function (e) { // событие клика по веб-документу
        var div = $('.header-mobile__search-box'); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0) { // и не по его дочерним элементам
            
            $('.header-mobile__menu').show();
            $('.header-mobile__search-box').hide();
            $('.header-mobile__search .icon-search').show();
            $('.header-mobile__search .icon-search-mobile').hide();
            $('.header').removeClass('header-top__hide');
        }
    });

    // закрытие по клику все области экрана
    $(".popup-bg").click(function (e) {
        e.preventDefault();
        $('.popup').removeClass('popup-show');
        $(this).removeClass('is-visible');
        $('body').removeClass('body-popup');
    });

    /*клик вне области экрана для корзины*/

    function hidePopup (element, instrumentHide){
        $(document).mouseup(function (e) { // событие клика по веб-документу
            var div = $(element); // тут указываем ID элемента
            if (!div.is(e.target) // если клик был не по нашему блоку
                && div.has(e.target).length === 0) { // и не по его дочерним элементам
                div.removeClass(instrumentHide); // скрываем его
                // $('.fixed-overlay').removeClass('is-visible');
                // $('body').removeClass('body-popup');
            }
        });
    }

    hidePopup('.popup-basket', 'popup-slide__show');
    // hidePopup('.popup', 'popup-show');
    hidePopup('.header-mobile__auth', 'popup-slide__show');

    $(document).mouseup(function (e) { // событие клика по веб-документу
        var div = $('.popup-body'); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0) { // и не по его дочерним элементам
            div.parents('.popup').removeClass('popup-show'); // скрываем его
            $('.fixed-overlay').removeClass('is-visible');
            $('body').removeClass('body-popup');
        }
    });

    // мобильный заказать звонок, показываем форму и удаляем надпись
    $(".mobile-request-call_inquiry").click(function (e) {
        e.preventDefault();
        $(this).css({
            'opacity': '0',
            'visibility': 'hidden',
            'display':'none'
        });
        $('.mobile-request-call__form').css({
            'opacity': '1',
            'visibility': 'visible',
            'display':'block'
        });
    });

    /*показываем в попапе закзать звонок список городов*/
    $(".mobile-request-call_city").on('click', function (e) {
        e.preventDefault();
        console.log('click click');
        // $('.popup-request-city').show();
        $('.popup-request-city').addClass('popup-show');
    });

    $(".popup-request-city").click(function (e) {
        e.preventDefault();
        $(this).hide();
    });

    /*попап корзины*/
    $('.header-basket').on('click', function () {
        $('.popup-basket').addClass('popup-slide__show');
        $('.header').addClass('header-top__no-hide');
    });
    $('.popup-basket__close').on('click', function () {
        $('.popup-basket').removeClass('popup-slide__show');
        $('.header').removeClass('header-top__no-hide');
    });

    function catalogItemCounter(field) {
        var fieldCount = function (el) {
            var
                // Мин. значение
                min = el.data('min') || false,

                // Макс. значение
                max = el.data('max') || false,
                // Кнопка уменьшения кол-ва
                dec = el.prev('.dec'),
                // Кнопка увеличения кол-ва
                inc = el.next('.inc');

            function init(el) {
                if (!el.attr('disabled')) {
                    dec.on('click', decrement);
                    inc.on('click', increment);
                }

                // Уменьшим значение
                function decrement() {
                    var value = parseInt(el[0].value);
                    value--;

                    if (!min || value >= min) {
                        el[0].value = value;
                    }
                };

                // Увеличим значение
                function increment() {
                    var value = parseInt(el[0].value);

                    value++;

                    if (!max || value <= max) {
                        el[0].value = value++;
                    }
                };

            }

            el.each(function () {
                init($(this));
            });
        };

        $(field).each(function () {
            fieldCount($(this));
        });
    }

    catalogItemCounter('.fieldCount');

   /*мобильное меню*/
	$('.header-mobile__menu').on('click', function(){
		$(this).toggleClass('icon-menu__transform');
		$('.header-mobile__dropdown').toggleClass('popup-show');
		$('.header').toggleClass('header-top__hide');
		/*прячем верхнюю полоску в шапке*/
        // $('body').addClass('body-popup');
	});

    $('.header-mobile__dropdown-close').on('click', function(){
        $('.header-mobile__menu').toggleClass('icon-menu__transform');
        $('.header-mobile__dropdown').toggleClass('popup-show');
	});


	$('.header-mobile__cabinet').on('click', function(){
		$('.header-mobile__auth').toggleClass('popup-slide__show');
	});

    //кнопка вверх
    var offset = 300,
        offset_opacity = 1200,
        scroll_top_duration = 700,
        $back_to_top = $('.cd-top');
    //кнопка назад
    $(window).scroll(function(){
        ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
        if( $(this).scrollTop() > offset_opacity ) {
            $back_to_top.addClass('cd-fade-out');
        }
    });

    //smooth scroll to top
    $back_to_top.on('click', function(event){
        event.preventDefault();
        $('body,html').animate({
                scrollTop: 0
            }, scroll_top_duration
        );
    });

    /*липкая шапка*/
    $(window).scroll(function(){
        var bo = $(window).scrollTop();
        if ( bo > 20 ) {
            $(".header").addClass('header-top__hide');
        } else {
            $(".header").removeClass('header-top__hide');
        }
    });



    /*-------------------------------------------------------------*/

    /*-------------------------------------------------------------*/

// });

    //------------------------------------------------------------custom###

	$body = $('body');
	windowWidth = $(window).width();
	windowHeight = $(window).height();

	//developer funcitons
	pageWidget(['index']);
	getAllClasses('html','.elements_list');
});

$(window).on('load', function () {
	loadFunc();
});

$(window).on('resize', function () {
	resizeFunc();
});

$(window).on('scroll', function () {
	scrollFunc();
});

function loadFunc() {

}
function resizeFunc() {
	updateSizes();
}

function scrollFunc() {
	updateSizes();
}

function updateSizes() {
	windowWidth = $(window).width();
	windowHeight = $(window).height();
}

if ('objectFit' in document.documentElement.style === false) {
	document.addEventListener('DOMContentLoaded', function () {
		Array.prototype.forEach.call(document.querySelectorAll('img[data-object-fit]'), function (image) {
			(image.runtimeStyle || image.style).background = 'url("' + image.src + '") no-repeat 50%/' + (image.currentStyle ? image.currentStyle['object-fit'] : image.getAttribute('data-object-fit'));

			image.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'' + image.width + '\' height=\'' + image.height + '\'%3E%3C/svg%3E';
		});
	});
}

//Functions for development
function getAllClasses(context, output) {
	var finalArray = [],
		mainArray = [],
		allElements = $(context).find($('*'));//get all elements of our page
	//If element has class push this class to mainArray
	for (var i = 0; i < allElements.length; i++) {
		var someElement = allElements[i],
			elementClass = someElement.className;
		if (elementClass.length > 0) {//if element have not empty class
			//If element have multiple classes - separate them
			var elementClassArray = elementClass.split(' '),
				classesAmount = elementClassArray.length;
			if (classesAmount === 1) {
				mainArray.push('.' + elementClassArray[0] + ' {');
			} else {
				var cascad = '.' + elementClassArray[0] + ' {';
				for (var j = 1; j < elementClassArray.length; j++) {
					cascad += ' &.' + elementClassArray[j] + ' { }';
				}
				mainArray.push(cascad);
			}
		}
	}

	//creating finalArray, that don't have repeating elements
	var noRepeatingArray = unique(mainArray);
	noRepeatingArray.forEach(function (item) {
		var has = false;
		var preWords = item.split('&');
		for (var i = 0; i < finalArray.length; ++i) {
			var newWords = finalArray[i].split('&');
			if (newWords[0] == preWords[0]) {
				has = true;
				for (var j = 0; j < preWords.length; ++j) {
					if (newWords.indexOf(preWords[j]) < 0) {
						newWords.push(preWords[j]);
					}
				}
				finalArray[i] = newWords.join('&');
			}
		}
		if (!has) {
			finalArray.push(item);
		}
	});
	for (var i = 0; i < finalArray.length; i++) {
		$('<div>' + finalArray[i] + ' }</div>').appendTo(output);
	}

	//function that delete repeating elements from arrays, for more information visit http://mathhelpplanet.com/static.php?p=javascript-algoritmy-obrabotki-massivov
	function unique(A) {
		var n = A.length, k = 0, B = [];
		for (var i = 0; i < n; i++) {
			var j = 0;
			while (j < k && B[j] !== A[i]) j++;
			if (j == k) B[k++] = A[i];
		}
		return B;
	}
}
/*
function pageWidget(pages) {
	var widgetWrap = $('<div class="widget_wrap"><ul class="widget_list"></ul></div>');
	widgetWrap.prependTo("body");
	for (var i = 0; i < pages.length; i++) {
		$('<li class="widget_item"><a class="widget_link" href="' + pages[i] + '.html' + '">' + pages[i] + '</a></li>').appendTo('.widget_list');
	}
	var widgetStilization = $('<style>body {position:relative} .widget_wrap{position:absolute;top:0;left:0;z-index:9999;padding:10px 20px;background:#222;border-bottom-right-radius:10px;-webkit-transition:all .3s ease;transition:all .3s ease;-webkit-transform:translate(-100%,0);-ms-transform:translate(-100%,0);transform:translate(-100%,0)}.widget_wrap:after{content:" ";position:absolute;top:0;left:100%;width:24px;height:24px;background:#222 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAABGdBTUEAALGPC/xhBQAAAAxQTFRF////////AAAA////BQBkwgAAAAN0Uk5TxMMAjAd+zwAAACNJREFUCNdjqP///y/DfyBg+LVq1Xoo8W8/CkFYAmwA0Kg/AFcANT5fe7l4AAAAAElFTkSuQmCC) no-repeat 50% 50%;cursor:pointer}.widget_wrap:hover{-webkit-transform:translate(0,0);-ms-transform:translate(0,0);transform:translate(0,0)}.widget_item{padding:0 0 10px}.widget_link{color:#fff;text-decoration:none;font-size:15px;}.widget_link:hover{text-decoration:underline} </style>');
	widgetStilization.prependTo(".widget_wrap");
}
*/