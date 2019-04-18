// window.addEventListener('load', () => {
//     // let sum = (array) => {
//     //     let sumOfElements = array.reduce((sum, elem) => {
//     //         return sum + elem;
//     //     }, 0);
//     //
//     //     return sumOfElements;
//     // };
//     //
//     // let range = (startValue, endValue, step) => {
//     //     step = step || 1;
//     //     let array = [];
//     //
//     //     if (startValue < endValue) {
//     //         for (let i = startValue; i <= endValue; i = i + step) {
//     //             array.push(i);
//     //         }
//     //     } else {
//     //         for (let i = startValue; i >= endValue; i = i + step) {
//     //             array.push(i);
//     //         }
//     //     }
//     //
//     //     console.log(array);
//     //     return array;
//     // };
//     //
//     // console.log(range(1, 10));
//     // console.log(sum(range(1, 10, 3)));
//     // console.log(sum(range(10, 1, -2)));
//
//     let arrayToList = (arr) => {
//         let list = {};
//
//         for (let i = arr.length - 1; i >= 0; i--) {
//             list = {value: arr[i], rest: list};
//         }
//
//         return list;
//     };
//
//     let arrayToListReduce = (arr) => {
//         let list = {};
//
//         arr.reduceRight((current, elem) => {
//             list = {value: elem, rest: list};
//         }, 0);
//
//         return list;
//     };
//
//     let listToArray = (list) => {
//         let arr = [];
//
//         while(list) {
//             arr.push(list.value);
//             list = list.rest;
//         }
//
//         return arr;
//     };
//
//     let prepend = (elem, list) => {
//         return list = {value: elem, rest: list};
//     };
//
//     let nth = (list, num) => {
//         let counter = 0;
//         let element;
//
//         while (list) {
//             if (num === counter) {
//                 element = list.value;
//             }
//             counter++;
//             list = list.rest;
//         }
//
//         return element;
//     };
//
//     console.log(arrayToListReduce([1, 2, 3]));
//     console.log(arrayToList([1, 2, 3]));
//     console.log(listToArray(arrayToList([10, 20, 30])));
//     console.log(prepend(10, prepend(20, null)));
//     console.log(nth(arrayToList([10, 20, 30]), 1));
// });
//
