import * as React from 'react'
import shortid from 'shortid'
import { TodoInterface, TodoFormInterface, TodoCategoryInterface } from './../interfaces'
import TodoSearchFilter from './todo-search-filter'

const CATEGORY = [
	{ type: 'medium', desc: 'normal', priority: 3 },
	{ type: 'high', desc: 'Important', priority: 2 },
	{ type: 'critical', desc: 'Very important', priority: 1 },
]

const TodoForm = (props: TodoFormInterface) => {
	// Create ref
	const inputRef = React.useRef<HTMLInputElement>(null)
	const [formState, setFormState] = React.useState('')
	const [category, setCategory] = React.useState<TodoCategoryInterface>({ type: 'medium', desc: 'normal', priority: 3 });
	function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		setFormState(event.target.value)
	}

	function handleInputEnter(event: React.KeyboardEvent) {
		if (event.key === 'Enter') {
			if (formState === '') return;
			const index = props.todos.findIndex(todo => todo.text === formState);
			if (index > -1) return props.handleTodoCreate(null);
			const createDate = new Date();
			createDate.setHours(7);
			createDate.setMinutes(0);
			createDate.setSeconds(0);
			const newTodo: TodoInterface = {
				id: shortid.generate(),
				text: formState,
				status: 'notDoing',
				createDate,
				category: {
					type: category.type,
					desc: category.desc,
					priority: category.priority
				}
			}

			// Create new todo item
			props.handleTodoCreate(newTodo)

			// Reset the input field
			if (inputRef && inputRef.current) {
				inputRef.current.value = ''
				setFormState('');
			}
		}
	}

	const handleChangeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const category = CATEGORY.find(category => category.type === event.target.value);
		if (category) setCategory(category);
	}

	return (
		<div className="todo-form">
			<div style={{ position: "relative" }}>
				<input
					ref={inputRef}
					type="text"
					placeholder='Enter new todo'
					onChange={event => handleInputChange(event)}
					onKeyPress={event => handleInputEnter(event)}
				/>
				<select
					onChange={event => handleChangeCategory(event)}
					style={{ position: "absolute", right: 0, top: 0, height: '100%' }}
				>
					{CATEGORY.map(category =>
						<option key={category.type} value={category.type}>{category.type} - (Priority: {category.desc})</option>
					)}
				</select>
			</div>
			<TodoSearchFilter handleSort={props.handleSort} handleSearch={props.handleSearch} handleFilter={props.handleFilter} />
		</div>
	)
}
export default TodoForm
