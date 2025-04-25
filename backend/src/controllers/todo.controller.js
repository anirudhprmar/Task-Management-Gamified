import { createTodo,ValidateIdToUpdate } from "../types.js";
import {Todo} from '../models/todo.model.js'


export const allTodos = async(req,res)=>{
    
    try {
        const todos = await Todo.find({})

        res.status(200).json({
            todos
        })
        
    } catch (error) {
        console.log('error in all todos',error);
        res.status(511).json({
            msg:"internal server error"
        })
    }
    
}

export const addTodo = async(req,res)=>{
      try {
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
          dueDate:validatedTodo.data.dueDate || "",
          inProgress:false,
          category:validatedTodo.data.category

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
        const validatedTodoId = ValidateIdToUpdate.safeParse(req.params)
        
        if (!validatedTodoId.success) {
            return res.status(411).json({
                msg:"todo does not exist"
            })
        }
    
        await Todo.updateOne({
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
    

}

export const inProgressTodo = async(req,res)=>{
    
    
       try {
        
        const validatedTodoId = ValidateIdToUpdate.safeParse(req.params)
        
        if (!validatedTodoId.success) {
            return res.status(411).json({
                msg:"todo does not exist"
            })
        }
    
        await Todo.updateOne({
            _id:req.body.id
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