// You will be given two arrays of integers and asked to determine all integers that satisfy the following two conditions:

// The elements of the first array are all factors of the integer being considered
// The integer being considered is a factor of all elements of the second array
// These numbers are referred to as being between the two arrays. You must determine how many such numbers exist.

// For example, given the arrays  and , there are two numbers between them:  and . , ,  and  for the first value. Similarly, ,  and , .

// Function Description

// Complete the getTotalX function in the editor below. It should return the number of integers that are betwen the sets.

// getTotalX has the following parameter(s):

// a: an array of integers
// b: an array of integers
// Input Format

// The first line contains two space-separated integers,  and , the number of elements in array  and the number of elements in array .
// The second line contains  distinct space-separated integers describing  where .
// The third line contains  distinct space-separated integers describing  where .

// Constraints

// Output Format

// Print the number of integers that are considered to be between  and .

// Sample Input

// 2 3
// 2 4
// 16 32 96
// Sample Output

// 3
// Explanation

// 2 and 4 divide evenly into 4, 8, 12 and 16.
// 4, 8 and 16 divide evenly into 16, 32, 96.

// 4, 8 and 16 are the only three numbers for which each element of a is a factor and each is a factor of all elements of b.

function getTotalX(a, b) {
  // Integers that meet the conditions of the prompt will never be lower than the highest value in 'a', and never higher than the lowest value of 'b'

  // Get highest value in 'a' and lowest value in 'b'
  const lowerBound = Math.max(...a);
  const upperBound = Math.min(...b);

  // Create array of testable integers
  let integersToTest = [];

  for (let i = lowerBound; i <= upperBound; i++) {
    integersToTest.push(i);
  }

  // Because of my love affair with reduce():
  return integersToTest.reduce((acc, integer) => {
    let meetsConditions = true;

    // Stage 1: Are the values in 'a' factors of this integer?
    a.forEach(valueInA => {
      if (integer % valueInA) {
        meetsConditions = false;
      }
    });

    // Stage 2: Is this integer a factor of all the values in 'b'?
    b.forEach(valueInB => {
      if (valueInB % integer) {
        meetsConditions = false;
      }
    });

    // If nothing flagged meetsConditions as false, add 1 to the accumulator
    return meetsConditions ? acc + 1 : acc;
  }, 0);
}
