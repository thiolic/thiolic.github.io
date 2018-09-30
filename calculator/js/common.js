$(function () {
    var priceField = $('.price input');
    var paymentField = $('.payment input');
    var priceStart = $('select option:first').val();
    var peopleInput = $('.people');
    var stepInput = $('.step');
    var discountInput = $('.discount');

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

        return priceFull;
    }

    function discountWithPeople(person) {
        if (!$('.tab3').hasClass('active')) {
            var localDiscount = 0;
            var priceFull = totalPrice();
            var discount = getDiscounts('members', person);

            localDiscount = priceFull - discount;

            return localDiscount;
        } else {
            return 0;
        }
    }

    function getDiscounts(dataParams, position) {
        var localDiscount = 0;
        position = position - 1;

        $('.all-select').find('option:selected').each(function(){
            var priceArray = $(this).data(dataParams).split(', ');

            if (priceArray[position] !== undefined) {
                localDiscount += parseInt(priceArray[position]);
            } else {
                return localDiscount = priceArray[0];
            }
        });

        return localDiscount;
    }

    function discountMoreEvents() {
        if (!$('.tab1').hasClass('active') && !$('.tab3').hasClass('active')) {
            var step = parseInt(stepInput.val());
            var localDiscount = 0;
            var priceFull = totalPrice();

            var quantitySelect = $('.all-select').find('.one-select').length;
            var maxPercent = quantitySelect * step;

            if (maxPercent > 25) {
                maxPercent = 25;
            }

            localDiscount = priceFull * (maxPercent / 100);

            return localDiscount;
        } else {
            return 0;
        }
    }

    function discountForStudent(position) {
        var localDiscount = 0;
        var person = 0;

        if ($('.tab1').hasClass('active')) {
            person = position;
        } else {
            person = 1;
        }

        var priceFull = totalPrice();
        var discount = getDiscounts('students', person);

        localDiscount = priceFull - discount;

        return localDiscount;
    }

    function calculateDiscount(mass) {
        var discountPeople = 0;
        var discountEvents = 0;
        var discountStudent = 0;

        var priceFull = totalPrice();

        var people = parseInt(peopleInput.val());

        var totalDiscount = 0;

        mass.forEach(function (tab) {
            if(tab !== null) {
                if(tab == 'tab1') {
                    discountPeople = discountWithPeople(people);
                }
                if(tab == 'tab2') {
                    discountEvents = discountMoreEvents(people);
                }
                if(tab == 'tab3') {
                    discountStudent = discountForStudent(people);
                }
            }
        });

        totalDiscount = discountPeople + discountEvents + discountStudent;

        paymentField.val(priceFull - totalDiscount);

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
