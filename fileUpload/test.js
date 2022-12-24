var cities = [
    { name: "London", "population": 8615246 },
    { name: "Berlin", "population": 3517424 },
    { name: "Madrid", "population": 3165235 },
    { name: "Rome",   "population": 2870528 }
  ];
  
  var jp = require('jsonpath');
  var names = jp.query(cities, '$..name');

  console.log(names)
var data={
    "store": {
      "book": [ 
        {
          "category": "reference",
          "author": "Nigel Rees",
          "title": "Sayings of the Century",
          "price": 8.95
        }, {
          "category": "fiction",
          "author": "Evelyn Waugh",
          "title": "Sword of Honour",
          "price": 12.99
        }, {
          "category": "fiction",
          "author": "Herman Melville",
          "title": "Moby Dick",
          "isbn": "0-553-21311-3",
          "price": 8.99
        }, {
           "category": "fiction",
          "author": "J. R. R. Tolkien",
          "title": "The Lord of the Rings",
          "isbn": "0-395-19395-8",
          "price": 22.99
        }
      ],
      "bicycle": {
        "color": "red",
        "price": 19.95
      }
    }
  }

  let query="$..[?(@.price<15)]"

  let book_lt_15=jp.query(data,query)
  console.log(book_lt_15)