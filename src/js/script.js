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
            }
        ],
    }
    );
}); 