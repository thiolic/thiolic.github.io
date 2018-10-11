$(function () {
    var priceField = $('.price input');
    var paymentField = $('.payment input');
    var priceStart = $('select option:first').val();
    var peopleInput = $('.people');
    var stepInput = $('.step');
    var discountInput = $('.discount');
    var allPayment = $('.all-payment');

    peopleInput.val(1);
    priceField.val(priceStart);

    $('.add').on('click', function () {
        $('.all-select .one-select:first-child').clone().appendTo('.all-select');
        removeSelect();
    });

    $(document).on('change', 'select', function () {
        var price2 = $(this).val();
        $(this).next().find('input').val(price2);
    });

   function removeSelect() {
       $('.remove-select').on('click', function () {
           $(this).parent().remove();
       });
   }

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

            localDiscount = (priceFull * person) - (discount * person);

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
            var localDiscount = 0;
            var priceFull = totalPrice();
            var eventsDiscount = 0;
            var totalDiscount = 0;
            var quantitySelect = $('.all-select').find('.one-select').length;

            if(quantitySelect > 1) {
                $('.all-select').find('option:selected').each(function(){
                    var eventPercent = parseInt($(this).data('events'));
                    var priceEvent = $(this).parent().parent().find('.price input');

                    if (eventsDiscount <= 25) {
                        localDiscount = parseInt(priceEvent.val()) * (eventPercent / 100);
                        eventsDiscount += eventPercent;
                    }

                    totalDiscount += localDiscount;
                });

                return totalDiscount;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }

    function discountForStudent(position) {
        var localDiscount = 0;
        var person = 0;
        var flagStudents = $('#check1').prop('checked');

        if ($('.tab1').hasClass('active')) {
            person = position;
        } else {
            person = 1;
        }

        var priceFull = totalPrice();
        var discount;

        if (flagStudents) {
            discount = getDiscounts('students', person);
        } else {
            discount = getDiscounts('members', person);
        }

        localDiscount = (priceFull * person) - (discount * person);

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

        paymentField.val(priceFull * people - totalDiscount);
        allPayment.val(priceFull * people);

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
