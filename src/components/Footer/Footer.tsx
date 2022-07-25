import classNames from 'classnames';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Todo } from '../../react-app-env.d';
import { setStasus, setTodos } from '../../store';
import { getTodosSelector, showDeleteButton } from '../../store/selectors';

export const Footer = () => {
  const [selected, setSelected] = useState('all');
  const todos = useSelector(getTodosSelector);
  const clearButton = useSelector(showDeleteButton);
  const dispatch = useDispatch();

  const notCompletedTodos = (allTodos: Todo[]) => {
    const notCompletedTodos = allTodos.filter(todo => todo.completed === false);

    return notCompletedTodos.length;
  };

  const todosLeft = notCompletedTodos(todos);

  return (
    <footer className="footer">
      <span className="todo-count">
        {todosLeft
          ? (`${todosLeft} items left`)
          : ('Nothing to do :)')}

      </span>

      <ul className="filters">
        <li>
          <button
            type="button"
            className={classNames('filters__button', { selected: selected === 'all' })}
            onClick={() => {
              setSelected('all');
              dispatch(setStasus('all'));
            }}
          >
            All
          </button>
        </li>

        <li>
          <button
            type="button"
            className={classNames('filters__button', { selected: selected === 'active' })}
            onClick={() => {
              setSelected('active');
              dispatch(setStasus('active'));
            }}
          >
            Active
          </button>
        </li>

        <li>
          <button
            type="button"
            className={classNames('filters__button', { selected: selected === 'completed' })}
            onClick={() => {
              setSelected('completed');
              dispatch(setStasus('completed'));
            }}
          >
            Completed
          </button>
        </li>
      </ul>

      {clearButton
      && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => {
            dispatch(setTodos([]));
          }}
        >
          Clear completed
        </button>
      )}

    </footer>
  );
};
