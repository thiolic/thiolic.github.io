window.addEventListener('load', () => {
    let sequence = (start = 0, step = 1) => {
        start -= step;
        return () => start += step;
    };

    let generator = sequence(10, 3);

    console.log(generator());
    console.log(generator());
    console.log(generator());

    let take = (fn, count) => {
        let array = [];

        while(count) {
            array.push(fn());
            count--;
        }

        return array;
    };

    let gen2 = sequence(0, 2);

    console.log(take(gen2, 5));
});
