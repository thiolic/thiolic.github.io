$(function () {
    objectFitImages();
    $('.hero-slider').slick({
        autoplay: true,
        arrows: false,
        dots: true
    });

    $('.gallery-wrapper').slick({
        autoplay: false,
        infinite: false,
        arrows: true,
        nextArrow: '<svg role="img" class="gallery-next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M311.03 131.515l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L387.887 239H12c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h375.887l-83.928 83.444c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l116.485-116c4.686-4.686 4.686-12.284 0-16.971L328 131.515c-4.686-4.687-12.284-4.687-16.97 0z"></path></svg>',
        prevArrow: '<svg role="img" class="gallery-prev" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M136.97 380.485l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L60.113 273H436c6.627 0 12-5.373 12-12v-10c0-6.627-5.373-12-12-12H60.113l83.928-83.444c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0l-116.485 116c-4.686 4.686-4.686 12.284 0 16.971l116.485 116c4.686 4.686 12.284 4.686 16.97-.001z"></path></svg>',
    });

    $('.menu-toggle').on('click', function () {
        if($(this).hasClass('-is-open')) {
            $(this).removeClass('-is-open');
            $('.menu').removeClass('-is-open');
            $(document.body).removeClass('-overflow-hidde');
        } else {
            $(this).addClass('-is-open');
            $('.menu').addClass('-is-open');
            $(document.body).addClass('-overflow-hidde');
        }
    });
});
