import mongoose from "mongoose"

const todoSchema = mongoose.Schema({
    title:String,
    note:String,
    completed:{
      type:Boolean,
      default:false
    },
    // dueDate:String,
    inProgress:{
        type:Boolean,
        default:false
    },
    category:String,
    createdBy:String
  },{timestamps:true})
  
  export const Todo = mongoose.model('todos',todoSchema)