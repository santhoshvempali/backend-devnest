let single = "single-quoted";
let double = "double-quoted";

let backticks = `backticks`;
// Single and double quotes are essentially the same. Backticks, however, allow us to embed any expression into the string, by wrapping it in ${…}:

console.log(`hi this is ${backticks}}`)

console.log("hello:\n this is multiline\n comment")

let str="santhosh"
console.log(str.length);
console.log(str[0])
console.log(str[-1])
console.log(str.at(0))
console.log(str.at(-1)) //using .at method we can gie negative indexes
for (let char of "Hello") {
    console.log(char); // H,e,l,l,o (char becomes "H", then "e", then "l" etc)
  }

//strings are immutable

str[0]="k" //returns error
console.log(str)


//changing to lowerCase

console.log(str.toLowerCase())
console.log(str.toUpperCase())

//searching for str.indexOf

let newStr="Widget with id";

console.log(newStr.indexOf('Wid'))
// The more modern method str.includes(substr, pos) 
// returns true/false depending on whether str contains substr within.
console.log(newStr.includes("with"));
console.log(newStr.includes("with",12))

console.log(newStr.startsWith("Wid"))
console.log(newStr.endsWith("id"))


console.log(newStr.slice(1,4))
console.log(newStr.slice(-5,-1))
console.log(newStr.slice(2))

// str.substring(start [, end])
// Returns the part of the string between start and end (not including end).

// This is almost the same as slice, but it allows start to be greater than end 
// (in this case it simply swaps start and end values).

console.log(newStr.substring(2,6))
console.log(newStr.substring(6,2))

//substr takes two values start pos and no characters to be imcluded

console.log(newStr.substr(2,6))


