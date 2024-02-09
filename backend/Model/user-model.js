import mongoose from 'mongoose';

//define user schema
const user = new mongoose.Schema({

  email:{
    type: String,
    required: true,
    unique:true,
  },

  password:{
    type:String,
    required:true,
    unique:false,
    length:20
  }
});

export const User = mongoose.model('user', user);