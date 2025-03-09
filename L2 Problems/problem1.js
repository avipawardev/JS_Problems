let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

let n = matrix.length;
for (let i = n-1; i >= 0; i--) {
  console.log(matrix[i][0]); 
  }
for (let i = 1; i < n; i++) {
  console.log(matrix[0][i]);
}
for (let i = n - 2; i > 0; i--) {
  console.log(matrix[i][n-1]); 
  }
for (let i = n - 1; i > 0; i--){
console.log(matrix[n-1][i]);

}