
const { getRandomWordSync, getRandomWord } = require('word-maker');
const fs = require("fs");
const axios = require('axios');
exports.tasks = {
  /**
   * Print numbers from 1 to 100 to the console, but for each number 
   * also print a random word using the function `getRandomWordSync`
   */
  no1:(cnt=100)=>{
    let words = generateSync({
      cnt,
      withErrors: false 
    });
    words.map((word, index)=>{
      let pos = index + 1;
      //print index and word
      console.log(`${pos}: ${word}`);
    });
  },

  /**
   * Modify your code to be a "Fizz Buzz" program. That is, print the 
   * numbers as in the previous step,  for multiples of three, 
   * print "Fizz" (instead of the random word), for multiples of five, 
   * print "Buzz" and for numbers which are both multiples of three and five, 
   * print "FizzBuzz"
   */
  no2:(cnt=100)=>{
    //generate random words
    let words = generateSync({
      cnt,
      withErrors: false 
    });
    let items = addFizzBuzz(words);
    //console log words
    wordsToConsole(items);
  },

  /**
   * Create a version of steps *1* and *2* using the **asynchronous** function, 
   * `getRandomWord`. This function returns a Promise, which resolves to a 
   * random word string. The numbers may or may not be in numerical order.
   */
  no3:(cnt=100)=>{
    //generate random words using 
    //async function getRandomWord
    generateAsync({
      cnt,
      withErrors: false 
    }).then((words)=>{
      //add fizz-buzz
      let items = addFizzBuzz(words,['Doh!'])
      //console log words
      wordsToConsole(items); ;
    }).catch(e => console.error(e));
  },

  /**
   * Add error handling to both the synchronous and asynchronous solutions 
   * (calling `getRandomWord({ withErrors: true })` will intermitently throw 
   * an error instead of return a random word). When an error is caught, 
   * the programm should print "Doh!" instead of the random word, "Fizz", 
   * "Buzz" or "FizzBuzz"
   */
  no4sync:(cnt=100)=>{
    //generate data
    let words = generateSync({
      cnt,
      withErrors: true
    });
    let items = addFizzBuzz(words,['Doh!'])
    //console log words
    wordsToConsole(items);
  },

  no4async:(cnt=100)=>{
    //generate data
    generateAsync({
      cnt,
      withErrors: true
    }).then((words)=>{
      let items = addFizzBuzz(words,['Doh!'])
      //console log words
      wordsToConsole(items);
    }, e => console.error(e));
  },

  /**
   * Instead of printing the console. Write the 
   * information to a file in the root of this project.
   */
  no5node:(cnt=100)=>{
    try{
      let fileName='wordsAreHere.txt',
        words = generateSync({
          cnt,
          withErrors: true
        }), 
        stream = fs.createWriteStream(fileName);
      
      //console.log("data...", words);
      //write words to text file
      stream.once('open',(nfo)=>{
        words.map((line)=>{
          stream.write(line.toString() + '\n');
        });
        stream.end();
        console.log("words saved to...", fileName);
      });
    }catch(e){
      console.error("no5node...error..", e);  
    } 
  },
  /**
   * For **Frontend** 
   * developers, send your result to an HTTP endpoint (since there is no 
   * running endpoint, this part of your solution does not need to actually run)
   * 
   * Post words to api point
   * https://postman-echo.com/post
   */
  no5api:(cnt=100)=>{
    const url= "https://postman-echo.com/post";
    generateAsync({
      cnt,
      withErrors: true
    }).then((words)=>{
      return axios.post(url,words);
    }).then((resp)=>{
      console.log("no5api...posted...", resp.data.data);
    }).catch((e)=>{
      console.error(`post to ${url}...failed...${e}`);
    });
  }
};

/**
 * Generate random word using promise based function
 * @param cnt: number, amount of random words to generate
 * @param withErrors: boolean, trow random error
 */
function generateSync({cnt=100, withErrors=false}){
  let data=[]
  for (let i=1; i<=cnt; i++){
    //get random word
    let word;
    try{
      word = getRandomWordSync({withErrors});
    }catch(e){
      //console.error()
      word="Doh!";
    }
    //print i and word
    data.push(word);
    //console.log(i, word);
  }
  //return collection
  return data;
}
/**
 * Generate random word using promise based function.
 * Note! Function will execute all promises
 * @param cnt: number, amount of random words to generate
 * @param withErrors: boolean, trow random error
 */
function generateAsync({cnt=100, withErrors=false}){
  return new Promise((resolve,reject)=>{
  try{
    let words=[];
    //excute async func {cnt} of times
    for (let i=1; i<=cnt; i++){
      getRandomWord({
        withErrors
      })
      .then( word => {
        //add word to collection
        words.push(word);
        //check for last resolved
        resolveAll();
      })
      .catch( e => {
        //if error - continue and push Doh!
        words.push("Doh!");
        //check last resolved
        resolveAll();
      });
    }
    //check if all promises are resolved
    function resolveAll(){
      if (words.length===cnt){
        //console.log("generateAsync...", words.length, "...", cnt);
        resolve(words);
      }
    }
  }catch(e){
    //reject with error
    reject(e);
  }});
}

/**
 * for multiples of three, print "Fizz" (instead of the random word), 
 * for multiples of five, print "Buzz" 
 * for numbers which are both multiples of three 
 * and five, print "FizzBuzz"
 * @param words: Array of words 
 * @param exclude: Array of words to be excluded  
 */
function addFizzBuzz (words=[],exclude=[]){
  let data = words.map((item, index)=>{
    let pos = index + 1;
    switch(true){
      //if in the list of exclude items
      case exclude.indexOf(item)!==-1:
        return [pos,item];
      //on each 15th item
      case (pos % 15 === 0):
        return [pos,'FizzBuzz'];
        //break;
      //on each 5th item
      case (pos % 5 === 0):
        return [pos,'Buzz'];
        //break;
      //on each 3rd item
      case (pos % 3 === 0):
        return [pos,'Fizz'];
        //break;
      //all others go here 
      default:
        return [pos,item];
        //break;
      }
    });
  return data;
}

/**
 * Console log words
 * @param words: Array of length 2 [position, word] 
 */
function wordsToConsole(words){
  //print output
  words.map((item)=>{
    console.log(item.join(": "));
  });
}