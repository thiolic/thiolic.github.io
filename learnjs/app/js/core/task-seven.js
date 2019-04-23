window.addEventListener('load', () => {
    // let sequence = (start = 0, step = 1) => {
    //     start -= step;
    //     return () => start += step;
    // };
    //
    // let generator = sequence(10, 3);
    //
    // console.log(generator());
    // console.log(generator());
    // console.log(generator());
    //
    // let take = (fn, count) => {
    //     let array = [];
    //
    //     while(count) {
    //         array.push(fn());
    //         count--;
    //     }
    //
    //     return array;
    // };
    //
    // let gen2 = sequence(0, 2);
    //
    // console.log(take(gen2, 5));

    let f = (...args) => args.length ? 1 : 0;

    console.log(f(undefined));
    console.log(f());


    // let sum = (...args) => args.reduce((prev, current) => prev + current, 0);
    //
    // console.log(sum());
    // console.log(sum(1));
    // console.log(sum(1, 2));
    // console.log(sum(1, 2, 3));
    // console.log(sum(1, 2, 3, 4));

    // let myConcat = (...args) => {
    //     let array = [];
    //
    //     for (let i = 0; i <= args.length; i++) {
    //         if (i > 0) {
    //             array.push(args[i]);
    //         }
    //     }
    //
    //     return array.join(args[0]);
    // };

    // console.log(myConcat(', ', 'red', 'orange', 'blue'));
    // console.log(myConcat('; ', 'red', 'orange', 'blue'));
    // console.log(myConcat('. ', 'red', 'orange', 'blue'));
});
