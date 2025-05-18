import { createTodo } from "../types.js";
import {Todo} from '../models/todo.model.js'


export const allTodos = async(req,res)=>{
    
    try {

        const userId = req.user.id;

        const todos = await Todo.find({createdBy:userId}) // only that particular user's todos

        res.status(200).json({
            status:"success",
            todos
        })
        
    } catch (error) {
        console.log('error in all todos',error);
        res.status(500).json({
            msg:"internal server error"
        })
    }
    
}

export const addTodo = async(req,res)=>{
      try {

        const userId = req.user.id
          // put a new todo
          const validatedTodo = createTodo.safeParse(req.body)
        
          if (!validatedTodo.success) {
              return res.status(411).json({
                  msg:"invalid inputs"
              })
          }

          await Todo.create({
          title:validatedTodo.data.title,
          note:validatedTodo.data.note,
          completed:false,
        //   dueDate:validatedTodo.data.dueDate || "",
          inProgress:false,
          category:validatedTodo.data.category || "",
          createdBy:userId

          })
      
      
          res.status(200).json({
              msg:"Todo created"
          })
      } catch (error) {
        console.log('error in add todo',error);
        res.status(501).json({
            msg:"Internal server error"
        })
      }
    

}

export const completeTodo = async(req,res)=>{  
       try {

        const {todoId} = req.params

         const selectedTodo = await Todo.findById(todoId)

        if (!selectedTodo) {
        return res.status(404).json({
            status: 'fail',
            message: 'Todo not found'
        });
        }
        
        await Todo.updateOne({
            _id:todoId
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
    

}

export const inProgressTodo = async(req,res)=>{
    
       try {
        
        const {todoId} = req.params

          const selectedTodo = await Todo.findById(todoId)

        if (!selectedTodo) {
        return res.status(404).json({
            status: 'fail',
            message: 'Todo not found'
        });
        }
    
        await Todo.updateOne({
            _id:todoId
        },{
            inProgress:true
        })
    
        res.status(200).json({
            msg:"Todo updated"
        })
       } catch (error) {
        console.log('error in progress of todo',error);
        res.status(501).json({
            msg:"Internal server error"
        })
       }
    
}


export const deleteTodo = async(req,res)=>{
    try {
        const {todoId} = req.params

        const selectedTodo = await Todo.findById(todoId)

        if (!selectedTodo) {
        return res.status(404).json({
            status: 'fail',
            message: 'Todo not found'
        });
        }

        await Todo.findByIdAndDelete(todoId)

        res.status(200).json({
            msg:"Todo Deleted"
        })

    } catch (error) {
        console.log('error in delete todo',error);
        res.status(501).json({
            msg:"Internal server error"
        })
    }
}