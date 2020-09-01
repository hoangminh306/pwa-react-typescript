import * as React from 'react'

import TodoForm from '../components/todo-form'
import TodoList from '../components/todo-list'

import { TodoInterface } from '../interfaces'

import '../styles/styles.css'

const TodoListPage = () => {
  const [todos, setTodos] = React.useState<TodoInterface[]>([])

  function handleTodoCreate(todo: TodoInterface) {
    const newTodosState: TodoInterface[] = [...todos]

    newTodosState.push(todo)

    setTodos(newTodosState)
  }

  function handleTodoUpdate(event: React.ChangeEvent<HTMLInputElement>, id: string) {
    const newTodosState: TodoInterface[] = [...todos]

    // Find correct todo item to update
    newTodosState.find((todo: TodoInterface) => todo.id === id)!.text = event.target.value

    setTodos(newTodosState)
  }

  function handleTodoRemove(id: string) {
    const newTodosState: TodoInterface[] = todos.filter((todo: TodoInterface) => todo.id !== id)

    setTodos(newTodosState)
  }

  function handleTodoComplete(id: string, status: string) {
    // Copy current todos state
    const newTodosState: TodoInterface[] = [...todos]

    // Find the correct todo item and update its 'isCompleted' key
		let index = newTodosState.findIndex((todo: TodoInterface) => todo.id === id);
		if (index > -1) {
			newTodosState[index].status = status;
    	setTodos(newTodosState)
		}
  }

  // Check if todo item has title
  function handleTodoBlur(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.length === 0) {
      event.target.classList.add('todo-input-error')
    } else {
      event.target.classList.remove('todo-input-error')
    }
	}

	const handleTodoDeadline = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
		const newTodosState: TodoInterface[] = [...todos];
		let index = newTodosState.findIndex((todo: TodoInterface) => todo.id === id);
		if (index > -1 && event.target.valueAsDate) {
			// get miliseconds between 2 days
			let miliseconds = event.target.valueAsDate.getTime() - newTodosState[index].createDate.getTime();
			miliseconds = miliseconds / (1000 * 3600 * 24);
			if (parseInt(miliseconds.toFixed(1)) < 0)
				newTodosState[index].deadline = undefined;
			else
				newTodosState[index].deadline = event.target.valueAsDate;
			setTodos(newTodosState);
		}
	} 

  return (
    <div className="todo-list-app">
      <TodoForm
        todos={todos}
        handleTodoCreate={handleTodoCreate}
      />

      <TodoList
        todos={todos}
        handleTodoUpdate={handleTodoUpdate}
        handleTodoRemove={handleTodoRemove}
				handleTodoComplete={handleTodoComplete}
				handleTodoBlur={handleTodoBlur}
				handleTodoDeadline={handleTodoDeadline}
      />
    </div>
  )
}

export default TodoListPage;
