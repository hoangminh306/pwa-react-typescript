import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TodoInterface } from '../interfaces';

const Detail: React.FC = () => {
	const history = useHistory();
	const [todo, setTodo] = useState<TodoInterface>({ id: "", text: "", status: "", createDate: new Date, category: { type: "", desc: "", priority: 3 } });
	
	const getTodoItem = () => {
		const id: string = history.location.pathname.slice(10);
		let todoList: any = localStorage.getItem('todoList');
		if (todoList) {
			todoList = JSON.parse(todoList);
			const todo = todoList.find((todo: { id: string; }) => todo.id === id);
			todo.createDate = new Date(todo.createDate);
			if (todo.deadline) {
				todo.deadline = new Date(todo.deadline);
				todo.deadline.toISOString().slice(0, 10).split('-').reverse().join('/');
			}
			setTodo(todo);
		}
	}

	React.useEffect(() => {
		getTodoItem();
	}, []);

	return (
		<div style={{ textAlign: "center" }}>
			<p><b>Category</b>: {todo.category.type}</p>
			<p><b>Text</b>: {todo.text}</p>
			<p><b>Create date</b>: {todo.createDate.toISOString().slice(0, 10).split('-').reverse().join('/')}</p>
			<p>{todo.deadline && todo.deadline}</p>
			<p><b>Status</b>: {todo.status}</p>
		</div>
	)
}

export default Detail;
