let arr = [
    [1, 2],
    [3, 4],
    [5, 6]
];

for (let i = 0; i < arr.length; i++) {
    let bag = '';
    for (let j = 0; j < arr[i].length; j++) {
        bag += arr[i][j] + ' ';
    }
    console.log(bag);
}
