// The arr.splice method is a swiss army knife for arrays. It can do everything: insert, remove and replace elements.

// arr.splice("start","deleteCOunt","elemnts")

let arr = ["I", "study", "JavaScript"];

arr.splice(1, 1); // from index 1 remove 1 element

console.log( arr ); // ["I", "JavaScript"]

{
let arr = ["I", "study", "JavaScript", "right", "now"];

// remove 3 first elements and replace them with another
arr.splice(0, 3, "Let's", "dance");

//remove 3 elements from 0 and add two elements in their position

console.log(arr)

}

{
// splice method is also able to insert the elements without any removals. 
// For that we need to set deleteCount to 0
let arr = ["I", "study", "JavaScript"];

// from index 2
// delete 0
// then insert "complex" and "language"
arr.splice(2, 0, "complex", "language");
console.log(arr)

}

{
    //Negative indexes are allowed in splice method
    let arr=[1,2,3]
    arr.splice(arr.length,0,4,5)
    console.log(arr)
}

{
//     It returns a new array copying to it all items from index start to end (not including end). Both start and end can be negative, in that case position from array end is assumed.

// It’s similar to a string method str.slice, but instead of substrings it makes subarrays.
let arr = ["t", "e", "s", "t"];

console.log( arr.slice(1, 3) ); // e,s (copy from 1 to 3)

}
{
    //concat return conact of multiple aray arr.concat(arg1,arg2)
    let arr=[1,2,3]
    let arr1=[4,5,6]
    let arr2=arr.concat(arr1)
    console.log(arr,arr2)
}
{

    // The arr.forEach method allows to run a function for every element of the array.
    // arr.forEach(function(item, index, array) {
        // ... do something with item
    //   });
    let arr=["Bilbo", "Gandalf", "Nazgul"]
    arr.forEach(function(item){
        console.log(item)
    })
    arr.forEach(function(item,index){
        console.log(item,index)
    })

}

{
// arr.indexOf(item, from) – looks for item starting from index from, and returns the index where it was found, otherwise -1.
// arr.includes(item, from) – looks for item starting from index from, returns true if found.
let arr=[1,0,false]

console.log(arr.indexOf(1))
console.log(arr.indexOf(false,0))//starts from 0 index
console.log(arr.includes(1))

// Please note that indexOf uses the strict equality === for comparison. So, if we look for false, it finds exactly false and not the zero.

// If we want to check if item exists in the array, and don’t need the index, then arr.includes is preferred
// A minor, but noteworthy feature of includes is that it correctly handles NaN, unlike indexOf

}

{
// The find method looks for a single (first) element that makes the function return true.

// If there may be many, we can use arr.filter(fn).

// The syntax is similar to find, but filter returns an array of all matching elements:
// let results = arr.filter(function(item, index, array) {
   // if true item is pushed to results and the iteration continues
     // returns empty array if nothing found
//   });
let users = [
    {id: 1, name: "John"},
    {id: 2, name: "Pete"},
    {id: 3, name: "Mary"}
  ];
  let someUsers=users.filter(item=>item.id>1);
  console.log(`this is using filter ${JSON.stringify(someUsers)}`)

}

// console.log(`${}`)
{
 //map
// The arr.map method is one of the most useful and often used.
// It calls the function for each element of the array and returns the array of result
// let result = arr.map(function(item, index, array) {
// returns the new value instead of item
//   });
let lengths = ["Bilbo", "Gandalf", "Nazgul"]
let arrLengths=lengths.map(item=>item.length)
console.log(arrLengths)


}
{
    //reverse
    let arr=[1,2,3,4,5]
    arr.reverse()
    console.log(arr)
}

{

// Here’s the situation from real life. We are writing a messaging app, and the person enters the comma-delimited list of receivers: John, Pete, Mary. But for us an array of names would be much more comfortable than a single string. How to get it?

// The str.split(delim) method does exactly that. It splits the string into an array by the given delimiter delim.
let names = 'Bilbo, Gandalf, Nazgul';

let arr = names.split(', ');

for (let name of arr) {
  console.log( `A message to ${name}.` ); // A message to Bilbo  (and other names)
}
// The split method has an optional second numeric argument – a limit on the array length.
//  If it is provided, then the extra elements are ignored. In practice it is rarely used though:
let arr1 = 'Bilbo, Gandalf, Nazgul, Saruman'.split(', ', 2);
console.log(arr1)

let str="test"
console.log(str.split(''))

}



