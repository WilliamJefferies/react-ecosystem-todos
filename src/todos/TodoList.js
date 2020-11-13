import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import {removeTodo, markTodoAsCompleted} from "./actions";
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';
import {loadTodos} from "./thunks";
import './TodoList.css';

const TodoList = ({todos = [], onRemovedPressed, onCompletedPressed, isLoading, startLoadingTodos}) => {
    useEffect(() => {
        startLoadingTodos();
    },[])
    const loadingMessage = <div>Loading todos...</div>

    const content = (<div className="list-wrapper">
            <NewTodoForm/>
            {todos.map(todo =>
                <TodoListItem
                    todo={todo}
                    onRemovePressed={onRemovedPressed}
                    onCompletedPressed={onCompletedPressed}/>)}
        </div>
    )

    return isLoading ? loadingMessage : content
};

const mapStateToProps = state => ({
    todos: state.todos,
    isLoading: state.isLoading
});

const mapDispatchToProps = dispatch => ({
    onRemovedPressed: text => dispatch(removeTodo(text)),
    onCompletedPressed: text => dispatch(markTodoAsCompleted(text)),
    startLoadingTodos: () => dispatch(loadTodos())
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);