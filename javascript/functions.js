//Defining functions
//a function definition is called an function declaration or function statement
function square(num){
    return num*num
}
// When you pass an object as a parameter, if the function changes the object's properties,
//  that change is visible outside the function, as shown in the following example:

function myFunc(theObject) {
    theObject.make = 'Toyota';
  }
  
  const mycar = {
    make: 'Honda',
    model: 'Accord',
    year: 1998,
  };
  
  // x gets the value "Honda"
  const x = mycar.make;
  
  // the make property is changed by the function
  myFunc(mycar);
  // y gets the value "Toyota"
  const y = mycar.make;

  console.log(x,y)

  //Function Expressions

  {
    const square = function (number) {
        return number * number;
      }
    const x = square(4); // x gets the value 16
      
  }
  //function expressions are convinent when passing function as an argument to another function

//   In the following code, the function receives a function defined by a function expression 
//   and executes it for every element of the array received as a second argument:
  function map(f, a) {
    const result = new Array(a.length);
    for (let i = 0; i < a.length; i++) {
      result[i] = f(a[i]);
    }
    return result;
  }
  
  const f = function (x) {
    return x * x * x;
  }
  
  const numbers = [0, 1, 2, 5, 10];
  const cube = map(f, numbers);
  console.log(cube);

  //Function Hoisting

  {
    console.log(square(5)); // 25

    function square(n) {
    return n * n;
        }
    // this code runs without any error because in javascript function declarations are hoisted an top of function 
  }
  {
    console.log(square); // ReferenceError: Cannot access 'square' before initialization
    const square = function (n) {
    return n * n;
    //function expressions are not hoisted
}
  }

//FUNCTION PARAMETERS
//REST PARAM
//DEFAULT PARAMTERS

{
    function multiply(a, b = 1) { //b=1 is default param if nothing is passed b takes 1 as default value
        return a * b;
      }
      
      multiply(5); // 5
}

// The rest parameter syntax allows us to represent an indefinite number of arguments as an array.

// In the following example, the function multiply uses rest parameters to collect arguments from the second one to the end. The function then multiplies these by the first argument.


{

    function multiply(multiplier, ...theArgs) {
        return theArgs.map((x) => multiplier * x);
      }
      
      const arr = multiply(2, 1, 2, 3);
      console.log(arr); // [2, 4, 6]
      
}