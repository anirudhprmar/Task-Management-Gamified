import express from "express"
import { inProgressTodo,allTodos,addTodo,completeTodo,deleteTodo } from "../controllers/todo.controller.js"
import protectRoute from "../middleware/auth.middleware.js"


const router = express.Router()

router.use(protectRoute)

router.get('/', allTodos)

router.post('/create', addTodo)

router.put('/:todoId/completed',completeTodo) // user check the todo and req will hit backend in res the todo completed is true
router.put('/:todoId/working',inProgressTodo) // user will have option to choose from want to work now or no , and also where todo is placed there will be a btn asking to work on it when clicked on that button make the state true (but before that proper id must be sent) and work on that todo 

router.delete('/:todoId/delete',deleteTodo)

export default router;