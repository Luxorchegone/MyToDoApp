import React, { Component } from 'react';
import './item-add-form.css';

export default class ItemAddForm extends Component {
  
  
  render() {
  return (
    <form className="item-add-form d-flex">
      <input type="text"
        className="form-control"
        //onChange={this.onLabelChange}
        placeholder="Что нужно сделать?"></input>
      <button
        type="button"
        className="button-add btn btn-info"
        onClick={() => this.props.onItemAdded("Hello")}
      >
        Добавить задачу
      </button>
    </form>
  );
};
};

