window.addEventListener('load', () => {
    let arr1 = [9, 3, -5, 2, -11, -6, 6, 2,  4, 4, -8];
    let arr2 = arr1.slice();
    let arr3 = [];
    let minNegativeValue = 0;
    let minNegativeIndex = 0;
    let counter = [];
    let currentElem;
    let arr4 = arr1.slice();
    let arr5 = arr1.slice();
    let arr6 = [];
    let arr7 = arr1.slice();
    let arr8 = arr1.slice();
    let step = 3;
    let minValue = 0;
    let maxValue = 0;
    let minValueIndex;
    let maxValueIndex;

    // Task 1 - Максимальный отрицательный элемент массива и его индекс

    // arr1.forEach((elem, index) => {
    //     if (minNegativeValue > elem) {
    //         minNegativeValue = elem;
    //         minNegativeIndex = index;
    //     }
    // });
    //
    // console.log(minNegativeValue, minNegativeIndex);

    // Task 2

    // console.log('Начальный массив: ' + arr2);
    //
    // arr3 = arr2.reduce((current, elem) => {
    //     let count = 0;
    //
    //     if (current === elem) {
    //         count++;
    //     }
    //
    //     counter.push(count);
    //     console.log(current, elem);
    //
    //     return elem;
    // });

    // console.log(arr3);
    // console.log(counter);

    // Task 3 - Поменять местами минимальный и максимальный элементы

    // console.log('Начальный массив: ' + arr8);
    //
    // arr8.map((elem, index) => {
    //     if (elem < minValue) {
    //         minValue = elem;
    //         minValueIndex = index;
    //     } else if (elem > maxValue){
    //         maxValue = elem;
    //         maxValueIndex = index;
    //     }
    //
    //     if (index === arr7.length - 1) {
    //         arr8[minValueIndex] = maxValue;
    //         arr8[maxValueIndex] = minValue;
    //     }
    //
    //     return elem;
    // });
    //
    // console.log('Массив после: ' + arr8);

    // Task 4 - Сдвиг массива

    // console.log(arr7);
    //
    // arr7.splice(2, 2 + step, 0);
    //
    // console.log(arr7);

    // Task 5 - Вывести неповторяющиеся элементы массива

    // arr6 = arr5.filter((elem, index, arr) => {
    //     console.log(arr.indexOf(elem), elem, index);
    //     return arr.indexOf(elem) === index;
    // });
    //
    // console.log('Неповторяющиеся элементы массива: ' + arr6);

    // Task 6 - Реверс массива

    // console.log(arr4.reverse());
});
