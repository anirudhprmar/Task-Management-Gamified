import CreateTodo from './components/CreateTodo'
import Applayout from './components/layout/Applayout'
import Todos from './components/Todos'

function App() {
  return (
   <Applayout>
      <CreateTodo/>
      <Todos />
   </Applayout>
  )
}

export default App