function matrixRotation(matrix, r) {
  const matrixWidth = matrix[0].length;
  const matrixHeight = matrix.length;

  const rotateOneLayer = (matrix, layerNumber) => {
    // Set some base constants. The first two are technically the same value, but I gave them different names for legibility later.
    const layerTopRow = layerNumber;
    const layerLeftColumn = layerNumber;
    const layerBottomRow = matrixHeight - layerNumber - 1;
    const layerRightColumn = matrixWidth - layerNumber - 1;

    // STEP 1: Create an array called layerVals that contains all the values of the current layer, in order, starting at the top left corner and going clockwise.

    // Step 1a: Spread the entire top row of the layer into layerVals.
    let layerVals = [
      ...matrix[layerTopRow].slice(layerLeftColumn, layerRightColumn + 1)
    ];

    // Step 1b: Now we work down the right column of the matrix. Excluding the first value (which was already in the top row) and the last value (which we'll get to in the next step), push this column's values into layerValues.
    for (let i = layerTopRow + 1; i < layerBottomRow; i++) {
      layerVals.push(matrix[i][layerRightColumn]);
    }

    // Step 1c: Spread the layer's entire bottom row, in reverse order, into layerVals.
    layerVals = [
      ...layerVals,
      ...matrix[layerBottomRow]
        .slice(layerLeftColumn, layerRightColumn + 1)
        .reverse()
    ];

    // Step 1d: Now we work UP the left column of the layer, excluding its first and last values (like we did in 1b).
    for (let i = layerBottomRow - 1; i > layerTopRow; i--) {
      layerVals.push(matrix[i][layerLeftColumn]);
    }

    // STEP 2: Time to reorder! Shifting the first element off of layerValues and pushing it to the end simulates one rotation. For multiple rotations, we repeat the process.

    // If a layer completes a full revolution after twelve single-step rotations, then rotating it 13 times gives us the same result as rotating it once. We'll use a modulo to optimize:
    let rotationsToPerform = r % layerVals.length;

    // Simulate rotations:
    while (rotationsToPerform) {
      layerVals.push(layerVals.shift());
      rotationsToPerform--;
    }

    // STEP 3: Now we'll user Array.splice() to strip elements off the beginning of layerVals (changing the original array) and assign them to their new positions in the matrix. This process will follow the same order as Step 1.

    // Step 3a: Spread the layer's new top row into the corresponding row of the matrix
    matrix[layerTopRow] = [
      ...matrix[layerTopRow].slice(0, layerLeftColumn),
      ...layerVals.splice(0, matrixWidth - layerNumber * 2),
      ...matrix[layerTopRow].slice(layerRightColumn + 1)
    ];

    // Step 3b: Replace the right column of the layer
    for (let i = layerTopRow + 1; i < layerBottomRow; i++) {
      matrix[i][layerRightColumn] = layerVals.splice(0, 1)[0];
    }

    // Step 3c: Spread the layer's new bottom row into the corresponding row of the matrix
    matrix[layerBottomRow] = [
      ...matrix[layerBottomRow].slice(0, layerLeftColumn),
      ...layerVals.splice(0, matrixWidth - layerNumber * 2).reverse(),
      ...matrix[layerBottomRow].slice(layerRightColumn + 1)
    ];

    // Step 3d: Replace the left column of the layer
    for (let i = layerBottomRow - 1; i > layerTopRow; i--) {
      matrix[i][layerLeftColumn] = layerVals.splice(0, 1)[0];
    }

    return matrix;
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

matrixRotation(sampleMatrix2, 20);
