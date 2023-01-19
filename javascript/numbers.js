// The method num.toString(base) returns a string
// representation of num in the numeral system with the given base
let num=123
// num=num.toString(base) base= 2,16,36
num=num.toString()
console.log(num)  
// alert( 123456..toString(36) ); // 2n9c
// Please note that two dots in 123456..toString(36)
// is not a typo. If we want to call a method directly on a number,
// like toString in the example above, then we need to place two dots .. after it.
console.log(typeof(num))

let newNum=3.1

console.log(Math.floor(3.1))
console.log(Math.ceil(3.1))
console.log(Math.round(3.1))

// The method toFixed(n) rounds the number to n digits after the point and returns a string representation of the result.
{
let num = 12.34;
console.log( num.toFixed(1) ); // "12.3"
console.log(num.toFixed(5)); //"12.3000"
}

// They belong to the type number, but are not “normal” numbers, so there are special functions to check for them:

// isNaN(value) converts its argument to a number and then tests it for being NaN:

console.log(isNaN(NaN)); //true
console.log(isNaN("str")) //true
console.log(isNaN(34)) //false

// isFinite(value) converts its argument to a number and returns true 
// if it’s a regular number, not NaN/Infinity/-Infinity

console.log(isFinite("35")) //true
console.log(isFinite("hii")) //false

// But in real life we often have values in units, like "100px" or "12pt" in CSS. Also in many countries the currency symbol goes after the amount, so we have "19€" and would like to extract a numeric value out of that.
// That’s what parseInt and parseFloat are for.
// They “read” a number from a string until they can’t. In case of an error, 
// the gathered number is returned. The function parseInt returns an integer, whilst parseFloat will return a floating-point number:
console.log(parseInt("245gg"));
console.log(parseInt(12.6));
console.log(parseFloat("35.66jj"));
console.log(parseFloat(23));
console.log(parseInt("a123"));
// Math functions are max,min,pow,random
console.log(Math.max(1,2,3,4,5))
console.log(Math.min(1,2,3,4))
console.log(Math.pow(2,10))
