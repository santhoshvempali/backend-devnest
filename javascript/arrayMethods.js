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