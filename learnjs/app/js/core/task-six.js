window.addEventListener('load', () => {
    let sum = (array) => {
        let sumOfElements = 0;
        array.forEach((elem) => {
            sumOfElements += elem;
        });

        return sumOfElements;
    };

    let range = (startValue, endValue, step) => {
        let array = [];

        for (let i = startValue; i <= endValue; i = i +1) {
            array.push(i);
        }

        return array;
    };

    console.log(range(1, 10));
    console.log(sum(range(1, 10)));
});
