import * as React from 'react';
import { TodoInterface } from '../interfaces';

const TodoStatus = (props: { handleTodoComplete: (id: any, status: string) => void; todo: TodoInterface }) => {
	return (
		<>
			<div onClick={() => props.handleTodoComplete(props.todo.id, 'notDoing')} style={{ marginRight: 10 }}>
				{props.todo.status === 'notDoing' ? (
					<span className="todo-item-checked-not-doing">✔</span>
				) : (
						<span className="todo-item-unchecked" />
					)}
				<p style={{ margin: 0, fontSize: 13 }}>Not doing</p>
			</div>
			<div onClick={() => props.handleTodoComplete(props.todo.id, 'doing')} style={{ marginRight: 10 }}>
				{props.todo.status === 'doing' ? (
					<span className="todo-item-checked-doing">✔</span>
				) : (
						<span className="todo-item-unchecked" />
					)}
				<p style={{ margin: 0, fontSize: 13 }}>Doing</p>
			</div>
			<div onClick={() => props.handleTodoComplete(props.todo.id, 'complete')}>
				{props.todo.status === 'complete' ? (
					<span className="todo-item-checked">✔</span>
				) : (
						<span className="todo-item-unchecked" />
					)}
				<p style={{ margin: 0, fontSize: 13 }}>Complete</p>
			</div>
		</>
	)
}

export default TodoStatus;
