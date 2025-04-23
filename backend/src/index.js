import express from "express"
import dotenv from 'dotenv'
import { createTodo,updateTodo } from "./types.js";
import { connectDB , todo} from "./db/db.js";

dotenv.config()

const app = express();

app.use(express.json())


app.get('/todos',async(req,res)=>{
    // get all todos

    try {
        const todos = await todo.find({})

        res.json({
            todos
        })
        
    } catch (error) {
        console.log('error in todos',error);
        
    }



})

app.post('/todo',async(req,res)=>{
  try {
      // put a new todo
      const validatedTodo = createTodo.safeParse(req.body)
    
      if (!validatedTodo.success) {
          return res.status(411).json({
              msg:"invalid inputs"
          })
      }
  
  
  
      await todo.create({
      title:validatedTodo.data.title,
      description:validatedTodo.data.description,
      completed:false
      })
  
  
      res.status(200).json({
          msg:"Todo created"
      })
  } catch (error) {
    console.log('error in todo',error);
    res.status(501).json({
        msg:"Internal server error"
    })
  }

})

app.put('/completed',async (req,res)=>{
    // update an existing todo

   try {
    const validatedTodoId = updateTodo.safeParse(req.body)
    
    if (!validatedTodoId.success) {
        return res.status(411).json({
            msg:"todo does not exist"
        })
    }

    await todo.updateOne({
        _id:req.body.id
    },{
        completed:true
    })

    res.status(200).json({
        msg:"Todo updated"
    })
   } catch (error) {
    console.log('error in completed',error);
    res.status(501).json({
        msg:"Internal server error"
    })
   }

})

// app.delete('/todo/delete',(req,res)=>{
//     // delete an existing todo
// })

const PORT = process.env.PORT

app.listen(PORT, async () => {
    console.log(`Server is running on port: ${PORT}`)
    try {
        await connectDB()
        console.log('Successfully connected to MongoDB')
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message)
        process.exit(1)
    }
})