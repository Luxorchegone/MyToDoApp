import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';
import './app.css';

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Учить React!!!'),
            this.createTodoItem('Сделать приложение!'),
            this.createTodoItem('Выпить чая'),
        ],
        searchText: '',
        filterStatus: 'all',
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        };
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = {
            ...oldItem,
            [propName]: !oldItem[propName]
        };
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];

    };

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);

            const newArray = [...todoData.slice(0, idx),
            ...todoData.slice(idx + 1)];

            return {
                todoData: newArray
            };
        });
    };

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return { todoData: this.toggleProperty(todoData, id, 'important') };
        });
    };

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return { todoData: this.toggleProperty(todoData, id, 'done') };
        });
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text);

        this.setState(({ todoData }) => {
            const newArray = [
                ...todoData,
                newItem
            ];

            return { todoData: newArray }
        });
    };

    onSearch = (searchText) => {
        this.setState({ searchText });
    };

    onFilterChange = (filterStatus) => {
        this.setState({ filterStatus });
    };

    search(items, searchText) {
        if (searchText.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
        });
    };

    filter(items, filter) {

        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    }

    render() {
        const { todoData, searchText, filterStatus } = this.state
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;
        const visibleItem = this.filter(this.search(todoData, searchText), filterStatus);

        return (
            <div className="todo-app">
                <AppHeader
                    toDo={todoCount}
                    done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel
                        onSearch={this.onSearch} />
                    <ItemStatusFilter
                        filterStatus={filterStatus}
                        onFilterChange={this.onFilterChange}
                    />
                </div>
                <TodoList
                    todos={visibleItem}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <ItemAddForm onItemAdded={this.addItem} />
            </div>
        );
    };
};

