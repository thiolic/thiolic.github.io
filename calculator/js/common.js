$(function () {
    var priceField = $('.price input');
    var paymentField = $('.payment input');
    var priceStart = $('select option:first').val();
    var peopleInput = $('.people');
    var discountInput = $('.discount');

    var disc05 = 0.05,
        disc1 = 0.1,
        disc15 = 0.15,
        disc20 = 0.20,
        disc25 = 0.25,
        disc35 = 0.35;

    peopleInput.val(2);
    priceField.val(priceStart);

    $('.add').on('click', function () {
        $('.all-select .one-select:last-child').clone().appendTo('.all-select');
    });

    $(document).on('change', 'select', function () {
        var price2 = $(this).val();
        $(this).next().find('input').val(price2);
    });
    
    function discountWithPeople (person) {
        if (person < 3) {
            discountInput.val(0);
        }
        if (person > 2 && person < 5) {
            discountInput.val(parseInt(priceField.val() * disc05));
        }
        if (person > 4 && person < 11) {
            discountInput.val(parseInt(priceField.val() * disc1));
        }
        if (person > 9) {
            discountInput.val(parseInt(priceField.val() * disc15));
        }

        var discount = discountInput.val();
        var totalPrice = priceField.val() * person - discount;
        paymentField.val(totalPrice);
    }

    function discountMoreEvents() {
        var priceFull = 0;
        $('.all-select').find('.price input').each(function(){
            priceFull += parseInt($(this).val());
        });

        var length = $('.all-select').find('.one-select').length;
        if (length < 2) {
            discountInput.val(0);
        }
        if (length == 2) {
            discountInput.val(parseInt(priceFull * disc05));
        }
        if (length == 3) {
            discountInput.val(parseInt(priceFull * disc1));
        }
        if (length == 4) {
            discountInput.val(parseInt(priceFull * disc15));
        }
        if (length == 5) {
            discountInput.val(parseInt(priceFull * disc20));
        }
        if (length > 5) {
            discountInput.val(parseInt(priceFull * disc25));
        }
        var discount = discountInput.val();
        var totalPrice = priceFull - discount;
        paymentField.val(totalPrice);
    }

    function discountStudent() {
        discountInput.val(parseInt(priceField.val() * disc35));
        var discStud = discountInput.val();
        var totalPrice = priceField.val() - discStud;
        paymentField.val(totalPrice);
    }

    function calculateDiscount() {

    }

    $('.options li button').on('click', function () {
        console.log($(this));
        if($(this).parent().hasClass('active')) {
            $(this).parent().removeClass('active')
        } else {
            $(this).parent().addClass('active');
        }
    });

    $('.to-count').click(function () {
        if($('.tab1').hasClass('active')) {
            var people = peopleInput.val();
            discountWithPeople(people);
        } else if($('.tab2').hasClass('active')) {
            discountMoreEvents();
        } else if($('.tab3').hasClass('active')) {
            discountStudent();
        }
    });
});
