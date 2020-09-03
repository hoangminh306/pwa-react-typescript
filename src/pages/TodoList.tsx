import * as React from 'react'

import TodoForm from '../components/todo-form'
import TodoList from '../components/todo-list'

import { TodoInterface } from '../interfaces'

import '../styles/styles.css'

const EXIST_ERROR = 'This todo has already in list !';
const DEADLINE_ERROR = 'You should change deadline and tick complete !';

const TodoListPage = () => {
  const [todos, setTodos] = React.useState<TodoInterface[]>([])
  const [error, setError] = React.useState('')

  function handleTodoCreate(todo: TodoInterface | null) {
		if (!todo) return setError(EXIST_ERROR);
		if (error) setError('');

    const newTodosState: TodoInterface[] = [...todos]

    newTodosState.push(todo)

    setTodos(newTodosState)
		setLocalStorage(newTodosState);
  }

  function handleTodoUpdate(event: React.ChangeEvent<HTMLInputElement>, id: string) {
    const newTodosState: TodoInterface[] = [...todos]

		const index = newTodosState.findIndex(todo => todo.text === event.target.value);
		if (index > -1) setError(EXIST_ERROR);
		if (error) setError('');
    // Find correct todo item to update
    newTodosState.find((todo: TodoInterface) => todo.id === id)!.text = event.target.value

    setTodos(newTodosState)
		setLocalStorage(newTodosState);
  }

  function handleTodoRemove(id: string) {
    const newTodosState: TodoInterface[] = todos.filter((todo: TodoInterface) => todo.id !== id)

		setTodos(newTodosState)
		setLocalStorage(newTodosState);
  }

  function handleTodoComplete(id: string, status: string) {
    // Copy current todos state
    const newTodosState: TodoInterface[] = [...todos]

    // Find the correct todo item and update its 'isCompleted' key
		let index = newTodosState.findIndex((todo: TodoInterface) => todo.id === id);
		if (index > -1) {
			if (status === 'error') return setError(DEADLINE_ERROR);
			newTodosState[index].status = status;
			setTodos(newTodosState);
			setLocalStorage(newTodosState);
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
				newTodosState[index].deadline = null;
			else {
				newTodosState[index].deadline = event.target.valueAsDate;
				setError("");
			}
			setTodos(newTodosState);
			setLocalStorage(newTodosState);
		}
	} 

	const setLocalStorage = (todos: TodoInterface[]) => {
		window.localStorage.setItem(
			"todoList",
			JSON.stringify(todos)
		);
	}

	const getLocalStorage = () => {
		let todoList: any = window.localStorage.getItem("todoList");
  	if (todoList) {
			todoList = JSON.parse(todoList);
			todoList.map((todo: { createDate: string | number | Date; deadline: string | number | Date | undefined }) => {
				todo.createDate = new Date(todo.createDate);
				todo.deadline = todo.deadline ? new Date(todo.deadline) : undefined;
			})
			setTodos(todoList);
		}
	}

	const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
		let newTodosState: TodoInterface[] = [...todos];
		if (event.target.value === '') return;
		switch (event.target.value) {
			case 'priorityASC':
				newTodosState = newTodosState.sort((a, b) => a.category.priority - b.category.priority);
				break;
			case 'priorityDESC':
				newTodosState = newTodosState.sort((a, b) => b.category.priority - a.category.priority);
				break;
			default:
				break;
		}
		setTodos(newTodosState);
		setLocalStorage(newTodosState);
	}

	React.useEffect(() => {
		getLocalStorage();
	}, []);

  return (
    <div className="todo-list-app">
      <TodoForm
        todos={todos}
				handleTodoCreate={handleTodoCreate}
				handleSort={handleSort}
      />
			{error && <p style={{ color: 'red' }}>{error}</p>}
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
