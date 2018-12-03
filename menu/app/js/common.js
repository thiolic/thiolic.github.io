$(function () {
    objectFitImages();

    $('.menu-toggle').on('click', function () {
        if($(this).hasClass('-is-open')) {
            $(this).removeClass('-is-open');
            $('.menu, .nav-wrapper, .menu-wrapper').removeClass('-is-open');
            $(document.body).removeClass('-overflow-hidde');
        } else {
            $(this).addClass('-is-open');
            $('.menu, .nav-wrapper, .menu-wrapper').addClass('-is-open');
            $(document.body).addClass('-overflow-hidde');
        }
    });
});
