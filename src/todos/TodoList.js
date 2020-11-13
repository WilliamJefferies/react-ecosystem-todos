import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';
import {getTodos, getTodosLoading} from "./selectors";
import {loadTodos, removeTodoRequest, markTodoAsCompletedRequest} from "./thunks";
import './TodoList.css';

const TodoList = ({todos = [], onRemovedPressed, onCompletedPressed, isLoading, startLoadingTodos}) => {
    useEffect(() => {
        startLoadingTodos();
    }, []);
    const loadingMessage = <div>Loading todos...</div>;

    const content = (
        <div className="list-wrapper">
            <NewTodoForm/>
            {todos.map(todo =>
                <TodoListItem
                    todo={todo}
                    onRemovePressed={onRemovedPressed}
                    onCompletedPressed={onCompletedPressed}/>)}
        </div>
    );

    return isLoading ? loadingMessage : content
};

const mapStateToProps = state => ({
    todos: getTodos(state),
    isLoading: getTodosLoading(state)
});

const mapDispatchToProps = dispatch => ({
    onRemovedPressed: id => dispatch(removeTodoRequest(id)),
    onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id)),
    startLoadingTodos: () => dispatch(loadTodos())
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);