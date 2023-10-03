import { ChangeEventHandler, FormEvent, useState } from 'react'
import './App.css'
import { TaskDTO } from './types/dto'
import Task from './components/Task'

const initTasks: TaskDTO[] = [
  {
    id: Math.floor(Math.random() * 1000),
    todo: 'Learn HTML',
    isDone: false,
  },
  {
    id: Math.floor(Math.random() * 1000),
    todo: 'Learn React',
    isDone: false,
  },
  {
    id: Math.floor(Math.random() * 1000),
    todo: 'Learn Node.js',
    isDone: false,
  },
  {
    id: Math.floor(Math.random() * 1000),
    todo: 'Learn useState',
    isDone: false,
  },
]

function App() {
  const [tasks, setTasks] = useState<TaskDTO[]>(initTasks)
  const [toBeAddedTaskValue, __setNewTask] = useState('')

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => __setNewTask(e.target.value)

  const handleAdd = (e: FormEvent) => {
    e.preventDefault()

    const currentTasks = [...tasks]

    currentTasks.push({
      id: Math.floor(Math.random() * 1000),
      todo: toBeAddedTaskValue,
      isDone: false,
    })

    setTasks(currentTasks)

    // * for clear form after submit
    __setNewTask('')
  }

  const handleToggle = (index: number) => {
    const currentTasks = [...tasks]

    currentTasks[index].isDone = !currentTasks[index].isDone

    setTasks(currentTasks)
  }

  const handleDelete = (indexToDelete: number) => {
    const updateTasks = tasks.filter((task, index) => index !== indexToDelete)
    setTasks(updateTasks)
  }

  return (
    <div className="App">
      <h1>React Todo List</h1>
      <form onSubmit={handleAdd}>
        <label>Add Todo List:</label>
        <input type="text" value={toBeAddedTaskValue} onChange={handleChange} required />
        <input type="submit" value="Add" />
      </form>
      <div className="todo-container">
        {tasks.map((task, idx) => {
          return (
            <Task
              key={task.id}
              task={task}
              handleToggle={handleToggle}
              handleDelete={() => handleDelete(idx)}
              idx={idx}
            />
          )
        })}
      </div>
    </div>
  )
}

export default App
