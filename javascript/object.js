let user=new Object( {"name":"santhosh","data hub":"opedataHub"}) //constructor
let user1={} //literal;
console.log(user==user1)
console.log(user)

console.log(user.name) //dot notation
// console.log(user.data hub)//throws error
console.log(user["data hub"])

//add data
user.admin=true
console.log(user)

//delete data
delete user.admin

console.log(user)

// We can also use multiword property names, but then they must be quoted:

user["hi hello"]="greeting"

console.log(user)

let compute_feild="compute"

let data_d={
    [compute_feild]:"hii"
}

console.log(data_d)

for (key in user){
    console.log(key)
}