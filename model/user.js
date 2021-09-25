const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({

    First_Name: {
        type: String,
        required: true
    },
    Last_Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique:true
    },
    Password: {
        type: String,
        required: true
    },
    Department: {
        type: String,
        required: true
    },
    Role:{
        type:String,
        enum:['user','admin'],
        default:"user"
    }
},
{timestamps:true})

const userModel = new mongoose.model('userProfile', userSchema)

module.exports = userModel;