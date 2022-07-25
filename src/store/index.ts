import {
  createAction,
  configureStore,
  createReducer,
} from '@reduxjs/toolkit';

import { State, Todo } from '../react-app-env.d';

export const data = [];

const initialState: State = {
  todos: data,
  currentTodo: null,
  status: 'all',
  buttonDelete: false,
};

enum ActionType {
  SET_TODOS = 'SET_TODOS',
  STATUS_CHANGED = 'STATUS_CHANGED',
  SHOW_DELETE_BUTTON = 'SHOW_DELETE_BUTTON',
  SET_CURRENT_TODO = 'SET_CURRENT_TODO',
}

export const setTodos = createAction<Todo[]>(ActionType.SET_TODOS);
export const setStasus = createAction<string>(ActionType.STATUS_CHANGED);
export const setDeleteButton = createAction<boolean>(ActionType.SHOW_DELETE_BUTTON);
export const setCurrentTodo = createAction<Todo | null>(ActionType.SET_CURRENT_TODO);

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
