// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
phoneNumber:{
    type:Number,
    required: true,
},
age:{
    type:Number,
    required: true,
},
gender:{
    type:String,
    enum: ["male", "female"],
    required: true,
},
htno:{
    type:String,
  
}

});

const User = mongoose.model('User', userSchema);

module.exports = User;
