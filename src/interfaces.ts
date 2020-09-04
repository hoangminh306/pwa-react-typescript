// Todo interface
export interface TodoInterface {
  id: string;
  text: string;
	status: string;
	createDate: Date;
	deadline?: Date | null;
	category: TodoCategoryInterface;
}
export interface TodoCategoryInterface {
	type: string;
	desc: string;
	priority: number;
}
// Todo form interface
export interface TodoFormInterface {
  todos: TodoInterface[];
	handleTodoCreate: (todo: TodoInterface | null) => void;
	handleSort: (sortBy: React.ChangeEvent<HTMLSelectElement>) => void;
	handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleFilter: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
// Todo list interface
export interface TodoListInterface {
  handleTodoUpdate: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  handleTodoRemove: (id: string) => void;
	handleTodoComplete: (id: string, status: string) => void;
	handleTodoBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleTodoDeadline: (id: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  todos: TodoInterface[]
}
// Todo item interface
export interface TodoItemInterface {
  handleTodoUpdate: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  handleTodoRemove: (id: string) => void;
	handleTodoComplete: (id: string, status: string) => void;
	handleTodoBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleTodoDeadline: (id: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  todo: TodoInterface;
}
