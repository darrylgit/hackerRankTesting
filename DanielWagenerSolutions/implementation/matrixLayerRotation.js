// You are given a 2D matrix of dimension  and a positive integer . You have to rotate the matrix  times and print the resultant matrix. Rotation should be in anti-clockwise direction.

// Rotation of a  matrix is represented by the following figure. Note that in one rotation, you have to shift elements by one step only.

// matrix-rotation

// It is guaranteed that the minimum of m and n will be even.

// As an example rotate the Start matrix by 2:

// Start         First           Second
//  1 2 3 4        2  3  4  5      3  4  5  6
// 12 1 2 5  ->   1  2  3  6 ->   2  3  4  7
// 11 4 3 6      12  1  4  7       1  2  1  8
// 10 9 8 7      11 10  9  8     12 11 10  9
// Function Description

// Complete the matrixRotation function in the editor below. It should print the resultant 2D integer array and return nothing.

// matrixRotation has the following parameter(s):

// matrix: a 2D array of integers
// r: an integer that represents the rotation factor
// Input Format

// The first line contains three space separated integers, , , and , the number of rows and columns in , and the required rotation.
// The next  lines contain  space-separated integers representing the elements of a row of .

// Constraints

// Output Format

// Print each row of the rotated matrix as space-separated integers on separate lines.

// Sample Input

// Sample Input #01

// 4 4 2
// 1 2 3 4
// 5 6 7 8
// 9 10 11 12
// 13 14 15 16
// Sample Output #01

// 3 4 8 12
// 2 11 10 16
// 1 7 6 15
// 5 9 13 14
// Explanation #01

// The matrix is rotated through two rotations.

//  1  2  3  4      2  3  4  8      3  4  8 12
//  5  6  7  8      1  7 11 12      2 11 10 16
//  9 10 11 12  ->  5  6 10 16  ->  1  7  6 15
// 13 14 15 16      9 13 14 15      5  9 13 14
// Sample Input #02

// 5 4 7
// 1 2 3 4
// 7 8 9 10
// 13 14 15 16
// 19 20 21 22
// 25 26 27 28
// Sample Output #02

// 28 27 26 25
// 22 9 15 19
// 16 8 21 13
// 10 14 20 7
// 4 3 2 1
// Explanation 02

// The various states through 7 rotations:

// 1  2  3  4      2  3  4 10    3  4 10 16    4 10 16 22
// 7  8  9 10      1  9 15 16    2 15 21 22    3 21 20 28
// 13 14 15 16 ->  7  8 21 22 -> 1  9 20 28 -> 2 15 14 27 ->
// 19 20 21 22    13 14 20 28    7  8 14 27    1  9  8 26
// 25 26 27 28    19 25 26 27    13 19 25 26   7 13 19 25

// 10 16 22 28    16 22 28 27    22 28 27 26    28 27 26 25
//  4 20 14 27    10 14  8 26    16  8  9 25    22  9 15 19
//  3 21  8 26 ->  4 20  9 25 -> 10 14 15 19 -> 16  8 21 13
//  2 15  9 25     3 21 15 19     4 20 21 13    10 14 20  7
//  1  7 13 19     2  1  7 13     3  2  1  7     4  3  2  1
// Sample Input #03

// 2 2 3
// 1 1
// 1 1
// Sample Output #03

// 1 1
// 1 1
// Explanation #03

// All of the elements are the same, so any rotation will repeat the same matrix.

function matrixRotation(matrix, r) {
  const matrixWidth = matrix[0].length;
  const matrixHeight = matrix.length;

  const calculateRotationsToPerform = layerNumber => {
    // If a layer completes a full revolution after twelve single-step rotations, then rotating it 13 times gives us the same result as rotating it once.
    const layerHeight = matrixHeight - layerNumber * 2;
    const layerWidth = matrixWidth - layerNumber * 2;
    const rotationsInOneRevolution = layerHeight * 2 + layerWidth * 2 - 4;
    return r % rotationsInOneRevolution;
  };

  const createLayerValuesArray = (
    matrix,
    layerNumber,
    layerBottomRow,
    layerRightColumn
  ) => {
    //Objective: Create an array called layerVals that contains all the values of the current layer, in order, starting at the top left corner and going clockwise.

    const layerTopRow = layerNumber;
    const layerLeftColumn = layerNumber;

    // Step 1: Spread the entire top row of the layer into layerValuesArray.
    let layerValuesArray = [
      ...matrix[layerTopRow].slice(layerLeftColumn, layerRightColumn + 1)
    ];

    // Step 2: Now we work down the right column of the layer. Excluding the first value (which was in the top row) and the last value (which we'll get to in the next step), push this column's values into layerValuesArray.
    for (let i = layerTopRow + 1; i < layerBottomRow; i++) {
      layerValuesArray.push(matrix[i][layerRightColumn]);
    }

    // Step 3: Spread the layer's entire bottom row, in reverse order, into layerValuesArray.
    layerValuesArray = [
      ...layerValuesArray,
      ...matrix[layerBottomRow]
        .slice(layerLeftColumn, layerRightColumn + 1)
        .reverse()
    ];

    // Step 4: Now we work UP the left column of the layer, excluding its first and last values.
    for (let i = layerBottomRow - 1; i > layerTopRow; i--) {
      layerValuesArray.push(matrix[i][layerLeftColumn]);
    }

    return layerValuesArray;
  };

  const modifyLayerInMatrix = (
    matrix,
    layerNumber,
    layerBottomRow,
    layerRightColumn,
    layerVals
  ) => {
    // Objective: Use Array.splice() to strip elements off the beginning of layerVals (changing the original array) and assign them to their new positions in the matrix. This process will follow the same order as createLayerValuesArray

    const layerTopRow = layerNumber;
    const layerLeftColumn = layerNumber;

    // Step 1: Spread the layer's new top row into the corresponding row of the matrix
    matrix[layerTopRow] = [
      ...matrix[layerTopRow].slice(0, layerLeftColumn),
      ...layerVals.splice(0, matrixWidth - layerNumber * 2),
      ...matrix[layerTopRow].slice(layerRightColumn + 1)
    ];

    // Step 2: Replace the right column of the layer
    for (let i = layerTopRow + 1; i < layerBottomRow; i++) {
      matrix[i][layerRightColumn] = layerVals.splice(0, 1)[0];
    }

    // Step 3: Spread the layer's new bottom row into the corresponding row of the matrix
    matrix[layerBottomRow] = [
      ...matrix[layerBottomRow].slice(0, layerLeftColumn),
      ...layerVals.splice(0, matrixWidth - layerNumber * 2).reverse(),
      ...matrix[layerBottomRow].slice(layerRightColumn + 1)
    ];

    // Step 4: Replace the left column of the layer
    for (let i = layerBottomRow - 1; i > layerTopRow; i--) {
      matrix[i][layerLeftColumn] = layerVals.splice(0, 1)[0];
    }

    return matrix;
  };

  const rotateOneLayer = (matrix, layerNumber) => {
    // Return early if there are no rotations to perform on this layer
    let rotationsToPerform = calculateRotationsToPerform(layerNumber);

    if (!rotationsToPerform) {
      return matrix;
    }

    // Set a couple of base constants
    const layerBottomRow = matrixHeight - layerNumber - 1;
    const layerRightColumn = matrixWidth - layerNumber - 1;

    let layerVals = createLayerValuesArray(
      matrix,
      layerNumber,
      layerBottomRow,
      layerRightColumn
    );

    // Time to reorder! Shifting the first element off of layerValues and pushing it to the end simulates one rotation. For multiple rotations, we repeat the process.
    while (rotationsToPerform) {
      layerVals.push(layerVals.shift());
      rotationsToPerform--;
    }

    return modifyLayerInMatrix(
      matrix,
      layerNumber,
      layerBottomRow,
      layerRightColumn,
      layerVals
    );
  };

  // Call rotateOneLayer for each layer in the matrix
  const matrixLayers = Math.min(matrixWidth, matrixHeight) / 2;
  let currentLayer = 0;

  while (currentLayer < matrixLayers) {
    matrix = rotateOneLayer(matrix, currentLayer);
    currentLayer++;
  }

  // Console log the rotated matrix
  matrix.forEach(row => {
    console.log(row.join(" "));
  });
}
