import React from 'react';
import Task from '../task';
import './task-list.css';

const TaskList = ({ todos, onDelete, onActive }) => {
  TaskList.defaultProps = {
    onDelete: () => {},
    onActive: () => {},
    todos: [],
  };

  const validateFunction = (props, propsName) => {
    const value = props[propsName];
    if (typeof value === 'function') return null;
    return TypeError(`${value} не является функцией`);
  };

  TaskList.propTypes = {
    onDelete: validateFunction,
    onActive: validateFunction,
    todos: (props, propsName) => {
      const value = props[propsName];
      if (Array.isArray(value)) return null;
      return TypeError(`${value} не является массивом`);
    },
  };

  const elements = todos.map((item) => (
    <Task {...item} key={item.id} onDelete={() => onDelete(item.id)} onActive={() => onActive(item.id)} />
  ));

  return (
    <main className="main">
      <ul className="todo-list" key="ul">
        {elements}
      </ul>
    </main>
  );
};

export default TaskList;
