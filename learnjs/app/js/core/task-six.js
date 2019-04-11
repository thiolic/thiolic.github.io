window.addEventListener('load', () => {
    // let sum = (array) => {
    //     let sumOfElements = array.reduce((sum, elem) => {
    //         return sum + elem;
    //     }, 0);
    //
    //     return sumOfElements;
    // };
    //
    // let range = (startValue, endValue, step) => {
    //     step = step || 1;
    //     let array = [];
    //
    //     if (startValue < endValue) {
    //         for (let i = startValue; i <= endValue; i = i + step) {
    //             array.push(i);
    //         }
    //     } else {
    //         for (let i = startValue; i >= endValue; i = i + step) {
    //             array.push(i);
    //         }
    //     }
    //
    //     console.log(array);
    //     return array;
    // };
    //
    // console.log(range(1, 10));
    // console.log(sum(range(1, 10, 3)));
    // console.log(sum(range(10, 1, -2)));

    let arrayToList = (arr) => {
        let list = {};

        for (let i = arr.length - 1; i >= 0; i--) {
            list = {value: arr[i], rest: list};
        }

        return list;
    };

    console.log(arrayToList([1, 2, 3]));
});
