/* Scroll sticky */
$(window).scroll(function() {
    var the_top = $(document).scrollTop();
    if (the_top > 100) {$('.home-page .header').addClass('sticky');}
    else {$('.home-page .header').removeClass('sticky');}
});
$(document).ready(function () {
    $('body').addClass('render');
    $('.hamburger').trigger('click');
    /* Shape */
    $('#wpadminbar .ab-top-menu li a').addClass('no-shape');
    $('a:not(.no-shape)').on('click', function(e) {
        e.preventDefault();
        $('.hamburger').trigger('click');
        var url = $(this).attr('href');
        setInterval(function() {
            window.location = url;
        }, 700);
    });
    /* Header Sandwich */
    $('.header-sandwich').click(function() {
        if($('.header-mob').hasClass('open')) {
            $('body').removeAttr('style');
            $('.header-mob').removeClass('open');
        }
        else {
            $('body').css('overflow','hidden');
            $('.header-mob').addClass('open');
        }
    });
    /* Fancybox Nested */
    $('.nested').click(function () {
        parent.$.fancybox.close();
    });
    /* Textarea autoResize */
    if (document.querySelector('textarea')) {
        autosize(document.querySelectorAll('textarea'));
    }
    /* Screen Banner Arrow */
    $('.screen-banner .btn-arrow').click(function() {
        $('html, body').animate({scrollTop: $('.screen-tasks').offset().top - 59},1000);
    });
    $('.screen-events .btn-reg').click(function(){
        var price = $(this).parents('.photo-wr').next('.info').find('.options .price .numb').text();
        var event = $(this).parents('.photo-wr').next('.info').find('.title h3').text();
        $('#popup-reg2 .price .numb').text(price);
        $('#popup-reg2 .price input').val(price);
        $('#popup-reg2 .events ul li').text(event);
        $('#popup-reg2 .events input').val(event);
    });
    $('.education-list .btn-reg').click(function(){
        var price = $(this).prevAll('.options').find('.price .numb').text();
        var event = $(this).prevAll('h3').text();
        $('#popup-reg2 .price .numb').text(price);
        $('#popup-reg2 .price input').val(price);
        $('#popup-reg2 .events ul li').text(event);
        $('#popup-reg2 .events input').val(event);
    });
    $('.education-card .btn-reg').click(function(){
        var price = $(this).prev('.options').find('.price .numb').text();
        var event = $(this).parents('.content').prevAll('.inner-title').find('h1').text();
        $('#popup-reg2 .price .numb').text(price);
        $('#popup-reg2 .price input').val(price);
        $('#popup-reg2 .events ul li').text(event);
        $('#popup-reg2 .events input').val(event);
    });
    /* Sessions (slider) */
    $('.education-list .slider').slick({
        fade: true,
        cssEase: 'linear'
    });
    /* Archive (video play) */
    $('.archive-page_card .video .btn').click(function() {
        if($(this).parent('.video').hasClass('pause')) {
            $(this).parent('.video').removeClass('pause');
            $(this).parent('.video').addClass('play');
            $(this).next('video').trigger('pause');
        }
        else {
            $(this).parent('.video').removeClass('play');
            $(this).parent('.video').addClass('pause');
            $(this).next('video').trigger('play');
        }
    });
    /* Archive (slider) */
    var $status = $('.archive-page_card .slider-wr .pagingInfo');
    var $slickElement = $('.archive-page_card .slider');
    $slickElement.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
        var i = (currentSlide ? currentSlide : 0) + 1;
        $status.html('<span class="color">'+ i +'</span>' + '<span class="divide">|</span>' + '<span class="count">'+ slick.slideCount +'</span>');
    });
    $slickElement.slick({
        infinite: true,
        centerMode: true,
        variableWidth: true
    });
    $('.archive-page_card .slider-wr .arrow-text .prev').clone().appendTo('.archive-page_card .slider .slick-prev');
    $('.archive-page_card .slider-wr .arrow-text .next').clone().appendTo('.archive-page_card .slider .slick-next');
    /* Tours (tabs) */
    $('.tours-page .route-schedule .tabs-content .block:first-child').addClass('active');
    /* Contacts page */
    $('.contacts-info .btn').click(function() {
        $(this).parents('.contacts-info').removeClass('active');
        $('.contacts-form').addClass('active');
    });
    /* Submit change disabled*/
    $('.wpcf7-form').find('.wpcf7-submit').prop('disabled', true);
    $('body').on('change', '.agreement-checkbox', function(){
        if($(this).prop('checked')){
            $(this).closest('.wpcf7-form').find('.wpcf7-submit').prop('disabled', false);
        }else{
            $(this).closest('.wpcf7-form').find('.wpcf7-submit').prop('disabled', true);
        }
    });
});
if(window.matchMedia('(min-width: 1025px)').matches) {
    /* Tours (tabs) */
    $('.tours-page .route-schedule .tabs ul li:first-child').addClass('active');
    $('.tours-page .route-schedule .tabs ul li').click(function(){
        $(this).addClass('active').siblings().removeClass('active').closest('.tours-page .route-schedule .content').find('.tabs-content > div').removeClass('active').eq($(this).index()).addClass('active');
    });
    /* Tours (tabs object) */
    if($('div').is('.object, .wave')) {
        var menuWidth = $('.tours-page .route-schedule .tabs ul li').outerWidth();
        var menuLeft = $('.tours-page .route-schedule .tabs ul li').position().left;
        var menuWidthFull = menuWidth + menuLeft;
        $('.tours-page .route-schedule .tabs .object').stop().animate({
            left: menuLeft,
            width: menuWidth
        }, 500, 'linear');
        $('.tours-page .route-schedule .tabs .wave').stop().animate({
            width: menuWidthFull
        }, 500, 'linear');
    }
    $('.tours-page .route-schedule .tabs ul li').click(function(){
        var menuWidth = $(this).outerWidth();
        var menuLeft = $(this).position().left;
        $('.tours-page .route-schedule .tabs .object').stop().animate({
            left: menuLeft,
            width: menuWidth
        }, 500, 'linear');
    });
    /* Tours (tabs wave) */
    $('.tours-page .route-schedule .tabs ul li').click(function(){
        var menuWidth = $(this).outerWidth();
        var menuLeft = $(this).position().left;
        var menuWidthFull = menuWidth + menuLeft;
        $('.tours-page .route-schedule .tabs .wave').stop().animate({
            width: menuWidthFull
        }, 500, 'linear');
    });
}
if(window.matchMedia('(min-width: 768px)').matches) {
    /* Program Loyalty (tabs) */

    var disc05 = 0.05,
        disc1 = 0.1,
        disc15 = 0.15,
        disc20 = 0.20,
        disc25 = 0.25,
        disc35 = 0.35;

    var count = 1;
    var discountInput =  $('.program-loyalty .desktop .bottom').find('.discount input');
    var paymentField = $('.program-loyalty .desktop .bottom .total input');

    $('.program-loyalty .desktop .options ul li').each(function () {

        $(this).attr('data-tab', 'tab' + count);
        count ++;
    });

    $('.program-loyalty .desktop .options ul li').click(function(){
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
        }

        if ($('.program-loyalty .desktop .options ul li').hasClass('active')) {
            $('.program-loyalty .desktop .middle, .program-loyalty .desktop .bottom').addClass('active');
        } else {
            $('.program-loyalty .desktop .middle, .program-loyalty .desktop .bottom').removeClass('active');
        }
    });

    $('.program-loyalty .desktop .options ul li.tab1').click(function(){
        if ($(this).hasClass('active')) {$('.program-loyalty .desktop .middle').removeClass('no-slide');}
        else {$('.program-loyalty .desktop .middle').addClass('no-slide');}
    });
    $('.program-loyalty .desktop .options ul li.tab2').click(function(){
        if ($(this).hasClass('active')) {$('.program-loyalty .desktop .middle .add').removeClass('hidden');}
        else {
            $('.program-loyalty .desktop .middle .table .trow:not(:first-child)').remove();
            $('.program-loyalty .desktop .middle .add').addClass('hidden');
        }
    });

    $('.program-loyalty .desktop .add').click(function() {
        $('.program-loyalty .desktop .tbody .trow:first-child').clone().appendTo('.program-loyalty .desktop .tbody');
    });

    /* Program Loyalty (calculation) */
    $('.program-loyalty .desktop .options').one('click', function(){
        var price1 = $('.program-loyalty .desktop .event select option:first').val();
        $('.program-loyalty .desktop .price input').val(price1);
    });

    $(document).on('change', '.program-loyalty .desktop .event select', function () {
        var price2 = $(this).val();
        $(this).parent().next('.price').find('input').val(price2);
    });

    function totalPrice() {
        var priceFull = 0;
        $('.program-loyalty .desktop').find('.price input').each(function(){
            priceFull += parseInt($(this).val());
        });

        return priceFull;
    }

    function discountWithPeople (person) {
        var localDiscount = 0;
        var priceFull = totalPrice();

        if (person > 2 && person < 5) {
            localDiscount = priceFull * disc05;
        }
        if (person > 4 && person < 10) {
            localDiscount = priceFull * disc1;
        }
        if (person > 9) {
            localDiscount = priceFull * disc15;
        }

        return localDiscount;
    }

    function discountMoreEvents() {
        var localDiscount = 0;
        var priceFull = totalPrice();

        var length = $('.program-loyalty .desktop .middle').find('.tbody .trow').length;

        if (length == 2) {
            localDiscount = priceFull * disc05;
        }
        if (length == 3) {
            localDiscount = priceFull * disc1;
        }
        if (length == 4) {
            localDiscount = priceFull * disc15;
        }
        if (length == 5) {
            localDiscount = priceFull * disc20;
        }
        if (length > 5) {
            localDiscount = priceFull * disc25;
        }

        return localDiscount;
    }

    function discountForStudent() {
        var localDiscount = 0;
        var priceFull = totalPrice();

        localDiscount = priceFull * disc35;

        return localDiscount;
    }

    function calculateDiscount(mass) {
        var discountPeople = 0;
        var discountEvents = 0;
        var discountStudent = 0;

        var priceFull = totalPrice();
        var people = $('.program-loyalty .desktop .middle').find('.persons .ui-slider-handle').text();

        var totalDiscount = 0;

        mass.forEach(function (tab) {
            if(tab !== null) {
                if(tab == 'tab1') {
                    discountPeople = discountWithPeople(people);
                }
                if(tab == 'tab2') {
                    discountEvents = discountMoreEvents();
                }
                if(tab == 'tab3') {
                    discountStudent = discountForStudent();
                }
            }
        });

        totalDiscount = discountPeople + discountEvents + discountStudent;


        paymentField.val(priceFull - totalDiscount);

        return totalDiscount;
    }

    $('.program-loyalty .desktop .btn1').click(function(){
        var tabs = [];

        $('.program-loyalty .desktop .options ul li').each(function(){
            if($(this).hasClass('active')) {
                tabs.push($(this).data('tab'));
            } else {
                tabs.push(null);
            }
        });

        discountInput.val(calculateDiscount(tabs));
    });

    $('.program-loyalty .desktop .btn-reg').click(function(){
        var price = $('.program-loyalty .desktop .bottom .total input').val();
        var event = $('.program-loyalty .desktop .main .event select option:selected').text();
        $('.popup-reg_loyalty .price .numb').text(price);
        $('.popup-reg_loyalty .price input').val(price);
        $('.popup-reg_loyalty .events ul li').text(event);
        $('.popup-reg_loyalty .events input').val(event);
        if ($('.program-loyalty .desktop .options ul li.tab3').hasClass('active')) {
            $('.popup-reg_loyalty .upload').removeClass('hidden');
        } else {
            $('.popup-reg_loyalty .upload').addClass('hidden');
        }
    });
    /* Program Loyalty (slider) */
    $(function() {
        var handle = $('.program-loyalty .desktop #custom-handle');
        $('.program-loyalty .desktop #slider').slider({
            range: 'min',
            min: 2,
            max: 30,
            create: function() {handle.text($(this).slider('value') );},
            slide: function(event, ui) {
                handle.text(ui.value);
            }
        });
    });
}
if(window.matchMedia('(max-width: 1024px)').matches) {
    /* Tours (slider) */
    $('.tours-page .route-schedule .tabs ul').slick({
        infinite: false
    });
    /* Tours (tabs) */
    $('.tours-page .route-schedule .tabs .slick-arrow').click(function() {
        if($('.tours-page .route-schedule .tabs ul li').hasClass('slick-active')) {
            $('.tours-page .route-schedule .tabs ul li.slick-active').click(function(){
                $(this).parents('.tabs').next('.tabs-content').find('.block').removeClass('active').eq($(this).index()).addClass('active');
            });
            $('.tours-page .route-schedule .tabs ul li.slick-active').trigger('click');
        }
    });
}
if(window.matchMedia('(max-width: 767px)').matches) {
    /* Program Loyalty (tabs) */
    $('.program-loyalty .mobile .options ul li').click(function(){
        if ($(this).hasClass('active')) {$(this).removeClass('active');}
        else {$(this).addClass('active');}
        if ($('.program-loyalty .mobile .options ul li').hasClass('active')) {$('.program-loyalty .mobile .middle, .program-loyalty .mobile .bottom').addClass('active');}
        else {$('.program-loyalty .mobile .middle, .program-loyalty .mobile .bottom').removeClass('active');}
    });
    $('.program-loyalty .mobile .options ul li.tab1').click(function(){
        if ($(this).hasClass('active')) {$('.program-loyalty .mobile .middle').removeClass('no-slide');}
        else {$('.program-loyalty .mobile .middle').addClass('no-slide');}
    });
    $('.program-loyalty .mobile .options ul li.tab2').click(function(){
        if ($(this).hasClass('active')) {$('.program-loyalty .mobile .middle .add').removeClass('hidden');}
        else {
            $('.program-loyalty .mobile .middle .table .trow:not(:first-child)').remove();
            $('.program-loyalty .mobile .middle .add').addClass('hidden');
        }
    });
    $('.program-loyalty .mobile .add').click(function() {
        $('.program-loyalty .mobile .tbody .trow:last-child').clone().appendTo('.program-loyalty .mobile .tbody');
    });
    /* Program Loyalty (calculation) */
    $('.program-loyalty .mobile .options').one('click', function(){
        var price1 = $('.program-loyalty .mobile .event select option:first').val();
        $('.program-loyalty .mobile .price input').val(price1);
    });
    $(document).on('change', '.program-loyalty .mobile .event select', function () {
        var price2 = $(this).val();
        $(this).parent().next('.price').find('input').val(price2);
    });
    $('.program-loyalty .mobile .btn1').click(function() {
        if ($('.program-loyalty .mobile .options ul li.tab1').hasClass('active')) {
            var persons = $(this).parent().prev('.main').find('.persons .ui-slider-handle').text();
            var price = $(this).parent().prev('.main').find('.price input').val();
            var disc5 = parseInt(price * 0.05);
            var disc10 = parseInt(price * 0.1);
            var disc15 = parseInt(price * 0.15);
            if (persons < 3) {
                $(this).parents('.middle').find('.bottom .discount input').val(0);
            }
            if (persons > 2 && persons < 5) {
                $(this).parents('.middle').find('.bottom .discount input').val(disc5);
            }
            if (persons > 4 && persons < 11) {
                $(this).parents('.middle').find('.bottom .discount input').val(disc10);
            }
            if (persons > 9) {
                $(this).parents('.middle').find('.bottom .discount input').val(disc15);
            }
            var discPers = $(this).parents('.middle').find('.bottom .discount input').val();
            var total = price * persons - discPers;
            $(this).parents('.middle').find('.bottom .total input').val(total);
        }
    });
    $('.program-loyalty .mobile .btn1').click(function(){
        if ($('.program-loyalty .mobile .options ul li.tab2').hasClass('active')) {
            var price = $(this).parent().prev('.main').find('.price input').val();
            var priceFull = 0;
            $(this).parent().prev('.main').find('.price input').each(function(){
                priceFull += parseInt($(this).val());
            });
            var length = $(this).parent().prev('.main').find('.tbody .trow').length;
            var disc2 = parseInt(priceFull * 0.05);
            var disc3 = parseInt(priceFull * 0.1);
            var disc4 = parseInt(priceFull * 0.15);
            var disc5 = parseInt(priceFull * 0.20);
            var disc6 = parseInt(priceFull * 0.25);
            if (length < 2) {
                $(this).parents('.middle').find('.bottom .discount input').val(0);
            }
            if (length == 2) {
                $(this).parents('.middle').find('.bottom .discount input').val(disc2);
            }
            if (length == 3) {
                $(this).parents('.middle').find('.bottom .discount input').val(disc3);
            }
            if (length == 4) {
                $(this).parents('.middle').find('.bottom .discount input').val(disc4);
            }
            if (length == 5) {
                $(this).parents('.middle').find('.bottom .discount input').val(disc5);
            }
            if (length > 5) {
                $(this).parents('.middle').find('.bottom .discount input').val(disc6);
            }
            var discEven = $(this).parents('.middle').find('.bottom .discount input').val();
            var total = priceFull - discEven;
            $(this).parents('.middle').find('.bottom .total input').val(total);
        }
    });
    $('.program-loyalty .mobile .btn1').click(function(){
        if ($('.program-loyalty .mobile .options ul li.tab3').hasClass('active')) {
            var price = $(this).parent().prev('.main').find('.price input').val();
            var discStud = parseInt(price * 0.35);
            var discount = $(this).parents('.middle').find('.bottom .discount input').val(discStud);
            var total = price - discStud;
            $(this).parents('.middle').find('.bottom .total input').val(total);
        }
    });
    $('.program-loyalty .mobile .btn-reg').click(function(){
        var price = $('.program-loyalty .mobile .bottom .total input').val();
        var event = $('.program-loyalty .mobile .main .event select option:selected').text();
        $('.popup-reg_loyalty .price .numb').text(price);
        $('.popup-reg_loyalty .price input').val(price);
        $('.popup-reg_loyalty .events ul li').text(event);
        $('.popup-reg_loyalty .events input').val(event);
        if ($('.program-loyalty .mobile .options ul li.tab3').hasClass('active')) {
            $('.popup-reg_loyalty .mobile .upload').removeClass('hidden');
        } else {
            $('.popup-reg_loyalty .mobile .upload').addClass('hidden');
        }
    });
    /* Program Loyalty (slider) */
    $(function() {
        var handle = $('.program-loyalty .mobile #custom-handle');
        $('.program-loyalty .mobile #slider').slider({
            range: 'min',
            min: 2,
            max: 30,
            create: function() {handle.text($(this).slider('value') );},
            slide: function(event, ui) {
                handle.text(ui.value);
            }
        });
    });
}