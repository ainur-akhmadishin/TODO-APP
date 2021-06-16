import React, { Component } from 'react';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  static defaultProps = {
    addTask: () => {},
  };

  static propTypes = {
    addTask: (props, propsName) => {
      const value = props[propsName];

      if (typeof value === 'function') return null;
      return TypeError(`${value} должен быть функцией`);
    },
  };

  state = {
    text: '',
  };

  addNewTask = (event) => {
    this.setState({
      text: event.target.value,
    });
  };

  onSubmit = (event) => {
    const { text } = this.state;
    const { addTask } = this.props;
    event.preventDefault();
    addTask(text);
    this.setState({
      text: '',
    });
  };

  render() {
    const { text } = this.state;
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input className="new-todo" placeholder="What needs to be done?" value={text} onChange={this.addNewTask} />
        </form>
      </header>
    );
  }
}
