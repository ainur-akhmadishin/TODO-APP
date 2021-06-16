import React from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import './task.css';

const Task = ({ text, addTime, onDelete, onActive, active }) => {
  Task.defaultProps = {
    text: '',
    addTime: new Date(),
    active: true,
    onDelete: () => {},
    onActive: () => {},
  };

  Task.propTypes = {
    text: (props, propsName) => {
      const value = props[propsName];
      if (typeof value === 'string') return null;
      return TypeError(`${value} не является строкой`);
    },

    addTime: (props, propsName) => {
      const value = props[propsName];
      if (value.getTime) return null;
      return TypeError(`${value} не является датой`);
    },

    active: (props, propsName) => {
      const value = props[propsName];
      if (typeof value === 'boolean') return null;
      return TypeError(`${value} не является boolean`);
    },
    onDelete: (props, propsName) => {
      const value = props[propsName];
      if (typeof value === 'function') return null;
      return TypeError(`${value} не является функцией`);
    },
    onActive: (props, propsName) => {
      const value = props[propsName];
      if (typeof value === 'function') return null;
      return TypeError(`${value} не является функцией`);
    },
  };

  let liClass = '';
  if (!active) {
    liClass += 'completed';
  }

  return (
    <li className={liClass}>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>
          <span className="description" onClick={onActive} onKeyUp={() => {}} aria-hidden="true">
            {text}
          </span>
          <span className="created"> created {formatDistanceToNowStrict(addTime)} ago </span>
        </label>
        <button type="button" className="icon icon-edit" label="Редактировать" />
        <button type="button" className="icon icon-destroy" onClick={onDelete} label="Удалить" />
      </div>
      <input type="text" className="edit" value={text} readOnly />
    </li>
  );
};

export default Task;
