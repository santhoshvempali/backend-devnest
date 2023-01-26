const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    events:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Event"
        }
    ],
    schedule:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Schedule"
        }
    ]
});

module.exports=mongoose.model("User",userSchema)