/// <reference types="react-scripts" />

export interface Todo {
  id: string,
  title: string,
  completed: boolean,
}

export interface State {
  todos: Todo[] | []
  currentTodo: Todo | null
  status: string
  buttonDelete: boolean,
}
