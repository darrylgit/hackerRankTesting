// Given an array of integers, find and print the maximum number of integers you can select from the array such that the absolute difference between any two of the chosen integers is less than or equal to . For example, if your array is , you can create two subarrays meeting the criterion:  and . The maximum length subarray has  elements.

// Function Description

// Complete the pickingNumbers function in the editor below. It should return an integer that represents the length of the longest array that can be created.

// pickingNumbers has the following parameter(s):

// a: an array of integers
// Input Format

// The first line contains a single integer , the size of the array .
// The second line contains  space-separated integers .

// Constraints

// The answer will be .
// Output Format

// A single integer denoting the maximum number of integers you can choose from the array such that the absolute difference between any two of the chosen integers is .

// Sample Input 0

// 6
// 4 6 5 3 3 1
// Sample Output 0

// 3
// Explanation 0

// We choose the following multiset of integers from the array: . Each pair in the multiset has an absolute difference  (i.e.,  and ), so we print the number of chosen integers, , as our answer.

// Sample Input 1

// 6
// 1 2 2 3 1 2
// Sample Output 1

// 5
// Explanation 1

// We choose the following multiset of integers from the array: . Each pair in the multiset has an absolute difference  (i.e., , , and ), so we print the number of chosen integers, , as our answer.

function pickingNumbers(a) {
  let objectOfArrays = a
    .sort((currentVal, nextVal) => currentVal - nextVal)
    .reduce((acc, val) => {
      // Does an array exist at the key equivalent to this value? If so, push to that array:
      if (acc[val]) {
        acc[val] = [...acc[val], val];
      }

      // If this value does not have a key in the accumulator, make one:
      if (!acc[val]) {
        acc[val] = [val];
      }

      // Does a key of value minus 1 exist in the accumulator? If so, push to that array:
      if (acc[val - 1]) {
        acc[val - 1] = [...acc[val - 1], val];
      }

      return acc;
    }, {});

  // Find the longest array in objectOfArrays
  let longestArrayLength = 0;

  for (const array in objectOfArrays) {
    if (objectOfArrays[array].length > longestArrayLength) {
      longestArrayLength = objectOfArrays[array].length;
    }
  }

  return longestArrayLength;
}
