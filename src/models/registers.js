const mongoose=require('mongoose');

const stuSchema=new mongoose.Schema({
    uname:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    }
})

const Register = new mongoose.model("Student",stuSchema);

module.exports = Register;