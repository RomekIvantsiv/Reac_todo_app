import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrentTodo,
  getTodosSelector,
  getTodosStatus,
} from '../../store/selectors';
import { setCurrentTodo, setDeleteButton, setTodos } from '../../store';
import { Todo } from '../../react-app-env.d';

export const TodoList = () => {
  const [edit, setEdit] = useState('');
  const dispatch = useDispatch();
  const currentTodo = useSelector(getCurrentTodo);
  const todos = useSelector(getTodosSelector);
  const statusTodos = useSelector(getTodosStatus);
  const [newTitle, setNewTitle] = useState(currentTodo?.title);

  useEffect(() => {
    const data = localStorage.getItem('todos');

    if (data) {
      dispatch(setTodos(JSON.parse(data)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  });

  useEffect(() => {
    setNewTitle(currentTodo?.title);
  }, [currentTodo]);

  const statusOfClearButton = todos?.every(todo => todo.completed === true);

  const setButtonDelete = (status: boolean) => {
    if (status) {
      dispatch(setDeleteButton(true));
    } else if (!status) {
      dispatch(setDeleteButton(false));
    }
  };

  useEffect(() => {
    setButtonDelete(statusOfClearButton);
  }, [statusOfClearButton]);

  const removeTodo = (id: string) => {
    const filteredTodos = todos.filter(todo => todo.id !== id);

    dispatch(setTodos(filteredTodos));
  };

  const changeTodoStatus = (id: string) => {
    const newTodos = todos.map((todo: Todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    dispatch(setTodos(newTodos));
  };

  const editTitle = (id: string, newTitleTest: string) => {
    if (newTitleTest === '') {
      removeTodo(id);

      return null;
    }

    const newTodos = todos.filter(todo => todo.title !== '');

    const updatedTodos = newTodos.map(todo => {
      if (todo.id === id) {
        return { ...todo, title: newTitleTest };
      }

      return todo;
    });

    dispatch(setTodos(updatedTodos));

    return null;
  };

  const setAllCompleted = () => {
    let result;
    const status = todos.every(todo => todo.completed === true);

    result = todos.map((todo: Todo) => {
      return { ...todo, completed: true };
    });

    if (status) {
      result = todos.map((todo: Todo) => {
        return { ...todo, completed: false };
      });
    }

    dispatch(setTodos(result));
  };

  const filteredTodosByStatus = (allTodos: Todo[]) => {
    switch (statusTodos) {
      case 'active': {
        return allTodos.filter(todo => todo.completed === false);
      }

      case 'completed': {
        return allTodos.filter(todo => todo.completed === true);
      }

      default: {
        return allTodos;
      }
    }
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        onClick={setAllCompleted}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list">
        {filteredTodosByStatus(todos)?.map(todo => (
          <li
            key={todo.id}
            className={classNames('', { completed: todo.completed, editing: todo.id === edit })}
          >
            <div className="view">
              <input
                type="checkbox"
                className="toggle"
                checked={todo.completed}
                id={todo.id}
                onChange={() => {
                  changeTodoStatus(todo.id);
                }}
              />
              <label
                onDoubleClick={() => {
                  setEdit(todo.id);
                  dispatch(setCurrentTodo(todo));
                }}
              >
                {todo.title}
              </label>
              <button
                type="button"
                className="destroy"
                onClick={() => {
                  removeTodo(todo.id);
                }}
              />
            </div>
            {edit
            && (
              <input
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                type="text"
                className="edit"
                defaultValue={todo.title}
                onChange={(event) => {
                  setNewTitle(event.target.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') {
                    setEdit('');
                  }

                  if (event.key === 'Enter') {
                    editTitle(todo.id, newTitle || '');
                    setEdit('');
                  }
                }}
                onBlur={() => {
                  setEdit('');
                  setNewTitle('');
                }}
              />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};
