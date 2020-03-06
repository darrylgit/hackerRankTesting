// We define a magic square to be an  matrix of distinct positive integers from  to  where the sum of any row, column, or diagonal of length  is always equal to the same number: the magic constant.

// You will be given a  matrix  of integers in the inclusive range . We can convert any digit  to any other digit  in the range  at cost of . Given , convert it into a magic square at minimal cost. Print this cost on a new line.

// Note: The resulting magic square must contain distinct integers in the inclusive range .

// For example, we start with the following matrix :

// 5 3 4
// 1 5 8
// 6 4 2
// We can convert it to the following magic square:

// 8 3 4
// 1 5 9
// 6 7 2
// This took three replacements at a cost of .

// Function Description

// Complete the formingMagicSquare function in the editor below. It should return an integer that represents the minimal total cost of converting the input square to a magic square.

// formingMagicSquare has the following parameter(s):

// s: a  array of integers
// Input Format

// Each of the lines contains three space-separated integers of row .

// Constraints

// Output Format

// Print an integer denoting the minimum cost of turning matrix  into a magic square.

// Sample Input 0

// 4 9 2
// 3 5 7
// 8 1 5
// Sample Output 0

// 1
// Explanation 0

// If we change the bottom right value, , from  to  at a cost of ,  becomes a magic square at the minimum possible cost.

// Sample Input 1

// 4 8 2
// 4 5 7
// 6 1 6
// Sample Output 1

// 4
// Explanation 1

// Using 0-based indexing, if we make

// -> at a cost of
// -> at a cost of
// -> at a cost of ,
// then the total cost will be .

function formingMagicSquare(s) {
  // A normal 3x3 magic square has only two possible sequences for its perimeter: the magicSequence defined below and its reverse. As such, the magic square has only 8 possible perimeters. Why not 16 possible perimeters? Because, the magic square will never work with an odd number in a corner. The corners always have to be 8, 4, 2, and 6 (or the reverse of that), in that sequence but starting from any of those four numbers.
  const magicSequence = [8, 3, 4, 9, 2, 7, 6, 1];
  const magicSequenceReverse = [...magicSequence].reverse();
  // Since the first value of this array represents a corner value, we have to shift the 1:
  magicSequenceReverse.push(magicSequenceReverse.shift());

  // With that set up, we can generate all eight magic perimeters.
  let magicPerimeters = [];
  for (let i = 0; i <= 8; i++) {
    // Only push on even iterations. This gives us the effect of rearranging each array twice before each push.
    if (!(i % 2)) {
      magicPerimeters.push([...magicSequence], [...magicSequenceReverse]);
    }

    magicSequence.push(magicSequence.shift());
    magicSequenceReverse.push(magicSequenceReverse.shift());
  }

  // Get the input square's current perimeter:
  let squarePerimeter = [...s[0], s[1][2], ...s[2].reverse(), s[1][0]];

  // Now, find the costs of changing our perimeter into each of the eight magic perimeters. Get the cheapest one, and then add that to the cost of changing the middle sqaure to 5 (the middle square in a normal 3x3 magic square is always 5)
  return (
    Math.min(
      ...magicPerimeters.map(magicPerimeter =>
        magicPerimeter.reduce(
          (acc, val, index) => acc + Math.abs(val - squarePerimeter[index]),
          0
        )
      )
    ) + Math.abs(5 - s[1][1])
  );
}
