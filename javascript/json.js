// JavaScript provides methods:

// JSON.stringify to convert objects into JSON.
// JSON.parse to convert JSON back into an object.

let student = {
    name: 'John',
    age: 30,
    isAdmin: false,
    courses: ['html', 'css', 'js'],
    spouse: null
  };
  
  let json = JSON.stringify(student);
//   let json = JSON.stringify(value[, replacer, space])
//   value
//   A value to encode.
//   replacer
//   Array of properties to encode or a mapping function function(key, value).
//   space
//   Amount of space to use for formatting
  let json_replacer=JSON.stringify(student,['age','courses'])

  console.log(typeof json)
  console.log(typeof student)

  console.log(json_replacer)

  //JSON.parse converts JSON to Objects

  let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup = JSON.parse(str, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
}); //here function is reviver

console.log( meetup.date.getDate() )