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
  const [todosSearch, setTodosSearch] = React.useState<TodoInterface[]>([])
  const [todosFilter, setTodosFilter] = React.useState<TodoInterface[]>([])

  function handleTodoCreate(todo: TodoInterface | null) {
		if (!todo) return setError(EXIST_ERROR);
		if (error) setError('');

    const newTodosState: TodoInterface[] = [...todos]

    newTodosState.push(todo)

    setTodos(newTodosState)
		setLocalStorage(newTodosState);
		if (todosFilter.length > 0) setTodosFilter([]);
		if (todosSearch.length > 0) setTodosSearch([]);
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
		if (todosFilter.length > 0) {
			const newTodoFilter: TodoInterface[] = todos.filter((todo: TodoInterface) => todo.id !== id);
			setTodosFilter(newTodoFilter);
		}
		if (todosSearch.length > 0) {
			const newTodoSearch: TodoInterface[] = todos.filter((todo: TodoInterface) => todo.id !== id);
			setTodosSearch(newTodoSearch);
		}
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
			if (todosFilter.length > 0) setTodosFilter([]);
			if (todosSearch.length > 0) setTodosSearch([]);
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
			if (todosFilter.length > 0) setTodosFilter([]);
			if (todosSearch.length > 0) setTodosSearch([]);
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
		if (todosSearch.length > 0) newTodosState = [...todosSearch];
		if (todosFilter.length > 0) newTodosState = [...todosFilter];
		if (event.target.value === '') return;
		switch (event.target.value) {
			case 'priorityDESC':
				newTodosState = newTodosState.sort((a, b) => a.category.priority - b.category.priority);
				break;
			case 'priorityASC':
				newTodosState = newTodosState.sort((a, b) => b.category.priority - a.category.priority);
				break;
			default:
				break;
		}
		if (todosFilter.length > 0) setTodosFilter(newTodosState);
		else if (todosSearch.length > 0) setTodosSearch(newTodosState);
		else setTodos(newTodosState);
	}

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTodosFilter([]);
		let todoSearchResult: TodoInterface[] = [];
		todos.filter(todo => {
			if (todo.text.includes(event.target.value)) todoSearchResult.push(todo);
		});
		setTodosSearch(todoSearchResult);
	}

	const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const inputSearch = document.getElementById("input-search");
		if (inputSearch) inputSearch.innerHTML = '';
		setTodosSearch([]);
		let todoFilterResult: TodoInterface[] = [];
		const value = event.target.value;
		todos.filter(todo => {
			if (todo.status === value || todo.category.type === value) todoFilterResult.push(todo);
		});
		setTodosFilter(todoFilterResult);
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
				handleSearch={handleSearch}
				handleFilter={handleFilter}
      />
			{error && <p style={{ color: 'red' }}>{error}</p>}
      <TodoList
        todos={todosSearch.length > 0 ? todosSearch : todosFilter.length > 0 ? todosFilter : todos}
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
