window.addEventListener('load', () => {
    let arr1 = [-9, 3, -5, 2, 7, 11, -6, 6, 4, -8];
    let arr2 = [];
    let arr3 = [121, 25, 57];
    let arr4;
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

    console.log('Начальный массив: ' + arr1);

    arr1.forEach((elem, index) => {
        if (elem < 0 && !negative) {
            arr2 = arr1.splice(index + 1, arr1.length);
            negative = 1;
        }
    });

    arr2.forEach((elem) => {
        summ += Math.abs(elem);
    });

    console.log('Массив после: ' + arr2);
    console.log('Сумма: ' + summ);
    console.log('Номер минимального по модули элемента: ' + Math.min.apply(null, arr1.map(Math.abs)));
    console.log('Третий массив: ' + arr3);

    arr4 = arr3.toString().split('');

    console.log('Элементы массива преобразованы в строку: ' + arr4);

    arr4.forEach((elem, index) => {
        if (elem === ',') {
            arr4.splice(index, 1);
        }
    });

    arr5 = arr4.map(Number);

    arr5.forEach((elem) => {
        summ2 += elem;
    });

    console.log('Массив чисел: ' + arr5);
    console.log('Сумма цифр массива: ' + summ2);

    arr6.forEach((elem) => {
        if (elem > 0) {
            summ3 += elem;
        }
    });

    avg = summ3 / arr6.length;

    console.log('Среднее арифметическое положительных элементов массива: ' + avg);

    minValue = Math.min.apply(null, arr7);
    maxValue = Math.max.apply(null, arr7);

    console.log('Минимальное значение в массиве: ' + minValue);
    console.log('Максимальное значение в массиве: ' + maxValue);

    minValueIndex = arr7.indexOf(minValue);
    maxValueIndex = arr7.indexOf(maxValue);

    // console.log(minValueIndex);
    // console.log(maxValueIndex);

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

});
