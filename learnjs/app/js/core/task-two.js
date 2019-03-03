window.addEventListener('load', () => {
    let arr1 = [1, 3, -5, 2, 7, 11, -6, 6, 4, -6];
    let arr2 = [];
    let arr3 = [];
    let arr4 = arr1.slice();
    let summ1 = 0;
    let total = 0;

    for (let i = 0; i < arr1.length; i++) {
        total += arr1[i];
        if (arr1[i] % 2 == 0 && arr1[i] > 0) {
            summ1 += arr1[i];
            arr2.push(arr1[i]);
        }
    }

    let avg = total / arr1.length;

    console.log('Начальный массив: ' + arr1);
    console.log('Сумма четных положительных элементов: ' + summ1);
    console.log('Массив четных элементов: ' + arr2);
    console.log('Максимальное значение: ' + Math.max.apply(null, arr2));
    console.log('Среднее арифмиическое:' + avg);

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] < avg) {
            arr3.push(arr1[i]);
        }
    }

    console.log('Элементы меньше среднего арифмитического значния: ' + arr3);

    console.log(arr1.sort((a, b) => {return a - b} ));

    console.log('Два минимальных элемента: ' + arr1.slice(0, 2));

    for (let i = 0; i < arr4.length; i++) {
        if (arr4[i] > 2 && arr4[i] < 7) {
            arr4.splice(i--, 1);
            arr4.splice(arr4.length, 0, 0);
        }
    }

    console.log('Удалены элементы в дипозоне от 2 до 7: ' + arr4);
});
