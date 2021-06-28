import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import './task.css';

export default class Task extends Component {
  state = {
    value: '',
    formatData: '',
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.minuts(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  editTask = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  onSubmit = (event) => {
    const { value } = this.state;
    const { id, editForm } = this.props;
    event.preventDefault();
    editForm(id, value);
    this.setState({
      value,
    });
  };

  newState = () => {
    const { text } = this.props;
    this.setState({
      value: text,
    });
  };

  editClick = () => {
    const { onEdit } = this.props;
    this.newState();
    onEdit();
  };

  minuts() {
    const { addTime } = this.props;
    this.setState({
      formatData: formatDistanceToNow(addTime),
    });
  }

  render() {
    const { value, formatData } = this.state;
    const { active, edit, id, onActive, text, onDelete } = this.props;
    let liClass = '';
    if (!active) {
      liClass = 'completed';
    }
    if (edit) {
      liClass = 'editing';
    }

    return (
      <li className={liClass}>
        <div className="view">
          <input className="toggle" type="checkbox" id={id} onClick={onActive} />
          <label htmlFor={id}>
            <span className="description" onKeyUp={() => {}} aria-hidden="true">
              {text}
            </span>
            <span className="created"> created {formatData} ago </span>
          </label>

          <button type="button" className="icon icon-edit" label="Редактировать" onClick={this.editClick} />
          <button type="button" className="icon icon-destroy" onClick={onDelete} label="Удалить" />
        </div>

        <form onSubmit={this.onSubmit}>
          <input type="text" className="edit" value={value} onChange={this.editTask} />
        </form>
      </li>
    );
  }
}

Task.defaultProps = {
  text: '',
  id: 1,
  addTime: new Date(),
  active: true,
  edit: false,
  onDelete: () => {},
  onActive: () => {},
  onEdit: () => {},
  editForm: () => {},
};

Task.propTypes = {
  text: (props, propsName) => {
    const value = props[propsName];
    if (typeof value === 'string') return null;
    return TypeError(`${value} не является строкой`);
  },
  id: (props, propsName) => {
    const value = props[propsName];
    if (typeof value === 'number') return null;
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
  edit: (props, propsName) => {
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
  onEdit: (props, propsName) => {
    const value = props[propsName];
    if (typeof value === 'function') return null;
    return TypeError(`${value} не является функцией`);
  },
  editForm: (props, propsName) => {
    const value = props[propsName];
    if (typeof value === 'function') return null;
    return TypeError(`${value} не является функцией`);
  },
};
