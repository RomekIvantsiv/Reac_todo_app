import { State } from '../react-app-env.d';

export const getTodosSelector = (state: State) => state.todos;
export const getTodosStatus = (state: State) => state.status;
export const showDeleteButton = (state: State) => state.buttonDelete;
export const getCurrentTodo = (state: State) => state.currentTodo;
