//arrays are objects in javascript
//arrays can hold multiple values
//arrays in javascript can have only no negative intgeres
//in javascript when we assign an array to another array it is shallow copt it refrences to the old array any changesin new will be affected in old array
// in arrays we can use dot notation
let arr=new Array();//initializes an array
let arr1=[]//initializes an array
let fruits = ["Apple", "Orange", "Plum"];
console.log(fruits[0]) //indexed accessing
fruits[1]="mango"//replaces Orange with mango
fruits[3]="Orange" //add an new element
console.log(fruits.length) //length of the array

// mix of values
let mix = [ 'Apple', { name: 'John' }, true, function() { alert('hello'); } ];

// get the object at index 1 and then show its name
alert( mix[1].name ); // John

// get the function at index 3 and run it
mix[3](); // hello


mix[-1] //return an error we cant access negative indexed
console.log(mix.at(-1))//we can use at to access neagtive indexed elements

//methods
// push inserts at last
// shift deletes at first
// unshift deletes at first
// pop deletes at last

// A queue is one of the most common uses of an array. In computer science, this means an ordered collection of elements which supports two operations:
// FIFO
// push appends an element to the end.
// shift get an element from the beginning, advancing the queue, so that the 2nd element becomes the 1st.


// It supports two operations:
//LIFO
// push adds an element to the end.
// pop takes an element from the end.
// So new elements are added or taken always from the “end”.

// A stack is usually illustrated as a pack of cards: new cards are added to the top or taken from the top:

console.log(fruits.pop())//deletes at last

console.log(fruits.shift()) //deletes at first

fruits.unshift("hi") //adds at first


// It supports two operations:

// push adds an element to the end.
// pop takes an element from the end.
// So new elements are added or taken always from the “end”.

// A stack is usually illustrated as a pack of cards: new cards are added to the top or taken from the top:

{
let fruits = ["Apple", "Orange", "Plum"];

// iterates over array elements
for (let fruit of fruits) {
  alert( fruit );
}
}

//length property automatically updates when we modify the array
