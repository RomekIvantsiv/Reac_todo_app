/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useSelector } from 'react-redux';
import { Footer } from './components/Footer';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { getTodosSelector } from './store/selectors';
import './styles/filters.scss';
import './styles/index.scss';
import './styles/todo-list.scss';

export const App: React.FC = () => {
  const todos = useSelector(getTodosSelector);

  return (
    <section className="todoapp">
      <TodoInput />

      <TodoList />
      {todos?.length !== 0
      && (
        <Footer />
      )}
    </section>
  );
};
