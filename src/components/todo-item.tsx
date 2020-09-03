import * as React from 'react'
import { TodoItemInterface } from './../interfaces'
import TodoStatus from './todo-status'

const TodoItem = (props: TodoItemInterface) => {
	const [dayLeft, setDayLeft] = React.useState<string>("");
	const [deadline, setDeadline] = React.useState<string>("");
	const createDate = props.todo.createDate.toISOString().slice(0, 10).split('-').reverse().join('/');
	let color;
	switch (props.todo.category.type) {
		case 'medium':
			color = "blue"
			break;
		case 'high':
			color = "#ffb000"
			break;
		case 'critical':
			color = "red"
			break;
		default:
			break;
	}

	const initialDeadline = () => {
		if (props.todo.deadline) {
			setDeadline(props.todo.deadline.toISOString().slice(0, 10).split('-').join('-'));
		}
	}

	const handleDayLeft = () => {
		if (props.todo.deadline) {
			const days = (props.todo.deadline?.getTime() - props.todo.createDate.getTime()) / (1000 * 3600 * 24);
			const parseDay = parseInt(days.toFixed(1));
			if (parseDay <= 1) setDayLeft(`${parseDay} day left`);
			else setDayLeft(`${parseDay} days left`);
		}
	}

	React.useEffect(() => {
		//set default value
		initialDeadline();
	}, []);

	React.useEffect(() => {
		//calculate days left
		handleDayLeft();
	}, [props.todo.deadline])

	return (
		<div className='todo-item' style={props.todo.status === "complete" ? {backgroundColor: "#9ad6ff"} : {}}>
			<div style={{ color, width: 60, marginRight: 15 }}>
				{props.todo.category.type.toUpperCase()}
			</div>
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
				{createDate} <hr />
				<b>Deadline</b><input type='date' defaultValue={deadline} onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.handleTodoDeadline(props.todo.id, event)} />
			</div>
			{props.todo.deadline && (
				<div style={{ marginLeft: 10 }}>
					{dayLeft}
				</div>
			)}
			{props.todo.deadline === null && (
				<div style={{ marginLeft: 10, color: 'red' }}>
					Deadline must after create date
				</div>
			)}
			<div className="item-remove" onClick={() => props.handleTodoRemove(props.todo.id)}>
				⨯
      </div>
		</div>
	)
}
export default TodoItem
