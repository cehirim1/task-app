import mongoose from 'mongoose';

//in userID connect task with user by referencing user model
const tasks = new mongoose.Schema({
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  }, 

  task:{
    type:String,
    required: true,
  },
  deadline:{
    type:Date,
    required: false,
    default: Date.now(),
  },

  description:{
    type: String,
    default: "",
  },

  status:{
type:String,
required: false,
enum:["active", "incomplete", "completed", "archived", "notStarted"],
default: "notStarted",

  }
})

export const Task = mongoose.model("task", tasks);