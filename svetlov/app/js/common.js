$(function () {
    objectFitImages();
    $('.hero-slider').slick({
        autoplay: true,
        arrows: false,
        dots: true
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
