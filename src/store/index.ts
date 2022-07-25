import {
  createAction,
  configureStore,
  createReducer,
} from '@reduxjs/toolkit';

import {} from 'redux-persist';
import { State, Todo } from '../react-app-env.d';

export const data = [];

export const setTodos2 = createAction<Todo[]>('SET_OUR_TODOS');

const initialState: State = {
  todos: data,
  currentTodo: null,
  status: 'all',
  buttonDelete: false,
};

export const setTodos = createAction<Todo[]>('ADD_TODO');
export const setStasus = createAction<string>('STATUS_CHANGED');
export const setDeleteButton = createAction<boolean>('SHOW_DELETE_BUTTON');
export const setCurrentTodo = createAction<Todo | null>('SET_CURRENT_TODO');

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setTodos, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.todos = action.payload;
  });
  builder.addCase(setStasus, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.status = action.payload;
  });
  builder.addCase(setDeleteButton, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.buttonDelete = action.payload;
  });
  builder.addCase(setCurrentTodo, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.currentTodo = action.payload;
  });
});

export const store = configureStore({ reducer });
