(function ($) {
    "use strict";

    var $window = $(window);
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* Preloader Effect */
    $window.on("load", function () {
        $(".preloader").fadeOut(600);
    });

    /* slick nav */
    $('#main-menu').slicknav({
        prependTo: '#responsive-menu',
        label: '',
        closeOnClick: true
    });
    $('.slicknav_btn').attr('aria-label', 'Ouvrir le menu');

    /* Sticky Header */
    var header = document.querySelector(".header");
    var navbar = document.getElementById("main-navbar");

    function updateStickyHeader() {
        if (!header) {
            return;
        }
        if (window.pageYOffset > 12) {
            header.classList.add("is-sticky");
            if (navbar) {
                navbar.classList.add("sticky-header");
            }
        } else {
            header.classList.remove("is-sticky");
            if (navbar) {
                navbar.classList.remove("sticky-header");
            }
        }
    }

    window.addEventListener("scroll", updateStickyHeader, { passive: true });
    updateStickyHeader();

    /* Top Menu */
    $(document).on('click', '.navbar-nav li a, #responsive-menu ul li a, .header-cta, .footer-nav a, .navbar-brand, .footer-brand', function () {
        if ($(this).hasClass("has-popup")) {
            return false;
        }
        var id = $(this).attr('href');
        if (id && id.charAt(0) === "#" && $(id).length) {
            var h = parseFloat($(id).offset().top);
            $('body,html').stop().animate({
                scrollTop: h - 110
            }, reduceMotion ? 0 : 800);
            return false;
        }
    });

    /* Gallery lightbox */
    var $haspopup = $(".gallery");
    if ($haspopup.length) {
        $haspopup.magnificPopup({
            delegate: 'a:not(.is-hidden)',
            type: 'image',
            gallery: {
                enabled: true
            },
            zoom: reduceMotion ? { enabled: false } : {
                enabled: true,
                duration: 300,
                easing: 'ease-in-out',
                opener: function (openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });
    }

    /* Functional gallery filters */
    $(document).on('click', '.gallery-filter', function () {
        var filter = $(this).data('filter');
        var $buttons = $(this).closest('.gallery-filters').find('.gallery-filter');
        var $items = $('.gallery-item');

        $buttons.removeClass('is-active').attr('aria-pressed', 'false');
        $(this).addClass('is-active').attr('aria-pressed', 'true');

        if (filter === 'all') {
            $items.removeClass('is-hidden');
        } else {
            $items.each(function () {
                var categories = ($(this).data('category') || '').toString();
                $(this).toggleClass('is-hidden', categories.indexOf(filter) === -1);
            });
        }

        if ($haspopup.length && $haspopup.data('magnificPopup')) {
            $haspopup.magnificPopup('close');
        }
    });

    $('.gallery-filter').attr('aria-pressed', 'false');
    $('.gallery-filter.is-active').attr('aria-pressed', 'true');

    /* Testimonial slider */
    if ($('.testimonial-slider').length) {
        new Swiper('.testimonial-slider', {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 0,
            pagination: {
                el: '.testimonial-pagination',
                type: 'bullets',
                clickable: true
            }
        });
    }

    /* Event slider */
    if ($('.event-slider').length) {
        new Swiper('.event-slider', {
            loop: true,
            slidesPerView: 3,
            spaceBetween: 0,
            pagination: {
                el: '.event-pagination',
                type: 'bullets',
                clickable: true
            },
            breakpoints: {
                991: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                768: {
                    slidesPerView: 1,
                    spaceBetween: 0
                }
            }
        });
    }

    /* Popup video */
    var $popupvideo = $(".popup-video");
    if ($popupvideo.length) {
        $popupvideo.magnificPopup({
            type: 'iframe',
            preloader: true
        });
    }

    /* Animate with wow js */
    if (!reduceMotion) {
        new WOW({ mobile: false }).init();
    }

    /* Animated Header Slider Start */
    if ($('.swiper-container.banner-slider').length) {
        var swiperAnimation = new SwiperAnimation();
        new Swiper('.swiper-container.banner-slider', {
            effect: 'fade',
            speed: reduceMotion ? 0 : 2000,
            autoplay: reduceMotion ? false : {
                delay: 6000
            },
            navigation: {
                nextEl: '.banner-button-next',
                prevEl: '.banner-button-prev'
            },
            on: {
                init: function () {
                    swiperAnimation.init(this).animate();
                },
                slideChange: function () {
                    swiperAnimation.init(this).animate();
                }
            }
        });
    }

})(jQuery);
