import React from 'react';
import {connect} from 'react-redux'
import {removeTodo} from "./actions";
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';
import './TodoList.css';

const TodoList = ({todos = [], onRemovedPressed}) => (
    <div className="list-wrapper">
        <NewTodoForm/>
        {todos.map(todo => <TodoListItem todo={todo} onRemovePressed={onRemovedPressed}/>)}
    </div>
);

const mapStateToProps = state => ({
    todos: state.todos
});

const mapDispatchToProps = dispatch => ({
    onRemovedPressed: text => dispatch(removeTodo(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);