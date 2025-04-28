import express from "express"
import { inProgressTodo,allTodos,addTodo,completeTodo,deleteTodo } from "../controllers/todo.controller.js"
import protectRoute from "../middleware/auth.middleware.js"


const router = express.Router()

router.use(protectRoute)

router.get('/', allTodos)

router.post('/create', addTodo)

router.put('/:todoId/completed',completeTodo)
router.put('/:todoId/working',inProgressTodo)

router.delete('/:todoId/delete',deleteTodo)

export default router;