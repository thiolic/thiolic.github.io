window.addEventListener('load', () => {
    let arr1 = [1, 3, -5, 2, 7, 11, -6, 6, 4, -6];
    let arr2;
    let summ = 0;
    let negative = 0;

    console.log('Начальный массив: ' + arr1);

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] < 0 && negative === 0) {
            arr2 = arr1.splice(i + 1, arr1.length);
            negative = 1;
        }
    }

    for (let i = 0; i < arr2.length; i++) {
        summ += Math.abs(arr2[i]);
    }

    console.log('Массив после: ' + arr2);
    console.log('Сумма: ' + summ);
});
