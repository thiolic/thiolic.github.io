window.addEventListener('load', () => {
    let arr1 = [-9, 3, -5, 2, 7, 11, -6, 6, 4, -8];
    let arr2 = [];
    let arr3 = [121, 25, 57];
    let arr5;
    let arr6 = arr1.slice();
    let arr7 = arr1.slice();
    let summ = 0;
    let summ2 = 0;
    let summ3 = 0;
    let negative = 0;
    let avg = 0;
    let minValue;
    let maxValue;
    let minValueIndex;
    let maxValueIndex;
    let summ4 = 0;

    // Task 1

    console.log('Начальный массив: ' + arr1);

    arr2 = arr1.filter((elem) => {
        if (negative) {
            return summ += Math.abs(elem);
        }

        if (elem < 0 && !negative) {
            negative = 1;
        }
    });

    console.log('Массив после: ' + arr2);
    console.log('Сумма: ' + summ);

    //Task 2

    console.log('Номер минимального по модули элемента: ' + Math.min.apply(null, arr1.map(Math.abs)));

    //Task 3

    console.log('Третий массив: ' + arr3);

    arr3.toString().split('').map((elem) => {
        if (elem != ',') {
            return summ2 += +elem;
        }
    });

    console.log('Сумма цифр массива: ' + summ2);

    // Task 4


    minValue = Math.min.apply(null, arr7);
    maxValue = Math.max.apply(null, arr7);

    console.log('Минимальное значение в массиве: ' + minValue);
    console.log('Максимальное значение в массиве: ' + maxValue);

    minValueIndex = arr7.indexOf(minValue);
    maxValueIndex = arr7.indexOf(maxValue);

    arr7.forEach((elem, index) => {
        if (minValueIndex > maxValueIndex) {
            if (index < minValueIndex && index > maxValueIndex) {
                console.log(elem);
                summ4 += elem;
            }
        } else {
            if (index > minValueIndex && index < maxValueIndex) {
                console.log(elem);
                summ4 += elem;
            }
        }
    });

    console.log('Сумма элементов между минимальным и максимальным элементами: ' + summ4);

    // Task 5

    console.log('Массив для вычисления среднего арифметического: ' + arr6);

    arr5 = arr6.filter((elem) => {
        if (elem > 0) {
            return summ3 += elem;
        }
    });

    avg = summ3 / arr5.length;

    console.log('Среднее арифметическое положительных элементов массива: ' + avg);

});
