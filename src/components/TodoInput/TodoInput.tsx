import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { Todo } from '../../react-app-env.d';
import { setTodos } from '../../store';
import { getTodosSelector } from '../../store/selectors';

export const TodoInput = () => {
  const [title, setTitle] = useState('');

  const todos = useSelector(getTodosSelector);
  const dispatch = useDispatch();

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = uuid();
    const newTodo: Todo = {
      id,
      title,
      completed: false,
    };

    if (newTodo.title !== '') {
      dispatch(setTodos([...todos, newTodo]));
      setTitle('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form
        onSubmit={handleFormSubmit}
      >
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      </form>
    </header>
  );
};
