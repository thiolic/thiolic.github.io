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
        $('.all-select .one-select:first-child').clone().appendTo('.all-select');
    });

    $(document).on('change', 'select', function () {
        var price2 = $(this).val();
        $(this).next().find('input').val(price2);
    });

    function totalPrice() {
        var priceFull = 0;
        $('.all-select').find('.price input').each(function(){
            priceFull += parseInt($(this).val());
        });

        paymentField.val(priceFull);

        return priceFull;
    }

    function discountWithPeople (person) {
        var localDiscount = 0;
        var priceFull = totalPrice();

        if (person < 3) {
            localDiscount = 0;
        }
        if (person > 2 && person < 5) {
            localDiscount = priceFull * disc05;
        }
        if (person > 4 && person < 10) {
            localDiscount = priceFull * disc1;
        }
        if (person > 9) {
            localDiscount = priceFull * disc15;
        }

        // var discount = discountInput.val();
        // var totalPrice = priceField.val() * person - discount;
        // paymentField.val(totalPrice);

        return localDiscount;
    }

    function discountMoreEvents() {
        var localDiscount = 0;
        var priceFull = totalPrice();

        var length = $('.all-select').find('.one-select').length;
        if (length < 2) {
            localDiscount = 0;
        }
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

        // var totalPrice = priceFull - discount;
        // paymentField.val(totalPrice);

        return localDiscount;
    }

    function discountForStudent() {
        var localDiscount = 0;
        var priceFull = totalPrice();

        localDiscount = priceFull * disc35;
        // var discStud = discountInput.val();
        // var totalPrice = priceField.val() - discStud;
        // paymentField.val(totalPrice);

        return localDiscount;
    }

    function calculateDiscount(mass) {
        var discountPeople = 0;
        var discountEvents = 0;
        var discountStudent = 0;

        var people = peopleInput.val();

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
        return totalDiscount;
    }

    $('.options li button').on('click', function () {
        if($(this).parent().hasClass('active')) {
            $(this).parent().removeClass('active')
        } else {
            $(this).parent().addClass('active');
        }
    });

    $('.to-count').click(function () {
        var tabs = [];

        $('.options').find('li').each(function(){
            if($(this).hasClass('active')) {
                tabs.push($(this).data('tab'));
            } else {
                tabs.push(null);
            }
        });

        discountInput.val(calculateDiscount(tabs));
    });

});
