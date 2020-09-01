import * as React from 'react'
import shortid from 'shortid'
import {TodoInterface, TodoFormInterface} from './../interfaces'

const TodoForm = (props: TodoFormInterface) => {
  // Create ref
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [formState, setFormState] = React.useState('')
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormState(event.target.value)
  }

	function handleInputEnter(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
			const createDate = new Date();
			createDate.setHours(7);
			createDate.setMinutes(0);
			createDate.setSeconds(0);

      const newTodo: TodoInterface = {
        id: shortid.generate(),
        text: formState,
				status: 'notDoing',
				createDate,
			}
			
      // Create new todo item
			props.handleTodoCreate(newTodo)
			
      // Reset the input field
      if (inputRef && inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }
  return (
    <div className="todo-form">
      <input
        ref={inputRef}
        type="text"
        placeholder='Enter new todo'
        onChange={event => handleInputChange(event)}
        onKeyPress={event => handleInputEnter(event)}
      />
    </div>
  )
}
export default TodoForm
