import * as React from 'react'
import TodoItem from './todo-item'
import { TodoListInterface } from './../interfaces'

const TodoList = (props: TodoListInterface) => {
  return (
    <div className="todo-list" style={{ marginTop: 20 }}>
      <ul>
        {props.todos.map((todo) => (
          <li key={todo.id}>
            <TodoItem
              todo={todo}
              handleTodoUpdate={props.handleTodoUpdate}
              handleTodoRemove={props.handleTodoRemove}
							handleTodoComplete={props.handleTodoComplete}
							handleTodoBlur={props.handleTodoBlur}
							handleTodoDeadline={props.handleTodoDeadline}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
export default TodoList
