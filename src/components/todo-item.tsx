import * as React from 'react'
import { TodoItemInterface } from './../interfaces'
import TodoStatus from './todo-status'

const TodoItem = (props: TodoItemInterface) => {
	let dayLeft;
	if (props.todo.deadline) {
		const miliseconds = props.todo.deadline?.getTime() - props.todo.createDate.getTime();
		dayLeft = miliseconds / (1000 * 3600 * 24);
	}
	return (
		<div className='todo-item'>
			<TodoStatus
				todo={props.todo}
				handleTodoComplete={props.handleTodoComplete}
			/>
			<div className="todo-item-input-wrapper">
				<input
					value={props.todo.text}
					onBlur={props.handleTodoBlur}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.handleTodoUpdate(event, props.todo.id)}
				/>
			</div>
			<div>
				<b>Create date</b> <br />
				{props.todo.createDate.toISOString().slice(0, 10).split('-').reverse().join('/')} <hr />
				<b>Deadline</b><input type='date' onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.handleTodoDeadline(props.todo.id, event)}/>
			</div>
			<div>
				{props.todo.deadline && dayLeft && parseInt(dayLeft?.toFixed(1)) + " days left"}
			</div>
			<div className="item-remove" onClick={() => props.handleTodoRemove(props.todo.id)}>
				⨯
      </div>
		</div>
	)
}
export default TodoItem
