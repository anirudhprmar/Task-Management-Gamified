import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

export const connectDB = async()=>{
    
  try {
    await mongoose.connect(process.env.MONGO_URI)
  } catch (error) {
    console.log(`MongoDb connection error;${error}`);
  }  
} 


const todoSchema = mongoose.Schema({
  title:String,
  description:String,
  completed:{
    type:Boolean,
    default:false
  }
})

export const todo = mongoose.model('todos',todoSchema)