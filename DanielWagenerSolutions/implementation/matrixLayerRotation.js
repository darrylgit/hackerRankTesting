function matrixRotation(matrix, r) {
  const matrixWidth = matrix[0].length;
  const matrixHeight = matrix.length;

  const oneRotation = matrix => {
    // STEP 1: Create an array called outerLayer that contains all the values of the outer layer, in order, starting at the top left corner and going clockwise.

    // Step 1a: Spread the entire top row of the matrix into outerLayer.
    let outerLayer = [...matrix[0]];

    // Step 1b: Now we work down the right column of the matrix. Excluding the first value (which was already in the top row) and the last value (which we'll get to in the next step), push these values into outerLayer.
    for (let i = 1; i < matrixHeight - 1; i++) {
      outerLayer.push(matrix[i][matrixWidth - 1]);
    }

    // Step 1c: Spread the entire bottom row in reverse order into outerLayer.
    outerLayer = [...outerLayer, ...matrix[matrixHeight - 1].reverse()];

    // Step 1d: Now we work UP the left column of the matrix, excluding the first and last values (like we did in 1b).
    for (let i = matrixHeight - 2; i > 0; i--) {
      outerLayer.push(matrix[i][0]);
    }

    // STEP 2: Time to reorder! Shift the first element off of outerLayer and push it to the end.
    outerLayer.push(outerLayer.shift());

    // STEP 3: Now we'll user Array.splice() to strip elements off the beginning of outerLayer (changing the original outerLayer array) and assign them to locations in the matrix in the same order we created outerLayer. Since we've changed the order of outerLayer, this will simulate a rotation.

    // Step 3a: Replace the top row of the matrix
    matrix[0] = outerLayer.splice(0, matrixWidth);

    // Step 3b: Replace the right column of the matrix
    for (let i = 1; i < matrixHeight - 1; i++) {
      matrix[i][matrixWidth - 1] = outerLayer.splice(0, 1)[0];
    }

    // Step 3c: Replace the bottom row of the matrix
    matrix[matrixHeight - 1] = outerLayer.splice(0, matrixWidth).reverse();

    // Step 3d: Replace the left column of the matrix
    for (let i = matrixHeight - 2; i > 0; i--) {
      matrix[i][0] = outerLayer.splice(0, 1)[0];
    }

    // STEP 4: Create an innerLayer array in the same fashion we created outLayer

    // Step 4a: Spread the top row into innerLayer
    let innerLayer = [...matrix[1].slice(1, matrixWidth - 1)];

    // Step 4b: Work down the right column of the inner layer. There might not even be a right column, but that's okay.
    for (let i = 2; i < matrixHeight - 2; i++) {
      innerLayer.push(matrix[i][matrixWidth - 2]);
    }

    // Step 4c: Spread the bottom row in reverse into innerLayer
    innerLayer = [
      ...innerLayer,
      ...matrix[matrixHeight - 2].slice(1, matrixWidth - 1).reverse()
    ];

    // Step 4d: Work UP the left column.
    for (let i = matrixHeight - 3; i > 1; i--) {
      innerLayer.push(matrix[i][1]);
    }

    // STEP 5: Reorder innerLayer, just like we did with outerLayer in Step 2
    innerLayer.push(innerLayer.shift());

    // STEP 6: Pretty much Step 3 but for the inner layer this time, I can't be bothered to write it out.

    // Step 6a: Replace the top row of the inner layer
    matrix[1] = [
      matrix[1][0],
      ...innerLayer.splice(0, matrixWidth - 2),
      matrix[1][matrixWidth - 1]
    ];

    // Step 6b: Replace the right column of the inner layer
    for (let i = 2; i < matrixHeight - 2; i++) {
      matrix[i][matrixWidth - 2] = innerLayer.splice(0, 1)[0];
    }

    // Step 6c: Replace the bottom row of the inner layer
    matrix[matrixHeight - 2] = [
      matrix[matrixHeight - 2][0],
      ...innerLayer.splice(0, matrixWidth - 2).reverse(),
      matrix[matrixHeight - 2][matrixWidth - 1]
    ];

    // Step 6d: Replace the left column of the inner layer
    for (let i = matrixHeight - 3; i > 1; i--) {
      matrix[i][1] = innerLayer.splice(0, 1)[0];
    }

    return matrix;
  };

  r = r % (matrixHeight * 2 + matrixWidth * 2 - 4);
  while (r) {
    matrix = oneRotation(matrix);
    r--;
  }

  matrix.forEach(row => {
    console.log(row.join(" "));
  });
}

const sampleMatrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16]
];

const sampleMatrix2 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
  [17, 18, 19, 20]
];

matrixRotation(sampleMatrix, 2);
