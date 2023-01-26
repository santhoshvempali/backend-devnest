// Map is a collection of keyed data items, just like an Object. But the main difference is that Map allows keys of any type.

// Methods and properties are:

// new Map() – creates the map.
// map.set(key, value) – stores the value by the key.
// map.get(key) – returns the value by the key, undefined if key doesn’t exist in map.
// map.has(key) – returns true if the key exists, false otherwise.
// map.delete(key) – removes the element (the key/value pair) by the key.
// map.clear() – removes everything from the map.
// map.size – returns the current element count.
let map = new Map();
map.set(1, "string");
map.set("1", "one");
map.set(true, "Boolean");
console.log(map);

console.log(map.get(1));
console.log(map.get("1"));

map[true] = "Data";

//map can use objects as keys
// Using objects as keys is one of the most notable and important Map features.
// The same does not count for Object. String as a key in Object is fine, but we can’t use another Object as a key in Object.
{
  let john = { name: "John" };

  // for every user, let's store their visits count
  let visitsCountMap = new Map();

  // john is the key for the map
  visitsCountMap.set(john, 123);
  console.log(visitsCountMap);
}
{
  let john = { name: "John" };
  let ben = { name: "Ben" };

  let visitsCountObj = {}; // try to use an object

  visitsCountObj[ben] = 234; // try to use ben object as the key
  visitsCountObj[john] = 123;
  console.log(visitsCountObj);
}

//iteration over map
// map.keys() – returns an iterable for keys,
// map.values() – returns an iterable for values,
// map.entries() – returns an iterable for entries [key, value], it’s used by default in for..of.

let recipe = new Map([
  ["cucumber", 500],
  ["tomatoes", 300],
  ["onino", 600],
]);
for (let veggie of recipe.keys()) {
  console.log(veggie);
}
for (let cost of recipe.values()) {
  console.log(cost);
}
for (let item of recipe) {
  console.log(item);
}

// The insertion order is used
// The iteration goes in the same order as the values were inserted. Map preserves this order, unlike a regular Object.
//forEach(item,index,map)
recipe.forEach((item, index, map) => {
  console.log(item, index);
});

// If we have a plain object, and we’d like to create a Map from it, then we can use built-in method Object.entries(obj) that returns an array of key/value pairs for an object exactly in that format.

// So we can create a map from an object like this

{
  let obj = {
    name: "John",
    age: 30,
  };

  let map = new Map(Object.entries(obj));
  console.log(map);
}

// Here, Object.entries returns the array of key/value pairs: [ ["name","John"], ["age", 30] ]. That’s what Map needs.

// Object.fromEntries: Object from Map
// We’ve just seen how to create Map from a plain object with Object.entries(obj).

// There’s Object.fromEntries method that does the reverse: given an array of [key, value] pairs, it creates an object from them:
{
  let prices = Object.fromEntries([
    ["banana", 1],
    ["orange", 2],
    ["meat", 4],
  ]);

  // now prices = { banana: 1, orange: 2, meat: 4 }

  console.log(prices.orange);
}

{
  let map = new Map();
  map.set("banana", 1);
  map.set("orange", 2);
  map.set("meat", 4);

  let obj = Object.fromEntries(map.entries());
  console.log(obj);
  obj = Object.fromEntries(map);
  console.log(obj);
}

// That’s the same, because Object.fromEntries expects an iterable object as the argument. Not necessarily an array. And the standard iteration for map returns same key/value pairs as map.entries(). So we get a plain object with same key/values as the map.



// A Set is a special type collection – “set of values” (without keys), where each value may occur only once.

// Its main methods are:

// new Set([iterable]) – creates the set, and if an iterable object is provided (usually an array), copies values from it into the set.
// set.add(value) – adds a value, returns the set itself.
// set.delete(value) – removes the value, returns true if value existed at the moment of the call, otherwise false.
// set.has(value) – returns true if the value exists in the set, otherwise false.
// set.clear() – removes everything from the set.
// set.size – is the elements count.
{
    let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// visits, some users come multiple times
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// set keeps only unique values
alert( set.size ); // 3

for (let user of set) {
  alert(user.name); // John (then Pete and Mary)
}

}