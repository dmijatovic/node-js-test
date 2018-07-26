const { getRandomWordSync, getRandomWord } = require('word-maker');

const { tasks } = require('./tasks');

console.log('It works!');

// YOUR CODE HERE

/**
 * Print numbers from 1 to 100 to the console, but for each number 
 * also print a random word using the function `getRandomWordSync`
 * 
 * @param cnt: number of random words to generate, default 100
 */

tasks.no1();


/**
 * Modify your code to be a "Fizz Buzz" program. That is, print the 
 * numbers as in the previous step, but for multiples of three, 
 * print "Fizz" (instead of the random word), for multiples of five, 
 * print "Buzz" and for numbers which are both multiples of three 
 * and five, print "FizzBuzz"
 * 
 * @param cnt: number of random words to generate, default 100
*/

tasks.no2(); 

/**
 * Create a version of steps *1* and *2* using the **asynchronous** 
 * function, `getRandomWord`. This function returns a Promise, which 
 * resolves to a random word string. The numbers may or may not be 
 * in numerical order.
 * 
 * @param cnt: number of random words to generate, default 100
 */

tasks.no3();


/**
 * Add error handling to both the synchronous and asynchronous solutions 
 * (calling `getRandomWord({ withErrors: true })` will intermitently throw 
 * an error instead of return a random word). When an error is caught, 
 * the programm should print "Doh!" instead of the random word, "Fizz", 
 * "Buzz" or "FizzBuzz"
 *  
 * @param cnt: number of random words to generate, default 100 
 */
 
tasks.no4sync();

tasks.no4async();

/**
 * For **Node.JS developers**: Instead of printing the console. Write the 
 * information to a file in the root of this project. 
 * 
 * @param cnt: number of random words to generate, default 100
 */

tasks.no5node();

 
 /**
  * For **Frontend** 
  * developers, send your result to an HTTP endpoint (since there is no 
  * running endpoint, this part of your solution does not need to actually run)
  * 
  * note: it posts to echo api point of postman (https://postman-echo.com/post)
  * @param cnt: number of random words to generate, default 100
  */

tasks.no5api();
