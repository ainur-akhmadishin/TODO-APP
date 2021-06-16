import React, { Component } from 'react';
import { addMinutes, addSeconds } from 'date-fns';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';
import './app.css';

export default class App extends Component {
  newId = 100;

  state = {
    todoData: [
      {
        id: 1,
        text: 'Completed task',
        active: false,
        addTime: addSeconds(new Date(), -17),
      },
      {
        id: 2,
        text: 'Editing task',
        active: true,
        addTime: addMinutes(new Date(), -5),
      },
      {
        id: 3,
        text: 'Active task',
        active: true,
        addTime: addMinutes(new Date(), -15),
      },
    ],
    filters: 'all',
  };

  onFilter = (item, value) => {
    if (value === 'active') return item.filter((el) => el.active);
    if (value === 'complected') return item.filter((el) => !el.active);
    return item;
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newData = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newData,
      };
    });
  };

  onActive = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = {
        ...oldItem,
        active: !oldItem.active,
      };
      const newData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

      return {
        todoData: newData,
      };
    });
  };

  addTask = (text) => {
    const newTask = {
      id: this.newId + 1,
      text,
      active: true,
      addTime: new Date(),
    };

    this.setState(({ todoData }) => {
      const newData = [newTask, ...todoData];

      return {
        todoData: newData,
      };
    });
  };

  btnClear = () => {
    this.setState(({ todoData }) => {
      const activeData = todoData.filter((item) => item.active);
      return {
        todoData: activeData,
      };
    });
  };

  btnFilter = (filters) => {
    this.setState({ filters });
  };

  render() {
    const { todoData, filters } = this.state;
    const countComplected = todoData.filter((item) => item.active).length;
    const filter = this.onFilter(todoData, filters);

    return (
      <div className="todoapp">
        <NewTaskForm addTask={this.addTask} />

        <TaskList todos={filter} onDelete={this.deleteItem} onActive={this.onActive} />
        <Footer
          count={countComplected}
          filter={filter}
          btnFilter={this.btnFilter}
          todos={todoData}
          btnClear={this.btnClear}
        />
      </div>
    );
  }
}
