// You are given an array of  integers, , and a positive integer, . Find and print the number of  pairs where  and  +  is divisible by .

// For example,  and . Our three pairs meeting the criteria are  and .

// Function Description

// Complete the divisibleSumPairs function in the editor below. It should return the integer count of pairs meeting the criteria.

// divisibleSumPairs has the following parameter(s):

// n: the integer length of array
// ar: an array of integers
// k: the integer to divide the pair sum by
// Input Format

// The first line contains  space-separated integers,  and .
// The second line contains  space-separated integers describing the values of .

// Constraints

// Output Format

// Print the number of  pairs where  and  +  is evenly divisible by .

// Sample Input

// 6 3
// 1 3 2 6 1 2
// Sample Output

//  5
// Explanation

// Here are the  valid pairs when :

function divisibleSumPairs(n, k, ar) {
  // Helper function that checks first element in array against all other elements to find divisible sum pairs. I.e.: check if array[0] + array[1] is divisible by k, then array[0] + array[2], etc.
  const findPairsFromFirstElement = inputArray =>
    inputArray.reduce((acc, val, index, sourceArray) => {
      // If the current index plus one is an invalid index, return early
      if (index + 1 >= sourceArray.length) {
        return acc;
      }

      // Otherwise, check for divisibility and accumulate accordingly
      return (sourceArray[0] + sourceArray[index + 1]) % k ? acc : acc + 1;
    }, 0);

  // Recursive function
  const getAllPairs = (inputArray, pairsCount) => {
    // Update pairs count
    pairsCount += findPairsFromFirstElement(inputArray);

    // Now, remove the first element from the inputArray and pass the inputArray through again
    if (inputArray.length > 1) {
      inputArray.shift();
      return getAllPairs(inputArray, pairsCount);
    }

    // If the array is one element long, we've reached the end.
    return pairsCount;
  };

  // Call recursive function with intial pairsCount of 0
  return getAllPairs(ar, 0);
}
