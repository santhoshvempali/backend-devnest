let a=100
function hell(){
    let a=10
    console.log(this.a)
}
hell()


function getThis() {
    return this;
  }
console.log(getThis())
  const obj1 = { name: "obj1" };
  const obj2 = { name: "obj2" };
  
  obj1.getThis = getThis;
  obj2.getThis = getThis;
  console.log(obj1)
  console.log(obj1.getThis()); // { name: 'obj1', getThis: [Function: getThis] }
  console.log(obj2.getThis()); // { name: 'obj2', getThis: [Function: getThis] }
  console.log(obj1.getThis())

  var data=obj1.getThis()

  console.log(data.name)
  console.log(data.getThis())

  const obj3 = {
    __proto__: obj1,
    a:10,
  };
  
  console.log(obj3.getThis()); // { name: 'obj3' }
  