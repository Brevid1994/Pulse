$(document).ready(function () {
    $('.carousel__inner').slick({
        // adaptiveHeight: true,
        speed: 1200,
        // autoplay: true,
        // autoplaySpeed: 2000,
        // fade: true,
        // cssEase: 'Linear',
        prevArrow: '<button type="button" class="slick-prev"><img src="icon/left_arrow.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icon/right_arrow.svg"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false,
                }
            },

            {
                breakpoint: 768,
                settings: {
                    dots: false,
                    arrows: false,
                    autoplay: true,
                    mobileFirst: true,
                }
            }
        ],
    }
    );

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        })
    }
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // modal

    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    })

    $('.button_mini').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text())
            $('.overlay, #order').fadeIn('slow');
        })
    })

    function validateForm(form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Пожалуйста, введите свое имя",
                phone: 'Пожалуйста, введите свой номер телефона',
                email: {
                    required: "Пожалуйста, введите свою электронную почту",
                    email: "Непавильно введен адрес электронной почты"
                }
            }
        });
    }
    validateForm('#consultation-form');
    validateForm('#consultation form');
    validateForm('#order form');

    $('input[name=phone]').mask('+7 (999) 999-9999');


    $('form').submit(function (e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });


    // pageup

    $(window).scroll(function () {
        if ($(this).scrollTop() > 900) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }

    })

    $("a").on('click', function () {

        if (this.hash !== "") {
            const hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                window.location.hash = hash;
            });
        }
    });

});

